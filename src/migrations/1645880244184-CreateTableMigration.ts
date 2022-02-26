import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMigration1645880244184 implements MigrationInterface {
  name = 'CreateTableMigration1645880244184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`schoolId\` int NOT NULL, \`state\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`meta\` json NOT NULL, \`type\` varchar(255) NOT NULL, INDEX \`IDX_042ae45f3a9b063a3211866741\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`school_id\` int NULL, \`parent_id\` int NULL, \`state\` varchar(255) NULL, \`name\` varchar(255) NULL, \`remark\` varchar(255) NULL, \`mpath\` varchar(255) NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`teachers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`school_id\` int NULL, \`state\` varchar(255) NULL, \`name\` varchar(255) NULL COMMENT '姓名', \`sex\` varchar(255) NULL COMMENT '性别', \`mobile\` varchar(255) NULL COMMENT '联系电话', \`password\` varchar(255) NULL, \`card_no\` varchar(255) NULL COMMENT '证件号', \`birthday\` date NULL COMMENT '生日', \`nation\` varchar(255) NULL COMMENT '民族', \`native\` varchar(255) NULL COMMENT '籍贯', \`education\` varchar(255) NULL COMMENT '学历', \`address\` varchar(255) NULL COMMENT '地址', \`remark\` varchar(255) NULL COMMENT '备注', UNIQUE INDEX \`IDX_d8e33ebfcb1cf26927e7613332\` (\`card_no\`, \`school_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`schools\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`state\` varchar(255) NULL, \`name\` varchar(255) NULL, \`short_name\` varchar(255) NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`grades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`school_id\` int NULL, \`state\` varchar(255) NULL COMMENT '状态', \`name\` varchar(255) NULL COMMENT '名称', \`remark\` varchar(255) NULL COMMENT '备注', UNIQUE INDEX \`IDX_bb34731f9d25973055e10ca50e\` (\`school_id\`, \`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`student_infos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`school_id\` int NULL, \`student_id\` int NULL, \`grade_id\` int NULL, \`state\` varchar(255) NULL, \`start_day\` date NULL, \`end_day\` date NULL, \`remark\` varchar(255) NULL, UNIQUE INDEX \`IDX_f796aca6c6769b80d815359dfe\` (\`student_id\`, \`grade_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`school_id\` int NULL, \`state\` varchar(255) NULL COMMENT '状态', \`uid\` varchar(255) NULL COMMENT '学号', \`name\` varchar(255) NULL COMMENT '姓名', \`sex\` varchar(255) NULL COMMENT '性别', \`mobile\` varchar(255) NULL COMMENT '联系电话', \`password\` varchar(255) NULL, \`card_no\` varchar(255) NULL COMMENT '证件号', \`birthday\` date NULL COMMENT '生日', \`nation\` varchar(255) NULL COMMENT '民族', \`native\` varchar(255) NULL COMMENT '籍贯', \`address\` varchar(255) NULL COMMENT '地址', \`remark\` varchar(255) NULL COMMENT '备注', UNIQUE INDEX \`IDX_3262b57744bf089aee97e421e2\` (\`card_no\`), UNIQUE INDEX \`IDX_ccfeb78273c22bc2c0335cbcb0\` (\`card_no\`, \`school_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`student_families\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`student_id\` int NOT NULL, \`family_id\` int NOT NULL, \`remark\` varchar(255) NULL, UNIQUE INDEX \`IDX_1aff46897e3fb88b0a5cecd4e7\` (\`student_id\`, \`family_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`families\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`school_id\` int NULL, \`name\` varchar(255) NULL COMMENT '姓名', \`sex\` varchar(255) NULL COMMENT '性别', \`relation\` varchar(255) NULL COMMENT '关系', \`mobile\` varchar(255) NULL COMMENT '联系电话', \`card_no\` varchar(255) NULL COMMENT '证件号', \`nation\` varchar(255) NULL COMMENT '民族', \`native\` varchar(255) NULL COMMENT '籍贯', \`education\` varchar(255) NULL COMMENT '学历', \`address\` varchar(255) NULL COMMENT '地址', \`work\` varchar(255) NULL COMMENT '工作单位', \`remark\` varchar(255) NULL COMMENT '备注', UNIQUE INDEX \`IDX_3960ebaf053bda05a0127f39ad\` (\`school_id\`, \`card_no\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_infos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`teacher_id\` int NOT NULL, \`grade_id\` int NULL, \`state\` varchar(255) NULL, \`start_day\` date NULL, \`end_day\` date NULL, \`remark\` varchar(255) NULL, UNIQUE INDEX \`IDX_1bd1de9c6446a8a27c51b98d91\` (\`grade_id\`, \`teacher_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`departments\` ADD CONSTRAINT \`FK_700b0b13f494cb37b6ca929e79b\` FOREIGN KEY (\`parent_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` ADD CONSTRAINT \`FK_5656d1b6d40765ea6b135b35d4b\` FOREIGN KEY (\`school_id\`) REFERENCES \`schools\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`grades\` ADD CONSTRAINT \`FK_011e8eccc5fb5685680244bf19c\` FOREIGN KEY (\`school_id\`) REFERENCES \`schools\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`student_infos\` ADD CONSTRAINT \`FK_fadcf0588b64a82706699bd6bf9\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`student_infos\` ADD CONSTRAINT \`FK_1203e58bcc00e6900c71a007e89\` FOREIGN KEY (\`grade_id\`) REFERENCES \`grades\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`student_families\` ADD CONSTRAINT \`FK_ca98ac9747ceae8d82f45d5d47d\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`student_families\` ADD CONSTRAINT \`FK_e5f52fb1221d9fe0a4044600b8e\` FOREIGN KEY (\`family_id\`) REFERENCES \`families\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_infos\` ADD CONSTRAINT \`FK_66636e3c25a4ed9eafd06e20891\` FOREIGN KEY (\`grade_id\`) REFERENCES \`grades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teacher_infos\` DROP FOREIGN KEY \`FK_66636e3c25a4ed9eafd06e20891\``
    );
    await queryRunner.query(
      `ALTER TABLE \`student_families\` DROP FOREIGN KEY \`FK_e5f52fb1221d9fe0a4044600b8e\``
    );
    await queryRunner.query(
      `ALTER TABLE \`student_families\` DROP FOREIGN KEY \`FK_ca98ac9747ceae8d82f45d5d47d\``
    );
    await queryRunner.query(
      `ALTER TABLE \`student_infos\` DROP FOREIGN KEY \`FK_1203e58bcc00e6900c71a007e89\``
    );
    await queryRunner.query(
      `ALTER TABLE \`student_infos\` DROP FOREIGN KEY \`FK_fadcf0588b64a82706699bd6bf9\``
    );
    await queryRunner.query(
      `ALTER TABLE \`grades\` DROP FOREIGN KEY \`FK_011e8eccc5fb5685680244bf19c\``
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` DROP FOREIGN KEY \`FK_5656d1b6d40765ea6b135b35d4b\``
    );
    await queryRunner.query(
      `ALTER TABLE \`departments\` DROP FOREIGN KEY \`FK_700b0b13f494cb37b6ca929e79b\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1bd1de9c6446a8a27c51b98d91\` ON \`teacher_infos\``
    );
    await queryRunner.query(`DROP TABLE \`teacher_infos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3960ebaf053bda05a0127f39ad\` ON \`families\``
    );
    await queryRunner.query(`DROP TABLE \`families\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_1aff46897e3fb88b0a5cecd4e7\` ON \`student_families\``
    );
    await queryRunner.query(`DROP TABLE \`student_families\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ccfeb78273c22bc2c0335cbcb0\` ON \`students\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3262b57744bf089aee97e421e2\` ON \`students\``
    );
    await queryRunner.query(`DROP TABLE \`students\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f796aca6c6769b80d815359dfe\` ON \`student_infos\``
    );
    await queryRunner.query(`DROP TABLE \`student_infos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_bb34731f9d25973055e10ca50e\` ON \`grades\``
    );
    await queryRunner.query(`DROP TABLE \`grades\``);
    await queryRunner.query(`DROP TABLE \`schools\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d8e33ebfcb1cf26927e7613332\` ON \`teachers\``
    );
    await queryRunner.query(`DROP TABLE \`teachers\``);
    await queryRunner.query(`DROP TABLE \`departments\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_042ae45f3a9b063a3211866741\` ON \`articles\``
    );
    await queryRunner.query(`DROP TABLE \`articles\``);
  }
}
