/*
  Warnings:

  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - Added the required column `openLoopId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `userId`,
    ADD COLUMN `openLoopId` VARCHAR(191) NOT NULL;
