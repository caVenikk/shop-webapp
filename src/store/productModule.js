export const productModule = {
    state: () => ({
        selected: -1
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