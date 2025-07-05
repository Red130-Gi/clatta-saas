import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Observable } from 'rxjs';
export declare class TenantRlsInterceptor implements NestInterceptor {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
