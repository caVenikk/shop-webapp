<script>
import UProduct from './UProduct.vue';
import '@/assets/stylesheets/products.css'

export default {
    name: 'UProductsGrid',
    props: {
        products: {
            type: Array,
            required: true,
        }
    },
    components: {
        UProduct
    },
}
</script>

<template>
    <div class="products-container">
        <UProduct
            v-for="product in products"
            :key="product.id"
            :product="product"
        />        
    </div>
</template>