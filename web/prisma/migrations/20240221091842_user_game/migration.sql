/*
  Warnings:

  - You are about to drop the `_gametouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_gametouser` DROP FOREIGN KEY `_GameToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gametouser` DROP FOREIGN KEY `_GameToUser_B_fkey`;

-- AlterTable
ALTER TABLE `game` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `_gametouser`;

-- CreateTable
CREATE TABLE `userGame` (
    `userId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `move` ENUM('rock', 'scissors', 'paper') NULL,

    PRIMARY KEY (`userId`, `gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userGame` ADD CONSTRAINT `userGame_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userGame` ADD CONSTRAINT `userGame_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
