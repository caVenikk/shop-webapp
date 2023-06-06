<script>
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
        this.changing_add = this.product.counter !== 0;
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
            this.$emit('added');
            this.back = false;
            this.changing_add = true;
        },
        onRemoveClick() {
            if (this.product.counter === 0) {
                return;
            }
            this.removeProduct(this.product);
            this.$emit('removed');
            if (this.product.counter === 0) {
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
            <span v-if="this.product.counter === 0">Добавить</span>
            <i v-else class="fa-solid fa-plus"></i>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.btn-wrapper {
    width: 100%;
    position: relative;
    top: 0;
    left: 20%;
    z-index: 0;

    & .btn-delete,
    & .btn-add {
        display: inline-block;
        position: absolute;
        padding: 10px;
        border: none;
        text-transform: uppercase;
        font-weight: 700;
        top: 0;
        left: 0;
        border-radius: 10px;
        cursor: pointer;
        transition: background .2s linear;
        color: var(--tg-theme-button-text-color);
    }

    & .btn-delete {
        width: 27%;
        left: 1%;
        z-index: 1;
        background-color: #ff1e1e;

        @media (hover: hover) {
            &:hover {
                cursor: pointer;
                background: #b40000;
            }
        }

        @media (hover: none) {
            &:active {
                cursor: pointer;
                background: #b40000;
            }
        }
    }

    & .btn-add {
        width: 60%;
        z-index: 2;
        background-color: #f8a818;

        & span,
        & i {
            opacity: 0;
            animation: textAppearance .2s ease-in-out forwards;
            animation-delay: .1s;

            @keyframes textAppearance {
                0% {
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                }
            }
        }

        @media (hover: hover) {
            &:hover {
                cursor: pointer;
                background: #cc8500;
            }
        }

        @media (hover: none) {
            &:active {
                cursor: pointer;
                background: #cc8500;
            }
        }
    }

    & .changing_add {
        animation: intoPlus .2s ease-in-out forwards;

        @keyframes intoPlus {
            0% {
                width: 60%;
                left: 0;
            }

            100% {
                width: 27%;
                left: 33.5%;
            }
        }
    }

    & .back {
        animation: back .2s ease-in-out forwards;

        @keyframes back {
            0% {
                width: 27%;
                left: 33.5%;
            }

            100% {
                width: 60%;
                left: 0;
            }
        }
    }
}
</style>