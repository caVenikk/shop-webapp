<script>
import UProductsList from '../components/UProductsList.vue';

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
            return this.products.reduce((acc, product) => {
                return acc + (product.counter > 0 ? product.price : 0) * product.counter
            }, 0)
        }
    },
    components: {
        UProductsList,
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
            this.$tg.offEvent("mainButtonClicked", this.onSendData);
            this.$router.back();
        },
        async createInvoiceLink() {
            const filteredProducts = this.products.filter(product => product.counter !== 0);
            const productsWithoutCounters = filteredProducts.map(({ counter, ...rest }) => {
                return {
                    ...rest,
                    counter
                };
            });
            const counters = filteredProducts.map(({ counter }) => counter);
            delete productsWithoutCounters.counter;
            console.log({
                products: productsWithoutCounters,
                counters: counters,
                user_id: this.$tg.initDataUnsafe.user.id
            });
            await this.$axios.post(
                'create_invoice_link/', {
                products: productsWithoutCounters,
                counters: counters,
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
            if (eventData.status === "cancelled") {
                this.$tg.MainButton.show();
            } else if (eventData.status === "paid") {
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
                <span @click="onBackButtonClicked" class="link">Редактировать</span>
            </div>
            <UProductsList />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    padding: 0 6px;
}

.order-data {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .data-caption {
        font-weight: bolder;
        font-size: 17px;
        line-height: 21px;
        user-select: none;
    }

    .link {
        color: #31b545;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        text-decoration: none;
        cursor: pointer;
    }
}
</style>