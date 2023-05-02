import { createStore } from "vuex";
import { productsModule } from "./productsModule";

export default createStore({
    modules: {
        products: productsModule
    }
})