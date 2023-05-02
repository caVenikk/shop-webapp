<script>
import UProductCard from './UProductCard.vue';
import '@/assets/stylesheets/products.css'

export default {
    name: 'UProductsGrid',
    computed: {
        products: {
            get() {
                return this.$store.getters['products/getSelected'];
            },
        },
    },
    components: {
        UProductCard
    },
}
</script>

<template>
    <div class="products-container">
        <UProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>