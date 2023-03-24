<script>
import '@/assets/stylesheets/products.css'
import { mapActions } from 'vuex'

export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapActions('product', ['setSelected']),
    },
    methods: {
        chooseProduct() {
            if (this.$tg.MainButton.isVisible) {
                this.$store.commit('product/setSelected', null);
                this.$tg.MainButton.hide();
            } else {
                this.$store.commit('product/setSelected', this.product);
                this.$tg.MainButton.setText(`Вы выбрали "${this.product.title}"`)
                this.$tg.MainButton.show();
            }
        }
    }
}
</script>

<template>
    <button @click="chooseProduct" class="btn" :id="'btn' + product.id">
        {{ text }}
    </button>
</template>