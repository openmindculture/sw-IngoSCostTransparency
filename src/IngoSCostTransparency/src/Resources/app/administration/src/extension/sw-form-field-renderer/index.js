const { Component } = Shopware;

Component.override('sw-form-field-renderer', {
    inject: ['systemConfigApiService'],
    data() {
        return {
            // Initialize as an empty string or null
            pluginConfig: null // Start as null to make checks easier
        };
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
                const snippetKey = `ingos.costTransparency.costFactorLabel${suffix}`;
                // Trigger lazy load if not already fetching/fetched
                if (Object.keys(this.customSnippets).length === 0) {
                    this.loadCustomSnippets();
                }

                const dynamicValue = this.customSnippets[snippetKey];

                if (dynamicValue) {
                    const baseLabel = this.$t(this.config?.label || bind.label);
                    bind.label = `${baseLabel} (${dynamicValue})`;
                }
            }

            return bind;
        },
        async loadCustomSnippets() {
            // 1. Guard: If already loading or already have data, stop.
            if (this.isLoadingSnippets || Object.keys(this.customSnippets).length > 0) {
                return;
            }

            this.isLoadingSnippets = true;

            try {
                // 2. Fetch from the database-backed snippet service
                // We search for your specific namespace
                const criteria = {
                    filter: [
                        { type: 'contains', field: 'translationKey', value: 'ingos.costTransparency' }
                    ]
                };

                const response = await this.snippetSetApiService.getCustomList(1, 100, criteria);

                // 3. Transform the collection into a simple Key -> Value map
                const mapped = {};
                if (response && response.data) {
                    Object.values(response.data).forEach(snippet => {
                        mapped[snippet.translationKey] = snippet.value;
                    });
                }

                // 4. Update state (triggers reactivity in 'computed')
                this.customSnippets = mapped;

                console.log('Successfully loaded dynamic snippets:', this.customSnippets);
            } catch (e) {
                console.error('InSCostTransparency: Snippet API Error', e);
                // Set to a dummy object so we don't keep retrying on every hover/render
                this.customSnippets = { _error: true };
            } finally {
                this.isLoadingSnippets = false;
            }
        }
    }
});
