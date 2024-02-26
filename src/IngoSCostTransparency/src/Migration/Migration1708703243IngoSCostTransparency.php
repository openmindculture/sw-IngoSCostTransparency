<?php declare(strict_types=1);

namespace IngoSCostTransparency\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1708703243IngoSCostTransparency extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1708703243;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
CREATE TABLE IF NOT EXISTS `ingo_s_cost_transparency_extension` (
    `id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NULL,
    `cost_transparency_percentage_01` VARCHAR(255) NULL,
    `cost_transparency_percentage_02` VARCHAR(255) NULL,
    `cost_transparency_percentage_03` VARCHAR(255) NULL,
    `cost_transparency_percentage_04` VARCHAR(255) NULL,
    `cost_transparency_percentage_05` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    PRIMARY KEY (`id`),
    KEY `fk.ingo_s_cost_transparency_extension.product_id` (`product_id`),
    CONSTRAINT `fk.ingo_s_cost_transparency_extension.product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL;
        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
