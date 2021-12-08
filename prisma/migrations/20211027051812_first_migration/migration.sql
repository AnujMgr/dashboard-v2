/*
  Warnings:

  - You are about to drop the column `balanceSheetId` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `companyEssentialsId` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `companyRatioId` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `profitLossId` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `companyprice` table. All the data in the column will be lost.
  - You are about to drop the column `screenerStatementId` on the `industry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `FinancialStatement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Industry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statementsId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companySlug` to the `CompanyPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `FinancialStatement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenerId` to the `Industry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Industry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `companyprice` DROP FOREIGN KEY `companyprice_ibfk_1`;

-- DropForeignKey
ALTER TABLE `financialstatementfact` DROP FOREIGN KEY `financialstatementfact_ibfk_1`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `balanceSheetId`,
    DROP COLUMN `companyEssentialsId`,
    DROP COLUMN `companyRatioId`,
    DROP COLUMN `profitLossId`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `statementsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `companyprice` DROP COLUMN `companyId`,
    ADD COLUMN `companySlug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `financialstatement` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `financialstatementfact` MODIFY `fiscalYear` VARCHAR(191) NOT NULL,
    MODIFY `quarter` VARCHAR(191);

-- AlterTable
ALTER TABLE `financialstatementline` ADD COLUMN `description` VARCHAR(191),
    MODIFY `unit` VARCHAR(191);

-- AlterTable
ALTER TABLE `industry` DROP COLUMN `screenerStatementId`,
    ADD COLUMN `screenerId` INTEGER NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `CompanyStatementDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `balanceSheetId` INTEGER NOT NULL,
    `profitLossId` INTEGER NOT NULL,
    `companyEssentialsId` INTEGER NOT NULL,
    `companyRatioId` INTEGER NOT NULL,
    `financialHighlightsId` INTEGER NOT NULL,
    `companyActionId` INTEGER NOT NULL,
    `financialStatementOverview` INTEGER NOT NULL,

    UNIQUE INDEX `CompanyStatementDetails.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockHolding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `FinancialStatement.slug_unique` ON `FinancialStatement`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Industry.slug_unique` ON `Industry`(`slug`);

-- AddForeignKey
ALTER TABLE `Company` ADD FOREIGN KEY (`statementsId`) REFERENCES `CompanyStatementDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyPrice` ADD FOREIGN KEY (`companySlug`) REFERENCES `Company`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE;
