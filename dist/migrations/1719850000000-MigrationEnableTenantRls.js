"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1719850000000 = void 0;
class Migration1719850000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE establishment ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`DROP POLICY IF EXISTS establishment_tenant ON establishment`);
        await queryRunner.query(`CREATE POLICY establishment_tenant ON establishment USING ("tenantId" = current_setting('app.current_tenant')::uuid)`);
        await queryRunner.query(`ALTER TABLE establishment FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "class" ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`DROP POLICY IF EXISTS class_tenant ON "class"`);
        await queryRunner.query(`CREATE POLICY class_tenant ON "class" USING ("tenantId" = current_setting('app.current_tenant')::uuid)`);
        await queryRunner.query(`ALTER TABLE "class" FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE student ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`DROP POLICY IF EXISTS student_tenant ON student`);
        await queryRunner.query(`CREATE POLICY student_tenant ON student USING ("tenantId" = current_setting('app.current_tenant')::uuid)`);
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
exports.Migration1719850000000 = Migration1719850000000;
//# sourceMappingURL=1719850000000-MigrationEnableTenantRls.js.map