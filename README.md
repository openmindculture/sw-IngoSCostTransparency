# Ingo's Cost Transparency for Shopware 6

## sw-IngoSCostTransparency

Inspired by potential customers' requirements and based on my [Shopware 6 Theme/Plugin Development Template](https://github.com/openmindculture/IngoSDev6CertPrep),
IngoSCostTransparency is a free and open-source extension for Shopware 6 that adds optional additional product details
as custom fields with responsive and accessible graphic percentage display on the product details. Colors default to
theme colors but can be modified by overwriting custom CSS properties. Labels can be set in the extension configuration.

Contribution: you can open issues and pull requests on GitHub.

![screenshot](./product-cost-percentage-transparency.png)

In the basic plugin version, up to five different cost factors can be defined per product, using the labels defined in
the extension settings. If any values are set, an additional data visualization tab will be shown on the product details
page using a bar chart with percentage sizes. Please note: using multiple values below 10% might compromise readability.

Future/premium plugin options:
- adjust colors and animations
- add more global cost factors
- add per-product cost factors/labels
- select adjustment methods to improve low value readability

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
- `bin/console theme:compile`

#### Optional Verbose vs. Silent Switches

There is no verbose switch.
Scripts seem to output verbose warnings by default. Add `--no-debug` to suppress  noncritical warnings and deprecation
messages, e.g.:

- `bin/console theme:compile --no-debug`

### Stop the Container

- `docker-compose stop`

### Remove the Container

- `docker-compose down -v` (-v will remove created volumes)

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
