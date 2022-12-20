<script>
export default {
    props: {
        img_src: {
            type: String,
            default: '/src/assets/images/burrito.png',
        },
        alt_tag: {
            type: String,
            required: true,
            default: "Product",
        }
    }
}
</script>

<template>
    <img :src="img_src" :alt="alt_tag" class="img">
</template>
