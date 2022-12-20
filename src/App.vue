<script>
import UProductsGrid from './components/UProductsGrid.vue';

export default {
    components: {
        UProductsGrid,
    },
    data() {
        return {
            products: {
                type: Array,
                required: true,
            },
            loading: false,
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
            }
        });
    },
    methods: {
        async fetchProducts() {
            this.products = null;
            this.loading = true;
            await this.$axios.get(
                'products/'
            )
                .then((response) => {
                    this.products = response.data;
                })
        }
    },
}
</script>

<template>
    <div class="main">
        <UProductsGrid
            v-if="!loading"
            :products="products"
        />
        <span v-else>Сервис временно недоступен.<br>Приносим извинения за предоставленные неудобства</span>
    </div>
</template>
