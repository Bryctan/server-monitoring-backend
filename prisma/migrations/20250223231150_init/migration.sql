-- CreateTable
CREATE TABLE `metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servers_types_measurements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serverId` INTEGER NOT NULL,
    `typeMeasurementId` INTEGER NOT NULL,

    INDEX `servers_types_measurements_serverId_fkey`(`serverId`),
    INDEX `servers_types_measurements_typeMeasurementId_fkey`(`typeMeasurementId`),
    UNIQUE INDEX `servers_types_measurements_serverId_typeMeasurementId_key`(`serverId`, `typeMeasurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types_measurements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types_measurements_metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeMeasurementId` INTEGER NOT NULL,
    `metricId` INTEGER NOT NULL,

    INDEX `types_measurements_metrics_metricId_fkey`(`metricId`),
    INDEX `types_measurements_metrics_typeMeasurementId_fkey`(`typeMeasurementId`),
    UNIQUE INDEX `types_measurements_metrics_typeMeasurementId_metricId_key`(`typeMeasurementId`, `metricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `servers_types_measurements` ADD CONSTRAINT `servers_types_measurements_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `servers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servers_types_measurements` ADD CONSTRAINT `servers_types_measurements_typeMeasurementId_fkey` FOREIGN KEY (`typeMeasurementId`) REFERENCES `types_measurements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `types_measurements_metrics` ADD CONSTRAINT `types_measurements_metrics_metricId_fkey` FOREIGN KEY (`metricId`) REFERENCES `metrics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `types_measurements_metrics` ADD CONSTRAINT `types_measurements_metrics_typeMeasurementId_fkey` FOREIGN KEY (`typeMeasurementId`) REFERENCES `types_measurements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
