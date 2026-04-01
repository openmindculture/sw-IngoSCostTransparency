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
        bind() { console.log('bind');
            // 1. Get the base properties from the original renderer
            const bind = this.$super('bind');

            // 2. GUARD: If pluginConfig is still empty, return the original bind object
            // This prevents errors and ensures the UI shows the default label initially
            if (!this.pluginConfig || Object.keys(this.pluginConfig).length === 0) {
                console.log('pluginConfig not ready yet');
                return bind;
            }
            console.log('pluginConfig is ready now');

            // 2. Identify the field using the config name from config.xml
            // const fieldName = this.$attrs.config?.name;
            const fieldName = this.$attrs.name;
            console.log('fieldName (this $attrs.name)', fieldName);

            // 3. Match your prefix and target the product editor specifically
            const isProductEditor = this.$route.name?.includes('sw.product.detail');
            const isMyField = fieldName?.startsWith('ingos_cost_transparency_percentage');

            if (isProductEditor && isMyField) {
                // ingos_cost_transparency_percentage_01
                // ingos.costTransparency.costFactorLabel01
                const settingKey = fieldName.replace('ingos_cost_transparency_percentage_', 'ingos.costTransparency.costFactorLabel');
                const dynamicValue = this.pluginConfig[settingKey];
                console.log('dynamicValue', dynamicValue);
                if (dynamicValue) {
                    // 4. Update the label.
                    // We use this.$t to ensure we translate the original label first.
                    const baseLabel = this.$t(this.config.label || bind.label);
                    bind.label = `${baseLabel} (${dynamicValue})`;

                    console.log(`Label updated for ${fieldName}:`, bind.label);
                }
            }
        }
    }
});
