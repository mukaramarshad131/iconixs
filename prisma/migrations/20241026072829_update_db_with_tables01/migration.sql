/*
  Warnings:

  - You are about to alter the column `status` on the `followupquestionnaire` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `followupquestionnaire` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'OVERDUE') NOT NULL DEFAULT 'PENDING';
