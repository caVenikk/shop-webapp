<script>
import '@/assets/stylesheets/loader.css'
export default {
    name: 'ULoader',
    methods: {
        setDotsColor(color) {
            const spinnerDots = document.querySelectorAll(".spinner .dot");
            spinnerDots.forEach(dot => {
                const newStyleRule = `.${dot.classList.value}::after { background-color: ${color}; }`;
                const styleEl = document.createElement("style");
                styleEl.appendChild(document.createTextNode(newStyleRule));
                document.head.appendChild(styleEl);
            });
        }
    },
    mounted() {
        if (this.$tg.platform == "unknown") {
            this.setDotsColor("#f8a818")
        } else {
            const body = document.querySelector('body');
            const buttonColor = getComputedStyle(body).getPropertyValue('--tg-theme-button-color');
            this.setDotsColor(buttonColor);
        }
    }
}
</script>

<template>
    <div class="spinner">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>
