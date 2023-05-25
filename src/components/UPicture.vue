<script>
export default {
    name: 'UPicture',
    data() {
        return {
            imagePath: `/src/assets/images/${this.product_id}.png`,
            defaultImagePath: '/src/assets/images/burrito.png',
        };
    },
    props: {
        product_id: {
            type: Number,
        },
        alt: {
            type: String,
            required: true,
            default: "Product",
        },
    },
    methods: {
        handleImageError() {
            this.imagePath = this.defaultImagePath;
        },
    },
}
</script>

<template>
    <img :src="imagePath" :alt="alt" @error="handleImageError" class="img">
</template>
