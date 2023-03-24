<script>
import UCaption from './UCaption.vue'
import UButton from './UButton.vue'
import UPicture from './UPicture.vue'

export default {
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
        }
    },
    components: {
        UCaption,
        UButton,
        UPicture
    },
    created() {
        this.sliced_title = this.product.title.slice(0, 15);
        if (this.sliced_title.length < this.product.title.length) {
            this.sliced_title += '...';
        }
        this.sliced_price = this.product.price.toString().slice(0, 7);
        if (this.sliced_price.length < this.product.price.toString().length) {
            this.sliced_price += '...';
        }
    }
}
</script>

<template>
    <div class="product">
        <UPicture
            :alt_tag="this.product.title"
        />
        <UCaption
            :title="this.sliced_title"
            :price="this.sliced_price"
        />
        <UButton
            :product="this.product"
            :text="'Выбрать'"
        />
    </div>
</template>
