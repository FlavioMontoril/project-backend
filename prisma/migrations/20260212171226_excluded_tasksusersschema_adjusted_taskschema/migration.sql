/*
  Warnings:

  - You are about to drop the column `user_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `tasks_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `archived` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporter_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tasks_user` DROP FOREIGN KEY `tasks_user_assignee_id_fkey`;

-- DropForeignKey
ALTER TABLE `tasks_user` DROP FOREIGN KEY `tasks_user_reporter_id_fkey`;

-- DropForeignKey
ALTER TABLE `tasks_user` DROP FOREIGN KEY `tasks_user_task_id_fkey`;

-- DropIndex
DROP INDEX `tasks_user_id_fkey` ON `tasks`;

-- AlterTable
ALTER TABLE `notification_recipients` ALTER COLUMN `created_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `user_id`,
    ADD COLUMN `archived` BOOLEAN NOT NULL,
    ADD COLUMN `assignee_id` VARCHAR(191) NULL,
    ADD COLUMN `reporter_id` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `created_at` DROP DEFAULT;

-- DropTable
DROP TABLE `tasks_user`;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_reporter_id_fkey` FOREIGN KEY (`reporter_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assignee_id_fkey` FOREIGN KEY (`assignee_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
