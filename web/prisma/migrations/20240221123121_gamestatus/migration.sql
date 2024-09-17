-- AlterTable
ALTER TABLE `game` ADD COLUMN `status` ENUM('inProcess', 'ended') NOT NULL DEFAULT 'inProcess';
