<script>
import UProductItem from './UProductItem.vue';

export default {
    name: 'UProductsList',
    computed: {
        products: {
            get() {
                return this.$store.getters['products/getSelected'];
            }
        },
        filteredProducts() {
            return this.products.filter(product => product.counter !== 0);
        }
    },
    components: {
        UProductItem,
    },
}
</script>

<template>
    <div class="products-list">
        <UProductItem v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
</template>

<style lang="scss" scoped>
.products-list {
    display: flex;
    flex-direction: column;
    user-select: none;
}
</style>