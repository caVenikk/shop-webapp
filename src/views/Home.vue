<script>
import UProductsGrid from '@/components/UProductsGrid.vue';
import ULoader from '@/components/ULoader.vue';

export default {
    name: 'Home',
    components: {
        UProductsGrid,
        ULoader,
    },
    data() {
        return {
            loading: false,
            cant_load: false,
            invoiceLink: {
                type: String,
            }
        }
    },
    computed: {
        products: {
            get() {
                return this.$store.getters['products/getSelected'];
            },
            set(newValue) {
                this.$store.commit('products/setProducts', newValue);
            },
        },
    },
    async created() {
        if (this.products.length !== 0) {
            return;
        }
        this.$retryOperation.attempt(async (currentAttempt) => {
            if (+import.meta.env.VITE_DEV) {
                console.log('Sending request: ', currentAttempt, ' attempt');
            }
            try {
                await this.fetchProducts();
                this.loading = false;
            } catch (err) {
                if (this.$retryOperation.retry(err)) {
                    return;
                }
            } finally {
                if (currentAttempt === this.$retryOperation._originalTimeouts.length) {
                    this.cant_load = true;
                }
            }
        });
    },
    methods: {
        async fetchProducts() {
            this.loading = true;
            await this.$axios.get(
                'products/'
            )
                .then((response) => {
                    this.products = response.data;
                })
        },
        async createInvoiceLink(product) {
            await this.$axios.post(
                'create_invoice_link/', {
                product: product,
                user_id: this.$tg.initDataUnsafe.user.id
            }
            )
                .then((response) => {
                    this.invoiceLink = response.data.invoice_link;
                })
        },
        async onSendData() {
            this.$tg.MainButton.offClick(this.onSendData);
            this.$router.push({ path: 'order_data/:selected_products', name: "OrderData" });
        },
        async onInvoiceClosed(eventData) {
            if (eventData.status === "cancelled") {
                this.$tg.MainButton.show();
            } else if (eventData.status === "paid") {
                this.$tg.close();
            }
        },
    },
    mounted() {
        if (this.$tg.BackButton.isVisible) {
            this.$tg.BackButton.hide();
        }
        if (this.$tg.MainButton.isVisible) {
            this.$tg.MainButton.setText('Просмотреть заказ');
        }
        if (this.$tg.platform === "unknown") {
            this.$tg.MainButton.textColor = "#fff";
            this.$tg.MainButton.color = "#1eb504";
        } else {
            const body = document.querySelector('body');
            this.$tg.MainButton.textColor = getComputedStyle(body).getPropertyValue('--tg-theme-button-text-color');
            this.$tg.MainButton.color = getComputedStyle(body).getPropertyValue('--tg-theme-button-color');
        }
        this.$tg.onEvent("mainButtonClicked", this.onSendData);
        this.$tg.onEvent("invoiceClosed", this.onInvoiceClosed);
        return () => {
            this.$tg.offEvent("mainButtonClicked", this.onSendData);
            this.$tg.offEvent("invoiceClosed", this.onInvoiceClosed);
        }
    }
}
</script>

<template>
    <div class="main">
        <UProductsGrid v-if="!loading && !cant_load" />
        <ULoader v-else-if="loading && !cant_load" />
        <span v-else>Сервис временно недоступен.<br>Приносим извинения за предоставленные неудобства.</span>
    </div>
</template>

<style lang="scss">
.main {
    max-width: 390px;
    margin: 0 auto;
    overflow-x: hidden;
}
</style>
