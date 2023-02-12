<script>
import '@/assets/stylesheets/products.css'
import { mapActions } from 'vuex'

export default {
    props: {
        id_num: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        product_name: {
            type: String,
            required: true,
        }
    },
    methods: {
        ...mapActions('product', ['setSelected']),
        chooseProduct() {
            if (this.$tg.MainButton.isVisible) {
                this.$store.commit('product/setSelected', -1);
                this.$tg.MainButton.hide();
            } else {
                this.$store.commit('product/setSelected', this.id_num);
                this.$tg.MainButton.setText(`Вы выбрали "${this.product_name}"`)
                this.$tg.MainButton.show();
            }
        }
    }
}
</script>

<template>
    <button
        @click="chooseProduct"
        class="btn"
        :id="'btn'+id_num"
    >
        {{ text }}
    </button>
</template>