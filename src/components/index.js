import UProductCard from './UProductCard.vue'
import UProductsList from './UProductsList.vue'
import UProductsGrid from './UProductsGrid.vue'
import UCardButtons from './UCardButtons.vue'
import UCardCaption from './UCardCaption.vue'
import UItemCaption from './UItemCaption.vue'
import ULoader from './ULoader.vue'
import UPicture from './UPicture.vue'
import UProductItem from './UProductItem.vue'

const components = [
    { name: 'UProductCard', component: UProductCard },
    { name: 'UProductsList', component: UProductsList },
    { name: 'UProductsGrid', component: UProductsGrid },
    { name: 'UCardButtons', component: UCardButtons },
    { name: 'UCardCaption', component: UCardCaption },
    { name: 'UItemCaption', component: UItemCaption },
    { name: 'ULoader', component: ULoader },
    { name: 'UPicture', component: UPicture },
    { name: 'UProductItem', component: UProductItem },
]

export default {
    install(app) {
        components.forEach(({ name, component }) => {
            app.component(name, component)
        })
    }
}