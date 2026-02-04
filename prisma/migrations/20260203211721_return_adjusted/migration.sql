/*
  Warnings:

  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reporter` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `assignee` VARCHAR(50) NULL,
    ADD COLUMN `reporter` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `notifications`;
