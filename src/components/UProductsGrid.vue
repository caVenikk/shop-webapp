<script>
import UProductCard from './UProductCard.vue';

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

<style lang="scss" scoped>
.products-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 200px;
}
</style>