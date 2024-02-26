<?php declare(strict_types=1);

namespace IngoSCostTransparency\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
class IngoSCostTransparencyExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToOneAssociationField('ingoSCostTransparencyExtension', 'id', 'product_id', IngosCostTransparencyExtensionDefinition::class, true));

        $collection->add((new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()));
        $collection->add(new FkField('product_id', 'productId', ProductDefinition::class));
        $collection->add((new IntField('cost_transparency_percentage_01', 'costTransparencyPercentage01')));
        $collection->add((new IntField('cost_transparency_percentage_02', 'costTransparencyPercentage02')));
        $collection->add((new IntField('cost_transparency_percentage_03', 'costTransparencyPercentage03')));
        $collection->add((new IntField('cost_transparency_percentage_04', 'costTransparencyPercentage04')));
        $collection->add((new IntField('cost_transparency_percentage_05', 'costTransparencyPercentage05')));
        $collection->add(new OneToOneAssociationField('product', 'product_id', 'id', ProductDefinition::class, false));

        // Property names are usually camelCase, with the first character being lower cased.
        // You most likely noticed the new class ExampleExtensionDefinition, which we're going to create now.
        // It will contain the actual string field that we wanted to add to the product.
        // Of course, this new definition also needs to be registered to the DI container (services.xml)
        // Of course, you have to add the new database table via a Database migration.

    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}