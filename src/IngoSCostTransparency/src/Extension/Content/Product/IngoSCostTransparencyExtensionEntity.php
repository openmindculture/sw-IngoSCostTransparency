<?php
declare(strict_types=1);

namespace IngoSCostTransparency\Extension\Content\Product;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class IngoSCostTransparencyExtensionEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var int|null
     */
    protected $costTransparencyPercentage01;

    /**
     * @var int|null
     */
    protected $costTransparencyPercentage02;

    /**
     * @var int|null
     */
    protected $costTransparencyPercentage03;

    /**
     * @var int|null
     */
    protected $costTransparencyPercentage04;

    /**
     * @var int|null
     */
    protected $costTransparencyPercentage05;

    public function getCostTransparencyPercentage01(): int
    {
        return $this->ensurePercentageRange($this->costTransparencyPercentage01);
    }

    public function setCostTransparencyPercentage01(?int $costTransparencyPercentage01): void
    {
        $this->costTransparencyPercentage01 = $this->ensurePercentageRange($costTransparencyPercentage01);
    }

    public function getCostTransparencyPercentage02(): int
    {
        return $this->ensurePercentageRange($this->costTransparencyPercentage02);
    }

    public function setCostTransparencyPercentage02(?int $costTransparencyPercentage02): void
    {
        $this->costTransparencyPercentage02 = $this->ensurePercentageRange($costTransparencyPercentage02);
    }

    public function getCostTransparencyPercentage03(): int
    {
        return $this->ensurePercentageRange($this->costTransparencyPercentage03);
    }

    public function setCostTransparencyPercentage03(?int $costTransparencyPercentage03): void
    {
        $this->costTransparencyPercentage01 = $this->ensurePercentageRange($costTransparencyPercentage03);
    }

    public function getCostTransparencyPercentage04(): int
    {
        return $this->ensurePercentageRange($this->costTransparencyPercentage04);
    }

    public function setCostTransparencyPercentage04(?int $costTransparencyPercentage04): void
    {
        $this->costTransparencyPercentage04 = $this->ensurePercentageRange($costTransparencyPercentage04);
    }

    public function getCostTransparencyPercentage05(): int
    {
        return $this->ensurePercentageRange($this->costTransparencyPercentage05);
    }

    public function setCostTransparencyPercentage05(?int $costTransparencyPercentage05): void
    {
        $this->costTransparencyPercentage01 = $this->ensurePercentageRange($costTransparencyPercentage05);
    }

    protected function ensurePercentageRange(?int $value): int
    {
        if (empty($value) || $value < 0) {
            return 0;
        }

        if ($value > 100) {
            return 100;
        }

        return $value;
    }
}