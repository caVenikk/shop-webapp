<script>
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
        if (this.$tg.platform === "unknown") {
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

<style lang="scss" scoped>
.spinner {
    width: 60px;
    height: 60px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
}

.spinner .dot {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
}

.spinner .dot::after {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.spinner .dot {
    animation: spin 1.3s infinite;
}

.spinner .dot:nth-child(2) {
    animation-delay: 100ms;
}

.spinner .dot:nth-child(3) {
    animation-delay: 200ms;
}

.spinner .dot:nth-child(4) {
    animation-delay: 300ms;
}

.spinner .dot:nth-child(5) {
    animation-delay: 400ms;
}
</style>