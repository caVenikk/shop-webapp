let tg = window.Telegram.WebApp;

tg.expand();

export default {
    install: (app, options) => {
        app.config.globalProperties.$tg = { ...tg };
    }
}