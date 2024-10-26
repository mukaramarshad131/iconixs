-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `status` ENUM('NEW', 'INTAKE_FORM_COMPLETED', 'PAID_INITIAL_CONSULT', 'WAITING_FOR_LABS', 'LABS_COMPLETED', 'LABS_PROCESSED', 'SCHEDULED_CONSULT', 'CONSULT_COMPLETED', 'RECEIVED_TREATMENT_PAYMENT_LINK', 'PAID_TREATMENT', 'FOLLOW_UP_PENDING', 'FOLLOW_UP_COMPLETED', 'TREATMENT_RESUMED') NOT NULL DEFAULT 'NEW',
    `currentCycleId` INTEGER NULL,

    UNIQUE INDEX `Client_patientID_key`(`patientID`),
    UNIQUE INDEX `Client_currentCycleId_key`(`currentCycleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TreatmentCycle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NULL,
    `clientId` INTEGER NOT NULL,
    `status` ENUM('ACTIVE', 'COMPLETED', 'PAUSED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNumber` VARCHAR(191) NOT NULL,
    `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `shippingAddress` VARCHAR(191) NOT NULL,
    `medicationInstructions` VARCHAR(191) NOT NULL,
    `pharmacy` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `shippedDate` DATETIME(3) NULL,
    `trackNumber` VARCHAR(191) NULL,
    `treatmentCycleId` INTEGER NOT NULL,

    UNIQUE INDEX `Order_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FollowUpQuestionnaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduledDate` DATETIME(3) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `completedAt` DATETIME(3) NULL,
    `orderId` INTEGER NOT NULL,
    `treatmentCycleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_currentCycleId_fkey` FOREIGN KEY (`currentCycleId`) REFERENCES `TreatmentCycle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreatmentCycle` ADD CONSTRAINT `TreatmentCycle_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_treatmentCycleId_fkey` FOREIGN KEY (`treatmentCycleId`) REFERENCES `TreatmentCycle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowUpQuestionnaire` ADD CONSTRAINT `FollowUpQuestionnaire_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowUpQuestionnaire` ADD CONSTRAINT `FollowUpQuestionnaire_treatmentCycleId_fkey` FOREIGN KEY (`treatmentCycleId`) REFERENCES `TreatmentCycle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
