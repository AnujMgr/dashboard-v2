-- CreateTable
CREATE TABLE `Industry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `screenerStatementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `industryId` INTEGER NOT NULL,
    `balanceSheetId` INTEGER NOT NULL,
    `profitLossId` INTEGER NOT NULL,
    `companyEssentialsId` INTEGER NOT NULL,
    `companyRatioId` INTEGER NOT NULL,

    UNIQUE INDEX `Company.name_unique`(`name`),
    UNIQUE INDEX `Company.slug_unique`(`slug`),
    UNIQUE INDEX `Company.symbol_unique`(`symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `noOfTransactions` INTEGER NOT NULL,
    `maxPrice` DOUBLE NOT NULL,
    `minPrice` DOUBLE NOT NULL,
    `closingPrice` DOUBLE NOT NULL,
    `tradedShares` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `previousClosing` DOUBLE NOT NULL,
    `priceDifference` DOUBLE NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockHoldingFact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinancialStatement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinancialStatementLine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `parentId` INTEGER,
    `unit` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FinancialStatementLine.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinancialStatementLineSequence` (
    `financialStatementId` INTEGER NOT NULL,
    `financialStatementLineId` INTEGER NOT NULL,
    `sequence` DOUBLE NOT NULL,

    PRIMARY KEY (`financialStatementId`, `financialStatementLineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinancialStatementFact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `financialStatementLineId` INTEGER NOT NULL,
    `fiscalYear` INTEGER NOT NULL,
    `quarter` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD FOREIGN KEY (`industryId`) REFERENCES `Industry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyPrice` ADD FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHoldingFact` ADD FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementLine` ADD FOREIGN KEY (`parentId`) REFERENCES `FinancialStatementLine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementLineSequence` ADD FOREIGN KEY (`financialStatementId`) REFERENCES `FinancialStatement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementLineSequence` ADD FOREIGN KEY (`financialStatementLineId`) REFERENCES `FinancialStatementLine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementFact` ADD FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialStatementFact` ADD FOREIGN KEY (`financialStatementLineId`) REFERENCES `FinancialStatementLine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
