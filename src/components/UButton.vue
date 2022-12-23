<script>
import '@/assets/stylesheets/products.css'

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
        chooseProduct() {
            if (this.$tg.MainButton.isVisible) {
                this.$tg.MainButton.hide();
            } else {
                this.$tg.MainButton.setText(`Вы выбрали "${this.product_name}"`)
                Telegram.WebApp.onEvent("mainButtonClicked", function() {
                    this.$tg.sendData(this.id_num);
                })
                console.log(this.product_name)
            }
        }
    },
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