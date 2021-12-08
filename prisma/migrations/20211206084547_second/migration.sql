-- DropForeignKey
ALTER TABLE `company` DROP FOREIGN KEY `company_ibfk_1`;

-- DropForeignKey
ALTER TABLE `company` DROP FOREIGN KEY `company_ibfk_2`;

-- DropForeignKey
ALTER TABLE `companyprice` DROP FOREIGN KEY `companyprice_ibfk_1`;

-- DropForeignKey
ALTER TABLE `financialstatementfact` DROP FOREIGN KEY `financialstatementfact_ibfk_2`;

-- DropForeignKey
ALTER TABLE `financialstatementline` DROP FOREIGN KEY `financialstatementline_ibfk_1`;

-- DropForeignKey
ALTER TABLE `financialstatementlinesequence` DROP FOREIGN KEY `financialstatementlinesequence_ibfk_1`;

-- DropForeignKey
ALTER TABLE `financialstatementlinesequence` DROP FOREIGN KEY `financialstatementlinesequence_ibfk_2`;

-- DropForeignKey
ALTER TABLE `stockholdingfact` DROP FOREIGN KEY `stockholdingfact_ibfk_1`;

-- DropIndex
DROP INDEX `companyId` ON `financialstatementfact`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'ADMIN', 'MANAGER') NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profileId` INTEGER NULL,
    `subscriptionId` INTEGER NULL,

    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_profileId_key`(`profileId`),
    UNIQUE INDEX `User_subscriptionId_key`(`subscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `expireAt` DATETIME(3) NOT NULL,
    `subscriptionPlanId` INTEGER NOT NULL,

    UNIQUE INDEX `UserSubscription_subscriptionPlanId_key`(`subscriptionPlanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `validityInDays` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    UNIQUE INDEX `SubscriptionPlan_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerInvoiceData` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `invoiceCreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subscriptionId` INTEGER NULL,

    UNIQUE INDEX `Invoice_subscriptionId_key`(`subscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offerName` VARCHAR(191) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,
    `discountAmount` DOUBLE NOT NULL,
    `discountPercentage` DECIMAL(65, 30) NOT NULL,
    `durationMonths` INTEGER NOT NULL,
    `durationEndDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_industryId_fkey` FOREIGN KEY (`industryId`) REFERENCES `Industry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_statementsId_fkey` FOREIGN KEY (`statementsId`) REFERENCES `CompanyStatementDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyPrice` ADD CONSTRAINT `CompanyPrice_companySlug_fkey` FOREIGN KEY (`companySlug`) REFERENCES `Company`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHoldingFact` ADD CONSTRAINT `StockHoldingFact_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementLine` ADD CONSTRAINT `FinancialStatementLine_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `FinancialStatementLine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementLineSequence` ADD CONSTRAINT `FinancialStatementLineSequence_financialStatementId_fkey` FOREIGN KEY (`financialStatementId`) REFERENCES `FinancialStatement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementLineSequence` ADD CONSTRAINT `FinancialStatementLineSequence_financialStatementLineId_fkey` FOREIGN KEY (`financialStatementLineId`) REFERENCES `FinancialStatementLine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementFact` ADD CONSTRAINT `FinancialStatementFact_financialStatementLineId_fkey` FOREIGN KEY (`financialStatementLineId`) REFERENCES `FinancialStatementLine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `UserSubscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscription` ADD CONSTRAINT `UserSubscription_subscriptionPlanId_fkey` FOREIGN KEY (`subscriptionPlanId`) REFERENCES `SubscriptionPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `UserSubscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `Company_name_key` ON `Company`(`name`);
DROP INDEX `Company.name_unique` ON `company`;

-- RedefineIndex
CREATE UNIQUE INDEX `Company_slug_key` ON `Company`(`slug`);
DROP INDEX `Company.slug_unique` ON `company`;

-- RedefineIndex
CREATE UNIQUE INDEX `Company_symbol_key` ON `Company`(`symbol`);
DROP INDEX `Company.symbol_unique` ON `company`;

-- RedefineIndex
CREATE UNIQUE INDEX `CompanyStatementDetails_name_key` ON `CompanyStatementDetails`(`name`);
DROP INDEX `CompanyStatementDetails.name_unique` ON `companystatementdetails`;

-- RedefineIndex
CREATE UNIQUE INDEX `FinancialStatement_slug_key` ON `FinancialStatement`(`slug`);
DROP INDEX `FinancialStatement.slug_unique` ON `financialstatement`;

-- RedefineIndex
CREATE UNIQUE INDEX `FinancialStatementLine_name_key` ON `FinancialStatementLine`(`name`);
DROP INDEX `FinancialStatementLine.name_unique` ON `financialstatementline`;

-- RedefineIndex
CREATE UNIQUE INDEX `Industry_slug_key` ON `Industry`(`slug`);
DROP INDEX `Industry.slug_unique` ON `industry`;
