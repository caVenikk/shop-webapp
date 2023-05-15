<script>
export default {
    name: 'UItemCaption',
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        sliced_title() {
            let sliced_title = this.product.title.slice(0, 15);
            if (sliced_title.length < this.product.title.length) {
                sliced_title += '...';
            }
            return sliced_title
        },
        sliced_description() {
            if (!this.product.description) {
                return this.product.description;
            }
            let sliced_description = this.product.description.slice(0, 50);
            if (sliced_description.length < this.product.description.length) {
                sliced_description += '...';
            }
            return sliced_description
        },
    },
}
</script>

<template>
    <div class="item-caption">
        <div class="title">
            {{ this.sliced_title }}
            <span class="counter">{{ this.product.counter }}x</span>
        </div>
        <div class="description">
            {{ this.sliced_description }}
        </div>
    </div>
</template>
