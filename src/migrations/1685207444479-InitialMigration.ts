import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1685207444479 implements MigrationInterface {
    name = 'InitialMigration1685207444479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

}
