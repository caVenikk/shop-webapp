import retry from 'retry'

const retryOperation = retry.operation({
  retries: 10,
  factor: 3,
  minTimeout: 1 * 1000,
  maxTimeout: 10 * 1000,
  randomize: true,
});

export default {
    install: (app, options) => {
        app.config.globalProperties.$retryOperation = retryOperation;
    }
}