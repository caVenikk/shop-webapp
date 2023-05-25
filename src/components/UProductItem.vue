<script>
import UItemCaption from './UItemCaption.vue';
import UPicture from './UPicture.vue';

export default {
    name: 'UProductItem',
    data() {
        return {
            sliced_title: String,
            sliced_price: String
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    components: {
        UItemCaption,
        UPicture,
    }
}
</script>

<template>
    <div class="product-item">
        <div class="list-img-wrapper">
            <UPicture :product_id="this.product.id" :alt="this.product.title" class="list-img" />
        </div>
        <UItemCaption :product="this.product" />
        <div class="price">
            {{ this.product.price * this.product.counter }}
        </div>
    </div>
</template>
