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

<style lang="scss" scoped>
.product-item {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: var(--tg-theme-secondary-bg-color);
    text-align: justify;

    &:first-child {
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
    }

    &:last-child {
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
    }

    .list-img-wrapper {
        width: 40px;
        height: 40px;
    }

    .list-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        -webkit-user-drag: none;
    }

    .price {
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;

        &:after {
            content: '\20BD';
            margin: 0 .25em 0 .25em;
        }
    }
}
</style>