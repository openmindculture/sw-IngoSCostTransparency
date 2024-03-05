<?php declare(strict_types=1);

namespace IngoSCostTransparency;

use \Shopware\Core\Defaults;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class IngoSCostTransparency extends Plugin
{
    private const CUSTOM_FIELDSET_NAME = 'ingos_cost_transparency_custom_field_set';

    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);

        $customFieldSetRepository = $this->container->get('custom_field_set.repository');
        if (!class_exists($customFieldSetRepository)) {
            return;
        }

        $customFieldSetRepository->upsert([
            [
                'id' => $this->getExistingCustomFieldsetUuid(self::CUSTOM_FIELDSET_NAME, $installContext->getContext()),
                'name' => self::CUSTOM_FIELDSET_NAME,
                'config' => [
                    'label' => [
                        'de-DE' => 'Kostenfaktoren',
                        'en-GB' => 'Cost Factors',
                        Defaults::LANGUAGE_SYSTEM => 'Cost Factors',
                    ]
                ],
                'customFields' => [
                    [
                        'name' => 'ingos_cost_transparency_percentage_01',
                        'type' => CustomFieldTypes::INT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Kostenfaktor 1 Prozentsatz',
                                'en-GB' => 'cost factor 1 percentage',
                                Defaults::LANGUAGE_SYSTEM => 'cost factor 1 percentage',
                            ],
                            'type' => 'number',
                            'numberType' => 'int',
                            'customFieldType' => 'number',
                            'step' => 1,
                            'min' => 0,
                            'max' => 100,
                            'customFieldPosition' => 1,
                        ],
                        'active' => true,
                    ],
                    [
                        'name' => 'ingos_cost_transparency_percentage_02',
                        'type' => CustomFieldTypes::INT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Kostenfaktor 2 Prozentsatz',
                                'en-GB' => 'cost factor 2 percentage',
                                Defaults::LANGUAGE_SYSTEM => 'cost factor 2 percentage',
                            ],
                            'type' => 'number',
                            'numberType' => 'int',
                            'customFieldType' => 'number',
                            'step' => 1,
                            'min' => 0,
                            'max' => 100,
                            'customFieldPosition' => 2,
                        ],
                        'active' => true,
                    ],
                    [
                        'name' => 'ingos_cost_transparency_percentage_03',
                        'type' => CustomFieldTypes::INT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Kostenfaktor 3 Prozentsatz',
                                'en-GB' => 'cost factor 3 percentage',
                                Defaults::LANGUAGE_SYSTEM => 'cost factor 3 percentage',
                            ],
                            'type' => 'number',
                            'numberType' => 'int',
                            'customFieldType' => 'number',
                            'step' => 1,
                            'min' => 0,
                            'max' => 100,
                            'customFieldPosition' => 3,
                        ],
                        'active' => true,
                    ],
                    [
                        'name' => 'ingos_cost_transparency_percentage_04',
                        'type' => CustomFieldTypes::INT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Kostenfaktor 4 Prozentsatz',
                                'en-GB' => 'cost factor 4 percentage',
                                Defaults::LANGUAGE_SYSTEM => 'cost factor 4 percentage',
                            ],
                            'type' => 'number',
                            'numberType' => 'int',
                            'customFieldType' => 'number',
                            'step' => 1,
                            'min' => 0,
                            'max' => 100,
                            'customFieldPosition' => 4,
                        ],
                        'active' => true,
                    ],
                    [
                        'name' => 'ingos_cost_transparency_percentage_05',
                        'type' => CustomFieldTypes::INT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Kostenfaktor 5 Prozentsatz',
                                'en-GB' => 'cost factor 5 percentage',
                                Defaults::LANGUAGE_SYSTEM => 'cost factor 5 percentage',
                            ],
                            'type' => 'number',
                            'numberType' => 'int',
                            'customFieldType' => 'number',
                            'step' => 1,
                            'min' => 0,
                            'max' => 100,
                            'customFieldPosition' => 5,
                        ],
                        'active' => true,
                    ],
                ],
                'relations' => [
                    [
                        'entityName' => 'product',
                    ],
                ],
            ],
        ], $installContext->getContext());
    }

    private function getExistingCustomFieldsetUuid($customFieldsetName, $context): Uuid|null
    {
        $customFieldRepository = $this->container->get('custom_field.repository');

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('name', $customFieldsetName));
        $customField = $customFieldRepository->search($criteria, $context)->first();
        if ($customField !== null) {
            return $customField->getId();
        }
        return null;
    }
}