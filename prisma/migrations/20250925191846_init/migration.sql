/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `callbackURL` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `callbackURL` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `externalId` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT '01';

-- CreateIndex
CREATE UNIQUE INDEX `Payment_externalId_key` ON `Payment`(`externalId`);
