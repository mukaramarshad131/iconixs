/*
  Warnings:

  - You are about to drop the column `address` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `address`,
    DROP COLUMN `phoneNumber`;
