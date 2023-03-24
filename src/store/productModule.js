export const productModule = {
    state: () => ({
        selected: null
    }),
    getters: {
        getSelected(state) {
            return state.selected;
        }
    },
    mutations: {
        setSelected(state, value) {
            state.selected = value;
        }
    },
    actions: {
        setSelected(context, value) {
            context.commit('setSelected', value);
        }
    },
    namespaced: true
}