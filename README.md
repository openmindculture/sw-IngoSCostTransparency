# sw-IngoSCostTransparency

Inspired by potential customers' requirements and based on my [Shopware 6 Theme Plugin Development Template](https://github.com/openmindculture/IngoSDev6CertPrep), IngoSCostTransparency is a free and open-source extension for Shopware 6 that adds optional additional product details as custom fields with responsive and accessible graphic percentage display on the product details. Colors default to theme colors but can be modified by overwriting custom CSS properties. Default cost factor names are provided in English and German. Custom names can be set in the theme configuration.

Contribution: you can open issues and pull requests on GitHub.

![screenshot](./product-cost-percentage-transparency.png)

## Development

### Dockware Development Environment

Thanks to [dasistweb](https://www.dasistweb.de/), the Docker-based [dockware](https://docs.dockware.io/) containers provide a useful alternative to Shopware's nixOS/flex/[devenv-based approach](https://developer.shopware.com/docs/guides/installation/devenv.html). The setup is based on the lastest dev image. We don't need no parent project container repository anymore! `custom/plugins` is now mounted to the project `src` directory as recommended in the [dockware example files on GitHub](https://github.com/dockware/examples).

### Start the Shopware Development Container

- `docker-compose up -d`

### Open the Storefront or Administration in a Browser

- http://localhost/
- http://localhost/admin (default credentials: admin:shopware)

### Enter the Container Shell

- `docker exec -it shop bash`

You will start in the Shopware project root `/var/www/html` where you can type console commands like
`bin/console plugin:create foobar`
to create a new plugin structure.

#### Useful Console Commands

- `bin/console cache:clear`
- `bin/console theme:refresh`

#### Optional Verbose vs. Silent Switches

There is no verbose switch.
Scripts seem to output verbose warnings by default. Add `--no-debug` to suppress  noncritical warnings and deprecation messages, e.g.:

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

## Shopware Platform Source Code in Dockware

- `/var/www/html/vendor/shopware`

- TODO: mounting this as a secondary volume broke the installation.

- Workaround to see the shop source in the IDE: check it out into another, gitignored, directory:

- `git clone https://github.com/shopware/shopware.git sw_platform_src`

## Theme Creation and Installation Cookbook

In the local development environment:

- `docker-compose up -d`
- `docker exec -it shop bash`
- `bin/console theme:create MyTheme`
- `bin/console plugin:refresh`
- `bin/console plugin:install --activate MyTheme`
- `bin/console theme:change`
- in the menu, choose `[1] MyTheme`
- choose to apply it to the `storefront` channel
- `bin/build-storefront.sh`
- `bin/console cache:clear`
- open http://localhost/admin
- verify that you see `MyTheme` installed and activated in My extensions -> Themes!
- (adjust file rights / ownerships so that the command line interface inside the docker container and the IDE user outside can both write to files and directories)

Now you can modify the theme and repeat these steps:

- `bin/console theme:compile`
- `bin/build-storefront.sh`
- `bin/console cache:clear`

### Theme Export and Verification

Last but not least, you can build an exportable zip archive file to upload into a shop backend or Shopware's plugin marketplace.

There is an optional Shopware CLI that is not included in Dockware. You can get it from
[sw-cli.fos.gg](https://sw-cli.fos.gg) and use the `extension` command to build a theme file:

- `shopware-cli extension zip MyTheme`
