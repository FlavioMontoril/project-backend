/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[task_id,assignee_id]` on the table `tasks_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `code` VARCHAR(5) NOT NULL,
    ADD COLUMN `status` ENUM('OPEN', 'DONE', 'IN_PROGRESS', 'UNDER_REVIEW') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tasks_code_key` ON `tasks`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `tasks_user_task_id_assignee_id_key` ON `tasks_user`(`task_id`, `assignee_id`);
