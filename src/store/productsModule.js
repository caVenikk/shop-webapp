export const productsModule = {
    state: () => ({
        products: new Array()
    }),
    getters: {
        getSelected(state) {
            return state.products;
        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
            state.products.forEach((product) => product.counter = 0);
        },
        pushSelected(state, value) {
            const index = state.products.indexOf(value);
            state.products[index].counter++;
        },
        removeSelected(state, value) {
            const index = state.products.indexOf(value);
            state.products[index].counter--;
        }
    },
    actions: {
        setProducts(context, value) {
            context.commit('setProducts', value)
        },
        pushSelected(context, value) {
            context.commit('pushSelected', value);
        },
        removeSelected(context, value) {
            context.commit('removeSelected', value);
        },
    },
    namespaced: true
}