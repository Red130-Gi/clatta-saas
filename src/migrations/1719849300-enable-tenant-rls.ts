import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Active le Row Level Security et crée une policy par table multi-tenant.
 * La variable de session `app.current_tenant` doit être fixée par l'application
 * (voir TenantRlsInterceptor).
 */
// Ancienne migration désactivée : gardée pour historique mais non exportée
class LegacyEnableTenantRls implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crée le custom GUC si nécessaire (extension "pg_settings" non autorisée)
    // Ici on part du principe qu'elle existe déjà côté Postgres via
    //   ALTER SYSTEM SET app.current_tenant TO '00000000-0000-0000-0000-000000000000';
    // ou simplement on lit une variable même si pas définie => NULL.

    // Establishment
    await queryRunner.query(`ALTER TABLE establishment ENABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`CREATE POLICY establishment_tenant ON establishment USING (tenantId = current_setting('app.current_tenant')::uuid)`);
    await queryRunner.query(`ALTER TABLE establishment FORCE ROW LEVEL SECURITY`);

    // Class
    await queryRunner.query(`ALTER TABLE "class" ENABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`CREATE POLICY class_tenant ON "class" USING (tenantId = current_setting('app.current_tenant')::uuid)`);
    await queryRunner.query(`ALTER TABLE "class" FORCE ROW LEVEL SECURITY`);

    // Student
    await queryRunner.query(`ALTER TABLE student ENABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`CREATE POLICY student_tenant ON student USING (tenantId = current_setting('app.current_tenant')::uuid)`);
    await queryRunner.query(`ALTER TABLE student FORCE ROW LEVEL SECURITY`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert RLS
    await queryRunner.query(`ALTER TABLE student DISABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`DROP POLICY IF EXISTS student_tenant ON student`);

    await queryRunner.query(`ALTER TABLE "class" DISABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`DROP POLICY IF EXISTS class_tenant ON "class"`);

    await queryRunner.query(`ALTER TABLE establishment DISABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`DROP POLICY IF EXISTS establishment_tenant ON establishment`);
  }
}
