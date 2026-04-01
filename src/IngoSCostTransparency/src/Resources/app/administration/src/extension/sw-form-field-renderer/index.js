const { Component } = Shopware;

Component.override('sw-form-field-renderer', {
    inject: ['systemConfigApiService'],
    data() {
        return {
            // Initialize as an empty string or null
            pluginConfig: {}
        };
    },
    async created() {
        // run once per component not per field to
        // Fetch all settings for your plugin domain once
        // FIX: We define 'config' right here as the result of the await
        const config = await this.systemConfigApiService.getValues('IngoSCostTransparency.config');

        // Save the result to our data property
        this.pluginConfig = config;
    },
    computed: {
        fieldBind() {
            console.log('fieldBind');
            // 1. Get the base properties used for the internal input field
            const bind = this.$super('fieldBind') || {};

            // 1. Get the technical name of the current field (e.g., snippetFieldCostFactorLabel01)
            const fieldName = this.$attrs.name;

            const isProductEditor = this.$route.name === 'sw.product.detail.base';

            const isMyField = this.config?.name?.startsWith('IngoSCostTransparency.');
            if (isProductEditor && isMyField)  {
                const settingKey = `IngoSCostTransparency.config.${this.config.name}`;
                const configuredCaption = this.pluginConfig[settingKey];
                if (configuredCaption) {
                    props.label = `${this.$t(this.label)} (${configuredCaption})`;
                    console.log('changed label');
                } else {
                    console.log('no value to change label');
                }
            }

            return props;
        }
    }
});
