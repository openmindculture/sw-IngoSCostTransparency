# Ingo's Kostentransparenz für Shopware 6

Inspiriert durch Anforderungen potentieller Kund:innen und basierend auf [Ingo Steinkes](https://www.ingo-steinke.com/) [Shopware 6 Theme/Plugin Development Template](https://github.com/openmindculture/IngoSDev6CertPrep) ist [IngoSCostTransparency (`sw-IngoSCostTransparency`)](https://github.com/openmindculture/sw-IngoSCostTransparency) eine freie und quelloffene Erweiterung für Shopware 6, die zusätzliche optionale Produktdetail-Reiter ergänzt, in denen responsiv und barrierefrei eine grafische Datenvisualisation in Form eines prozentualen Balkendiagramms angezeigt wird.

TODO: konkreten Zweck/Anwendungsfall ergänzen!

TODO: zuende übersetzen, vor allem für die Beschreibung im Marketplace.

Colors default to theme colors but can be modified by overwriting custom CSS properties. Label captions can be configured in the extension configuration.

## Configuration

To configure the plugin's labels and visibility, open the Administration and go to "My extensions". In the plugin's context menu (three dots or a similar icon), click on "configure". This should open the configuration page where you can toggle the global visibility ("show cost transparency on product detail pages") and edit labels and descriptions that will be used for all products where cost transparency data is available.

![screenshot collage](./cost-transparency-configuration.png)

## Storefront Display

The layout is responsive and accessible. Mobile content will be displayed off canvas like the built-in description and reviews tabs. Tablet and mobile views show column rows, while wide desktop screens show columns. Captions of small columns will be shortened. The full caption is available in a title tag. Simple HTML markup is possible in captions, like using bold tags or list items.

![screenshot collage](./product-cost-percentage-transparency.png)

## Usage, Notes, and Caveats

In the basic plugin version, up to five different cost factors can be defined per product, using the labels defined in the extension settings. If any values are set, an additional data visualization tab will be shown on the product details  page using a bar chart with percentage sizes. Please note: using multiple values below 10% might compromise readability.  It is possible to use HTML in the description blocks for each cost factor.

Data visualization might deviate from the precise percentages and may vary depending on screens, browsers, and operating systems. Visual output can also vary due to other reasons like Shopware versions, settings, and other plugins. Screenshots in the documentation and in the Shopware marketplace predate the official plugin release and might differ from the output in users' storefronts.

Future/premium plugin options:
- adjust colors and animations
- add more global cost factors
- add per-product cost factors/labels
- override cost factor descriptions per product
- select adjustment methods to improve low value readability

### Custom Fields and Localizable Snippets

Labels are translatable snippet strings e.g.

- label: string snippet `ingos.costTransparency.costFactorLabel01`

Values are custom fields stored in and read from the built-in customFields JSON array using the productRepository.

The basic plugin version uses the following five percentage values per product:

- value: integer `product.customFields.ingos_cost_transparency_percentage_01`
- value: integer `product.customFields.ingos_cost_transparency_percentage_02`
- value: integer `product.customFields.ingos_cost_transparency_percentage_03`
- value: integer `product.customFields.ingos_cost_transparency_percentage_04`
- value: integer `product.customFields.ingos_cost_transparency_percentage_05`

## Compatibility and Contribution

### Initial Release 1.0, March 2024

The storefront has been tested with the lastest major browsers, including Chrome, Firefox, Edge, and Safari, on desktop and mobile devices. Chromium, Vivaldi and Opera have also been tested successfully. The basic functionality should, but is not guaranteed, to work in other browsers like Internet Explorer and older Safari versions. The plugin has been tested with and released for Shopware 6.6, and it is probably backwards compatible with Shopware 6.5 for which it had initially been developed.

### Contribution

You can open issues and pull requests [on GitHub](https://github.com/openmindculture/sw-IngoSCostTransparency).

## Entwicklung und weitere technische Details

siehe englischsprachiges [README](./README.md)y.