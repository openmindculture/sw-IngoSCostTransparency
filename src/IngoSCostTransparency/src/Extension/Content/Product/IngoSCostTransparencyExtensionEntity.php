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
        return $this->costTransparencyPercentage01;
    }

    public function setCostTransparencyPercentage01(?int $costTransparencyPercentage01): void
    {
        $this->costTransparencyPercentage01 = $costTransparencyPercentage01;
    }

    public function getCostTransparencyPercentage02(): int
    {
        return $this->costTransparencyPercentage02;
    }

    public function setCostTransparencyPercentage02(?int $costTransparencyPercentage02): void
    {
        $this->costTransparencyPercentage02 = $costTransparencyPercentage02;
    }

    public function getCostTransparencyPercentage03(): int
    {
        return $this->costTransparencyPercentage03;
    }

    public function setCostTransparencyPercentage03(?int $costTransparencyPercentage03): void
    {
        $this->costTransparencyPercentage01 = $costTransparencyPercentage03;
    }

    public function getCostTransparencyPercentage04(): int
    {
        return $this->costTransparencyPercentage04;
    }

    public function setCostTransparencyPercentage04(?int $costTransparencyPercentage04): void
    {
        $this->costTransparencyPercentage04 = $costTransparencyPercentage04;
    }

    public function getCostTransparencyPercentage05(): int
    {
        return $this->costTransparencyPercentage05;
    }

    public function setCostTransparencyPercentage05(?int $costTransparencyPercentage05): void
    {
        $this->costTransparencyPercentage01 = $costTransparencyPercentage05;
    }
}