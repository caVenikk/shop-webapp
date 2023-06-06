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
    <div v-if="this.product.active" class="product-card">
        <div class="counter"
            :class="{ active: this.product.counter > 0, increasing: this.counterIncreasing, decreasing: this.counterDecreasing }">
            {{ this.product.counter > 0 ? this.product.counter : '' }}
        </div>
        <UPicture :product_id="this.product.id" :alt="this.product.title" />
        <UCardCaption :title="this.sliced_title" :price="this.sliced_price" />
        <UCardButtons @added="onProductAdd" @removed="onProductRemove" :product="this.product" />
    </div>
</template>

<style lang="scss" scoped>
.product-card {
    text-align: center;
    max-height: max-content;
    position: relative;

    .counter {
        position: absolute;
        top: 0;
        right: 10%;
        z-index: 1;
        width: 25px;
        height: 25px;
        background-color: #f8a818;
        border-radius: 25px;
        opacity: 0;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0px 4px 6px 2px rgba(34, 60, 80, 0.13);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity .2s ease-in-out;
        user-select: none;
    }

    .active {
        opacity: 1;
    }

    .increasing {
        animation: increasing .15s;

        @keyframes increasing {
            0% {
                width: 25px;
                height: 25px;
            }

            50% {
                width: 27.5px;
                height: 27.5px;
            }

            100% {
                width: 25px;
                height: 25px;
            }
        }
    }

    .decreasing {
        animation: decreasing .15s;

        @keyframes decreasing {
            0% {
                width: 25px;
                height: 25px;
            }

            50% {
                width: 22.5px;
                height: 22.5px;
            }

            100% {
                width: 25px;
                height: 25px;
            }
        }
    }
}
</style>
