<script>
import UCardCaption from './UCardCaption.vue'
import UCardButtons from './UCardButtons.vue'
import UPicture from './UPicture.vue'

export default {
    name: 'UProductCard',
    data() {
        return {
            counterIncreasing: false,
            counterDecreasing: false,
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    components: {
        UCardCaption,
        UCardButtons,
        UPicture
    },
    computed: {
        sliced_title() {
            let sliced_title = this.product.title.slice(0, 15);
            if (sliced_title.length < this.product.title.length) {
                sliced_title += '...';
            }
            return sliced_title
        },
        sliced_price() {
            let sliced_price = this.product.price.toString().slice(0, 50);
            if (sliced_price.length < this.product.price.toString().length) {
                sliced_price += '...';
            }
            return sliced_price
        },
    },
    methods: {
        onProductAdd() {
            this.counterIncreasing = true;
            setTimeout(() => { this.counterIncreasing = false }, 150);
        },
        onProductRemove() {
            this.counterDecreasing = true;
            setTimeout(() => { this.counterDecreasing = false }, 150);
        },
    }
}
</script>

<template>
    <div class="product-card">
        <div class="counter"
            :class="{ active: this.product.counter > 0, increasing: this.counterIncreasing, decreasing: this.counterDecreasing }">
            {{ this.product.counter > 0 ? this.product.counter : '' }}
        </div>
        <UPicture :alt_tag="this.product.title" />
        <UCardCaption :title="this.sliced_title" :price="this.sliced_price" />
        <UCardButtons @added="onProductAdd" @removed="onProductRemove" :product="this.product" />
    </div>
</template>
