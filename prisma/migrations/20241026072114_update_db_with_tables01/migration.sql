-- AlterTable
ALTER TABLE `followupquestionnaire` ADD COLUMN `status` ENUM('ACTIVE', 'COMPLETED', 'PAUSED') NOT NULL DEFAULT 'ACTIVE';
