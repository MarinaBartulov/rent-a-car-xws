import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
import Welcome from '../components/Welcome.vue'
import PostAd from '../components/PostAd.vue'
import AdminProfile from '../components/AdminProfile.vue'
import Cart from '../components/Cart.vue'
import VehicleDetails from '../components/VehicleDetails.vue'
import NotAuthorized from '../components/NotAuthorized.vue'
import { store } from '../store/store'
import NewRequestsPage from '../components/NewRequestsPage.vue'
import Chat from '../components/Chat.vue'
import ActivateAccount from '../components/ActivateAccount.vue'
import ActivateAccountAgent from '../components/ActivateAccountAgent.vue'
import ReservationsPage from '../components/ReservationsPage.vue'
import RequestsHistory from '../components/RequestsHistory.vue'
import PriceLists from '../components/PriceLists.vue'
import Statistic from '../components/Statistic.vue'
import ChangePassword from '../components/ChangePassword.vue'
import ResetPassword from '../components/ResetPassword.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import Map from '../components/Map.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/home',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole !== 'ROLE_CLIENT'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/vehicle/details',
            name: 'VehicleDetails',
            component: VehicleDetails
        },
        {
            path: '/post/ad',
            name: 'PostAd',
            component: PostAd
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration
        },
        {
            path: '/adminProfile',
            name: 'AdminProfile',
            component: AdminProfile,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole !== 'ROLE_ADMIN'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/newRequests',
            name: 'NewRequests',
            component: NewRequestsPage,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole == 'ROLE_ADMIN'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/notAuthorized',
            name: 'NotAuthorized',
            component: NotAuthorized
        },
        {
            path: '/requests/:id/chat',
            name: 'Chat',
            component: Chat,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole == 'ROLE_ADMIN'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/activate-account/',
            name: 'ActivateAccount',
            component: ActivateAccount
        },
        {
            path: '/activate-account/agent/',
            name: 'ActivateAccountAgent',
            component: ActivateAccountAgent
        },
        {
            path: '/reservations',
            name: 'ReservationsPage',
            component: ReservationsPage,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole == 'ROLE_ADMIN'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/myRequests',
            name: 'RequestsHistory',
            component: RequestsHistory,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || !store.getters.userRole == 'ROLE_CLIENT'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/priceLists',
            name: 'PriceLists',
            component: PriceLists,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole == 'ROLE_ADMIN'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '/statistic',
            name: 'Statistic',
            component: Statistic
        },
        {
            path: '/change-password',
            name: 'ChangePassword',
            component: ChangePassword
        },
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: ResetPassword
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword
        },
        {
            path: '/map/:token',
            name: 'Map',
            component: Map,
            beforeEnter: (to, from, next) => {
                if(!store.getters.loggedIn || store.getters.userRole == 'ROLE_ADMIN'){
                    next({ name: 'NotAuthorized' })
                }else{
                    next()
                }
              }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})