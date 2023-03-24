<script>
import UProductsGrid from './components/UProductsGrid.vue';
import ULoader from './components/ULoader.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        UProductsGrid,
        ULoader,
    },
    data() {
        return {
            products: {
                type: Array,
                required: true,
            },
            loading: false,
            cant_load: false,
            invoiceLink: {
                type: String,
            }
        }
    },
    async created() {
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
                if (currentAttempt == this.$retryOperation._originalTimeouts.length) {
                    this.cant_load = true;
                }
            }
        });
    },
    methods: {
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async fetchProducts() {
            this.products = null;
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
            await this.createInvoiceLink(this.$store.getters['product/getSelected']);
            this.$tg.openInvoice(this.invoiceLink);
        },
        async onInvoiceClosed(eventData) {
            if (eventData.status == "cancelled") {
                this.$tg.MainButton.show();
            }
        },
    },
    computed: {
        ...mapGetters('product', ['getSelected']),
        ...mapActions('product', ['setSelected']),
    },
    mounted() {
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
        <UProductsGrid v-if="!loading && !cant_load" :products="products" />
        <ULoader v-else-if="loading && !cant_load" />
        <span v-else>Сервис временно недоступен.<br>Приносим извинения за предоставленные неудобства.</span>
    </div>
</template>
