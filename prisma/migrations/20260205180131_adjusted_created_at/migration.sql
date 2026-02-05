/*
  Warnings:

  - You are about to drop the column `createdAt` on the `notification_recipients` table. All the data in the column will be lost.
  - You are about to drop the column `readAt` on the `notification_recipients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification_recipients` DROP COLUMN `createdAt`,
    DROP COLUMN `readAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `read_at` DATETIME(3) NULL;
