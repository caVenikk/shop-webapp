import { createStore } from "vuex";
import { productModule } from "./productModule";

export default createStore({
    modules: {
        product: productModule
    }
})