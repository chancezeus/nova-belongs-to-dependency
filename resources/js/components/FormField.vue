<script>
export default {
    data: () => ({
        dependsOnValue: null,
        watcherDebounce: null,
        watcherDebounceTimeout: 200,
    }),

    created() {
        if (this.field.dependsOn !== undefined) {
            Nova.$on(this.field.dependsOn + '-change', this.dependencyWatcher);

            this.$nextTick(() => {
                const component = this.$parent.$children.find(
                    component => component.field && component.field.attribute === this.field.dependsOn
                );

                if (component) {
                    if (component.selectedResourceId !== undefined) {
                        this.dependencyWatcher(component.selectedResourceId);
                    } else if (component.value !== undefined) {
                        this.dependencyWatcher(component.value);
                    }
                }
            });
        }
    },

    beforeDestroy() {
        if (this.watcherDebounce) {
            clearTimeout(this.watcherDebounce);
        }

        Nova.$off(this.field.dependsOn + '-change', this.dependencyWatcher);
    },

    methods: {
        dependencyWatcher(value) {
            clearTimeout(this.watcherDebounce);

            this.watcherDebounce = setTimeout(() => {
                if (value === this.dependsOnValue) {
                    return;
                }

                this.dependsOnValue = value;

                this.clearSelection();
                this.$nextTick(() => {
                    this.initializeComponent();
                });

                this.watcherDebounce = null;
            }, this.watcherDebounceTimeout);
        },
    },

    computed: {
        queryParams() {
            return {
                params: {
                    current: this.selectedResourceId,
                    first: this.initializingWithExistingResource,
                    search: this.search,
                    withTrashed: this.withTrashed,
                    dependsOnValue: this.dependsOnValue,
                },
            };
        },
    },
}
</script>
