<?php declare(strict_types=1);

namespace IngoSCostTransparency\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class IngoSCostTransparencyExtensionDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'ingo_s_cost_transparency_extension';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return IngoSCostTransparencyExtensionEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            new FkField('product_id', 'productId', ProductDefinition::class),
            (new IntField('cost_transparency_percentage_01', 'costTransparencyPercentage01')),
            (new IntField('cost_transparency_percentage_02', 'costTransparencyPercentage02')),
            (new IntField('cost_transparency_percentage_03', 'costTransparencyPercentage03')),
            (new IntField('cost_transparency_percentage_04', 'costTransparencyPercentage04')),
            (new IntField('cost_transparency_percentage_05', 'costTransparencyPercentage05')),
            new OneToOneAssociationField('product', 'product_id', 'id', ProductDefinition::class, false)
        ]);
    }
}