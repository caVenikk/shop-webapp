<script>
import UProductList from '../components/UProductList.vue';
export default {
    name: 'OrderData',
    data() {
        return {
            invoiceLink: {
                type: String,
            }
        }
    },
    computed: {
        products: {
            get() {
                return this.$store.getters['products/getSelected'];
            }
        },
        totalPrice() {
            const totalPrice = this.products.reduce((acc, product) => {
                return acc + (product.counter > 0 ? product.price : 0) * product.counter
            }, 0)
            return totalPrice
        }
    },
    components: {
        UProductList,
    },
    mounted() {
        this.$tg.BackButton.show();
        this.$tg.onEvent("backButtonClicked", this.onBackButtonClicked);
        this.$tg.MainButton.setText(`Заплатить ${this.totalPrice} ₽`);
        this.$tg.onEvent("mainButtonClicked", this.onSendData);
        this.$tg.onEvent("invoiceClosed", this.onInvoiceClosed);
        return () => {
            this.$tg.offEvent("mainButtonClicked", this.onSendData);
            this.$tg.offEvent("invoiceClosed", this.onInvoiceClosed);
        }
    },
    methods: {
        async onBackButtonClicked() {
            this.$router.back();
        },
        async createInvoiceLink() {
            const filteredProducts = this.products.filter(product => product.counter !== 0);
            const productsWithoutCounters = filteredProducts.map(({ counter, ...rest }) => rest);
            delete productsWithoutCounters.counter;
            console.log({
                products: productsWithoutCounters,
                user_id: this.$tg.initDataUnsafe.user.id
            });
            await this.$axios.post(
                'create_invoice_link/', {
                products: productsWithoutCounters,
                user_id: this.$tg.initDataUnsafe.user.id
            })
                .then((response) => {
                    this.invoiceLink = response.data.invoice_link;
                })
        },
        async onSendData() {
            await this.createInvoiceLink();
            this.$tg.openInvoice(this.invoiceLink);
        },
        async onInvoiceClosed(eventData) {
            if (eventData.status == "cancelled") {
                this.$tg.MainButton.show();
            } else if (eventData.status == "paid") {
                this.$tg.close();
            }
        },
    },
}
</script>

<template>
    <div class="main">
        <div class="wrapper">
            <div class="order-data">
                <span class="data-caption">ВАШ ЗАКАЗ</span>
                <router-link :to="{ name: 'Home' }" class="link">Редактировать</router-link>
            </div>
            <UProductList />
        </div>
    </div>
</template>