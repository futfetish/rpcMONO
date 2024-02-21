-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_winnerId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `refreshToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `refreshToken` ADD CONSTRAINT `refreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_winnerId_fkey` FOREIGN KEY (`winnerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
