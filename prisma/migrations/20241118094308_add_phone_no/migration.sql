/*
  Warnings:

  - Added the required column `phoneNumber` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `address` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;
