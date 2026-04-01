import template from './sw-form-field-renderer.html.twig';

const { Component } = Shopware;

Component.override('sw-form-field-renderer', {
    computed: {
        bind() {
            // Get the original bind properties from the parent
            const bind = this.$super('bind');

            // Check if the current ADMIN route is the product detail page
            const isProductEditor = this.$route.name === 'sw.product.detail.base';

            // Check if the field belongs to your set
            const isMyField = this.config?.name?.startsWith('IngoSCostTransparency.');


            // Identify your field by its technical name
            // 'this.config.name' matches the name used when creating the custom field
            if (isProductEditor && isMyField)  {

                // Inject the tooltip text dynamically.
                // This is only a UI-layer change and never touches the database.
                bind.helpText = this.$t(this.config.name);
            }

            return bind;
        }
    }
});


Shopware.Component.override('sw-form-field-renderer', {
    template,
    inject: ['systemConfigApiService'],

    data() {
        return { pluginCaptions: {} };
    },

    async created() {
        console.log('sw-form-field-renderer override loaded');
        const config = await this.systemConfigApiService
            .getValues('IngoSCostTransparency.config');
        console.log('plugin config:', config);

        this.pluginCaptions = {
            'ingos_cost_transparency_custom_field_01': config['IngoSCostTransparency.config.snippetFieldCostFactorLabel01'],
            'ingos_cost_transparency_custom_field_02': config['IngoSCostTransparency.config.snippetFieldCostFactorLabel02'],
            'ingos_cost_transparency_custom_field_03': config['IngoSCostTransparency.config.snippetFieldCostFactorLabel03'],
            'ingos_cost_transparency_custom_field_04': config['IngoSCostTransparency.config.snippetFieldCostFactorLabel04'],
            'ingos_cost_transparency_custom_field_05': config['IngoSCostTransparency.config.snippetFieldCostFactorLabel05'],
        };
    },


    computed: {
        myCustomSettingValue() {
            // Example: Accessing a plugin configuration
            return 'Your dynamic setting value here';
        },
        bind() {
            const bind = this.$super('bind');
            if (this.config?.name?.startsWith('my_custom_set.') && this.myPluginTooltip) {
                bind.helpText = this.myPluginTooltip;
            }
            console.log('computed bind', bind)
            return bind;
            /*
            const fieldName = this.$attrs?.name || this.config?.name;
            const caption = this.pluginCaptions[fieldName];

            if (caption) {
                bind.helpText = caption;
            }
            */
        },
    },
});