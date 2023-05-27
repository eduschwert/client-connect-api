import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1685148371631 implements MigrationInterface {
    name = 'InitialMigration1685148371631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "fullName" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "fullName"`);
    }

}
