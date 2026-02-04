/*
  Warnings:

  - You are about to drop the column `assignee` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `reporter` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `assignee`,
    DROP COLUMN `reporter`;
