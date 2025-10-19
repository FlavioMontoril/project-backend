-- CreateTable
CREATE TABLE `tasks` (
    `id` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(40) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `assignee` VARCHAR(50) NULL,
    `reporter` VARCHAR(100) NOT NULL,
    `type` ENUM('Task', 'BUG', 'EPIC', 'SUB_TASK') NOT NULL,
    `status` ENUM('OPEN', 'DONE', 'IN_PROGRESS', 'UNDER_REVIEW') NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `user_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
