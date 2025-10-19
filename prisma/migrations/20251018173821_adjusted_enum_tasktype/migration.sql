/*
  Warnings:

  - The values [Task] on the enum `tasks_type` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `status` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `type` ENUM('TASK', 'EPIC', 'BUG', 'SUB_TASK') NOT NULL,
    MODIFY `status` ENUM('OPEN', 'DONE', 'IN_PROGRESS', 'UNDER_REVIEW') NOT NULL;
