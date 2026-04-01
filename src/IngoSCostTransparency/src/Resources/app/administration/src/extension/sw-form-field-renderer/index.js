const { Component } = Shopware;

Component.override('sw-form-field-renderer', {
    inject: ['systemConfigApiService'],
    data() {
        return {
            // Initialize as an empty string or null
            pluginConfig: null // Start as null to make checks easier
        };
    },
    async created() {
        // run once per component not per field to
        // Fetch all settings for your plugin domain once
        // FIX: We define 'config' right here as the result of the await
        const config = await this.systemConfigApiService.getValues('IngoSCostTransparency.config');
        console.log('API Response:', JSON.parse(JSON.stringify(config)));

        // Save the result to our data property
        this.pluginConfig = config;
    },
    computed: {
        bind() { console.log('bind');
            // 1. Get the base properties from the original renderer
            const bind = this.$super('bind');

            if (!this.pluginConfig) return bind;

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
                const suffix = fieldName.replace('ingos_cost_transparency_percentage_', ''); // e.g., "01"
// 1. Construct your snippet key
                const snippetKey = `ingos.costTransparency.costFactorLabel${suffix}`;


                // 2. Fetch the snippet directly via Vue-i18n
                const dynamicValue = this.$t(snippetKey);
                console.log('dynamicValue', dynamicValue);
                // ingos.costTransparency.costFactorLabel03
                // this.$t('ingos.costTransparency.costFactorLabel01')
                // 3. Apply it (Vue returns the key itself if the snippet is missing)
                if (dynamicValue && dynamicValue !== snippetKey) {
                    const baseLabel = this.$t(this.config?.label || bind.label);
                    bind.label = `${baseLabel} (${dynamicValue})`;
                    console.log(`Label updated for ${fieldName}:`, bind.label);
                }
            }

            return bind;
        }
    }
});
