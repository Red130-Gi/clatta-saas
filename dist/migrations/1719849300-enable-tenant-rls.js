"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LegacyEnableTenantRls {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE establishment ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`CREATE POLICY establishment_tenant ON establishment USING (tenantId = current_setting('app.current_tenant')::uuid)`);
        await queryRunner.query(`ALTER TABLE establishment FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "class" ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`CREATE POLICY class_tenant ON "class" USING (tenantId = current_setting('app.current_tenant')::uuid)`);
        await queryRunner.query(`ALTER TABLE "class" FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE student ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`CREATE POLICY student_tenant ON student USING (tenantId = current_setting('app.current_tenant')::uuid)`);
        await queryRunner.query(`ALTER TABLE student FORCE ROW LEVEL SECURITY`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE student DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`DROP POLICY IF EXISTS student_tenant ON student`);
        await queryRunner.query(`ALTER TABLE "class" DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`DROP POLICY IF EXISTS class_tenant ON "class"`);
        await queryRunner.query(`ALTER TABLE establishment DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`DROP POLICY IF EXISTS establishment_tenant ON establishment`);
    }
}
//# sourceMappingURL=1719849300-enable-tenant-rls.js.map