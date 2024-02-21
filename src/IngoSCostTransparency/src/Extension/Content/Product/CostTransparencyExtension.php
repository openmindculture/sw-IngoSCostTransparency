<?php declare(strict_types=1);

namespace IngoSCostTransparency\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
class IngoSCostTransparencyExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToOneAssociationField('ingoSCostTransparencyExtension', 'id', 'product_id', IngosCostTransparencyExtensionDefinition::class, true)
            // Property names are usually camelCase, with the first character being lower cased.
            // You most likely noticed the new class ExampleExtensionDefinition, which we're going to create now.
            // It will contain the actual string field that we wanted to add to the product.
            // Of course, this new definition also needs to be registered to the DI container (services.xml)
            // Of course, you have to add the new database table via a Database migration.
        );
    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}