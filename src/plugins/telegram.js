let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2CAB37";

export default {
    install: (app, options) => {
        app.config.globalProperties.$tg={ ...tg };
    }
}