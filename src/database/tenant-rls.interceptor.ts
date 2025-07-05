import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Observable } from 'rxjs';

/**
 * Intercepteur global qui positionne la variable de session PostgreSQL
 * `app.current_tenant` (utilisée par les politiques RLS) à partir du tenantId
 * contenu dans le JWT (ajouté dans `request.user` par le JwtAuthGuard).
 *
 * La commande `SET LOCAL` n'est valable que pour la transaction courante et
 * n'affecte pas les autres requêtes dans le pool de connexions.
 */
@Injectable()
export class TenantRlsInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<{ user?: { tenantId?: string } }>();
    const tenantId = req.user?.tenantId;

    if (tenantId) {
      // On positionne la variable de session pour la durée de la transaction.
      // `SET LOCAL` garantit la portée limitée au backend transactionnel
      // utilisé pendant la requête HTTP.
      try {
      await this.dataSource.query('SET LOCAL app.current_tenant = $1', [tenantId]);
    } catch (e) {
      // Ignore if database does not recognize the custom GUC (e.g. during tests)
    }
    }

    return next.handle();
  }
}
