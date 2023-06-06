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

<style lang="scss" scoped>
.card-caption {
    padding: 0;
    margin: 0;
    -webkit-line-clamp: 2;

    li {
        margin: 10px 0;
        font-size: 12px;
        display: inline-block;

        &:after {
            content: '\00B7';
            margin: 0 .25em 0 .25em;
            font-weight: bold;
        }

        &:last-child {
            font-weight: 600;
        }

        &:last-child:after {
            content: '\20BD';
            font-weight: 600;
        }
    }
}
</style>