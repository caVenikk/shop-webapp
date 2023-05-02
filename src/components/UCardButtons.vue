<script>
import '@/assets/stylesheets/products.css'

export default {
    data() {
        return {
            back: false,
            changing_add: false,
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        products: {
            get() {
                return this.$store.getters['products/getSelected'];
            }
        },
    },
    mounted() {
        this.changing_add = this.product.counter == 0 ? false : true;
    },
    methods: {
        addProduct(product) {
            this.$store.commit('products/pushSelected', product);
            if (!this.$tg.MainButton.isVisible) {
                this.$tg.MainButton.setText('Просмотреть заказ');
                this.$tg.MainButton.show();
            }
        },
        removeProduct(product) {
            this.$store.commit('products/removeSelected', product);
            if (!this.products.some(product => product.counter !== 0)) {
                this.$tg.MainButton.hide();
            }
        },
        onAddClick() {
            this.addProduct(this.product);
            this.back = false;
            this.changing_add = true;
        },
        onRemoveClick() {
            if (this.product.counter == 0) {
                return;
            }
            this.removeProduct(this.product);
            if (this.product.counter == 0) {
                this.back = true;
                this.changing_add = false;
            }
        }
    }
}
</script>

<template>
    <div class="btn-wrapper">
        <button @click="onRemoveClick" class="btn-delete"><i class="fa-solid fa-minus"></i></button>
        <button @click="onAddClick" class="btn-add" :class="{ back: this.back, changing_add: this.changing_add }">
            <span v-if="this.product.counter == 0">Добавить</span>
            <i v-else class="fa-solid fa-plus"></i>
        </button>
    </div>
</template>