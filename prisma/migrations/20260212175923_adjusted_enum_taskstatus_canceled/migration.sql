/*
  Warnings:

  - The values [ASSIGNED] on the enum `tasks_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `status` ENUM('OPEN', 'DONE', 'IN_PROGRESS', 'UNDER_REVIEW', 'CANCELED') NOT NULL;
