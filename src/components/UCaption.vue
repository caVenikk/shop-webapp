<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    }
}
</script>

<template>
    <ul class="caption">
        <li>
        {{ title }}</li><li>
        {{ price }}</li>
    </ul>
</template>
