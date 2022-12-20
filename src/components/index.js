import UProduct from './UProduct.vue'

const components = [
    {name: 'UProduct', component: UProduct}
]

export default {
    install(app) {
        components.forEach(({ name, component }) => {
            app.component(name, component)
        })
    }
}