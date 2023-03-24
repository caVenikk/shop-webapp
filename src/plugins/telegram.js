let tg = window.Telegram.WebApp;

tg.expand();

const body = document.querySelector('body');
const buttonColor = getComputedStyle(body).getPropertyValue('--tg-theme-button-color');
const buttonTextColor = getComputedStyle(body).getPropertyValue('--tg-theme-button-text-color');


tg.MainButton.textColor = buttonTextColor;
tg.MainButton.color = buttonColor;

export default {
    install: (app, options) => {
        app.config.globalProperties.$tg = { ...tg };
    }
}