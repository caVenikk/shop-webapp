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
        <UPicture :alt_tag="this.product.title" class="list-img" />
        <UItemCaption :product="this.product" />
        <div class="price">
            {{ this.product.price }}
        </div>
    </div>
</template>
