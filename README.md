# Ingo's Cost Transparency for Shopware 6

## sw-IngoSCostTransparency

Inspired by potential customers' requirements and based on my [Shopware 6 Theme/Plugin Development Template](https://github.com/openmindculture/IngoSDev6CertPrep),  IngoSCostTransparency is a free and open-source extension for Shopware 6 that adds optional additional product details
as custom fields with responsive and accessible graphic percentage display on the product details. Colors default to theme colors but can be modified by overwriting custom CSS properties. Labels can be set in the extension configuration.

The layout is responsive and accessible. Mobile content will be displayed off canvas like the built-in description and reviews tabs. Tablet and mobile views show column rows, while wide desktop screens show columns. Captions of small columns will be shortened. The full caption is available in a title tag. Simple HTML markup is possible in captions, like using bold tags or list items.

Contribution: you can open issues and pull requests [on GitHub](https://github.com/openmindculture/sw-IngoSCostTransparency).

![screenshot](./product-cost-percentage-transparency.png)

In the basic plugin version, up to five different cost factors can be defined per product, using the labels defined in the extension settings. If any values are set, an additional data visualization tab will be shown on the product details  page using a bar chart with percentage sizes. Please note: using multiple values below 10% might compromise readability.  It is possible to use HTML in the description blocks for each cost factor.

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

## Compatibilty (Initial Release 1.0, March 2024)

The storefront has been tested with the lastest major browsers, including Chrome, Firefox, Edge, and Safari, on desktop and mobile devices. The plugin has been tested with and released for Shopware 6.6, and it is probably backwards compatible with Shopware 6.5 for which it had initially been developed.

## Development

### Dockware Development Environment

Thanks to [dasistweb](https://www.dasistweb.de/), the Docker-based [dockware](https://docs.dockware.io/) containers provide a useful alternative to Shopware's
nixOS/flex/[devenv-based approach](https://developer.shopware.com/docs/guides/installation/devenv.html). The setup is based on the lastest dev image. We don't need no parent project
container repository anymore! `custom/plugins` is now mounted to the project `src` directory as recommended in the
[dockware example files on GitHub](https://github.com/dockware/examples).

### Start the Shopware Development Container

- `docker-compose up -d`

### Open the Storefront or Administration in a Browser

- http://localhost/
- http://localhost/admin (default credentials: admin:shopware)
- http://localhost//adminer.php (Server: 127.0.0.1, not localhost; database: shopware, root:root)

### Enter the Container Shell

- `docker exec -it shopware bash`

You will start in the Shopware project root `/var/www/html` where you can type console commands like
`bin/console plugin:create foobar`
to create a new plugin structure.

### Install Symfony Profiler

Install development tools, if they are not already pre-installed, like the Symfony Profiler:

`composer require --dev symfony/profiler-pack`

### Ensure File Permissions

New or copied content might not have the required permissions yet.
We might need to grant them expicitly by a command like

`sudo chmod -R ugo+rw src` (outside the container) or

`chmod -R ugo+rw custom/plugins`

#### Useful Console Commands

- `bin/console cache:clear`
- `bin/console plugin:refresh`
- `bin/build-storefront.sh`

### Stop the Container

- `docker-compose stop`

### Remove the Container

- `docker-compose down -v` (-v will remove created volumes)

### Update Shopware version by updating Dockware

- `docker pull shopware/dev`

## Logfile Locations

### Shopware Logs in Dockware

- `/var/www/html/var/log`

#### System Logs in Dockware

- `/var/log`

### Shopware Platform Source Code in Dockware

- `/var/www/html/vendor/shopware`

- TODO: mounting this as a secondary volume broke the installation.

- Workaround to see the shop source in the IDE: check it out into another, git-ignored, directory:

- `git clone https://github.com/shopware/shopware.git sw_platform_src`

- then "mark directory as" -> "sources root"

### Extension Export and Verification

Last but not least, you can build an exportable zip archive file to upload into a shop backend or Shopware's extension
marketplace.

There is an optional Shopware CLI that is not included in Dockware. You can get it from
[sw-cli.fos.gg](https://sw-cli.fos.gg) and use the `extension` command to build a theme file:

- `shopware-cli extension zip MyTheme`

The `--disable-git` to "use the source folder as it is" will include ignored files like the `vendor` folder and might
result in a zip file of > 60 MB that you would not want to distribute as a plugin! If we use git, we should explicitly
specify which tag or commit hash to check out, e.g. `--git-commit string 0.9.0` but this does not work inside the
container before configuring git, as the `shopware-cli` expects a respository with no additional settings (like our
dockware configuration) around it, and creating an ad-hoc respository below the existing one can cause new problems
like a fatal "dubious ownership in repository" error.

Pragmatically, we could delete the `vendor` directory before creating the zip distribution.
- `rm -rf custom/plugins/IngoSCostTransparency/vendor/`
- `shopware-cli extension zip custom/plugins/IngoSCostTransparency/ --disable-git --release --output-directory custom/plugins/dist_tmp`

Now we created the file `custom/plugins/dist_tmp/IngoSCostTransparency.zip` which is visible as
`src/dist_tmp/IngoSCostTransparency.zip` outside the container and could be moved to `dist`:
- `sudo mv src/dist_tmp/* dist` to commit it in this development repository.