<script>
export default {
    name: 'UPicture',
    data() {
        return {
            imageSrc: '',
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
        async fetchImage() {
            try {
                const response = await this.$axios.get(`products/img/${this.product_id}`, { responseType: 'blob' });
                const imageUrl = URL.createObjectURL(response.data);
                this.imageSrc = imageUrl;
            } catch (error) {
                console.error('Error retrieving image:', error);
            }
        }
    },
    async created() {
        this.fetchImage();
    },
}
</script>

<template>
    <img :src="imageSrc" :alt="alt" class="img">
</template>
