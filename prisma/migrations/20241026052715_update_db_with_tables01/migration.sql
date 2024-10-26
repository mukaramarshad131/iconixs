/*
  Warnings:

  - Added the required column `openLoopId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `openLoopId` VARCHAR(191) NOT NULL;
