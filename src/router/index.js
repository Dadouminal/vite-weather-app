import {createRouter, createWebHistory} from "vue-router"
import Home from "../views/Home.vue"
import City from "../views/CityView.vue"

const routes=[
    {
        path:"/",
        name:"home",
        component:Home,
        meta:{
            title:"Home"
        }
    },
    {
        path:"/weather/:state/:city",
        name:"cityview",
        component:City,
        meta:{
            title:"Weather"
        },
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, // short for `routes: routes`
})

router.beforeEach((to,from, next)=>{
    document.title=`${to.params.state ? `${to.params.city},${to.params.state}` :to.meta.title} | The local weather`
    next()
})

export default router

