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
        bind() { // runs once per field
            const bind = this.$super('bind');
            const isProductEditor = this.$route.name === 'sw.product.detail.base';
            const isMyField = this.config?.name?.startsWith('IngoSCostTransparency.');
            if (isProductEditor && isMyField)  {
                const settingKey = `IngoSCostTransparency.config.${this.config.name}`;
                const tooltipFromConfig = this.pluginConfig[settingKey];
                const tooltipValue = tooltipFromConfig || this.$t(this.config.name);
                bind.helpText = tooltipValue;
                if (!bind.config) {
                    bind.config = {};
                }
                bind.config.helpText = tooltipValue;
            }
            console.log('return bind', bind);
            return bind;
        }
    }
});
