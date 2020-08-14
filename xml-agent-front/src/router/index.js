import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegistrationPage from '../components/RegistrationPage.vue'
import NewAd from '../components/NewAd.vue'
import ReserveCar from '../components/ReserveCar.vue'
import Statistic from '../components/Statistic.vue'
import PriceList from '../components/PriceList.vue'
import Chat from '../components/Chat.vue'
import RequestsPage from '../components/RequestsPage.vue'
import NewRequestsPage from '../components/NewRequestsPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/registration',
            name: 'RegistrationPage',
            component: RegistrationPage
        },
        {
            path: '/newAd',
            name: 'NewAd',
            component: NewAd
        },
        {
            path: '/reserveCar',
            name: 'ReserveCar',
            component: ReserveCar
        },
        {
            path: '/statistic',
            name: 'Statistic',
            component: Statistic
        },
        {
            path: '/priceList',
            name: 'PriceList',
            component: PriceList
        },
        {
            path: '/requests/:id/chat',
            name: 'Chat',
            component: Chat 
        },
        {
            path: '/requests',
            name: 'RequestsPage',
            component: RequestsPage
        },
        {
            path: '/newRequests',
            name: 'NewRequestsPage',
            component: NewRequestsPage
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})