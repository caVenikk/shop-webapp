<script>
export default {
    name: 'UCardCaption',
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
    <ul class="card-caption">
        <li>
            {{ title }}</li>
        <li>
            {{ price }}</li>
    </ul>
</template>
