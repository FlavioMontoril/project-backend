/*
  Warnings:

  - Made the column `status` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `status` ENUM('OPEN', 'DONE', 'IN_PROGRESS', 'UNDER_REVIEW', 'ASSIGNED') NOT NULL;
