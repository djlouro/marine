import Vue from 'vue'
import VueRouter from 'vue-router'
import { Auth } from 'aws-amplify'
import store from '@/store'

const TheContainer = () => import('@/containers/TheContainer')

const Dashboard = () => import('@/views/Dashboard')
const Moorings = () => import('@/views/Moorings')
const Orders = () => import('@/views/Orders')
const Clients = () => import('@/views/Clients')
const Camera = () => import('@/views/Cam')
const MooringsCreate = () => import('@/views/MooringsCreate')
const Login = () => import('@/views/Login')
const ForgotPassword = () => import('@/views/ForgotPassword')
const Forum = () => import('@/views/Forum')
const Register = () => import('@/views/Register')

Vue.use(VueRouter)

const routes = [{
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'moorings',
          name: 'Moorings',
          component: Moorings
        },
        {
          path: 'clients',
          name: 'Clients',
          component: Clients
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: 'camera',
          name: 'Camera',
          component: Camera
        },
        {
          path: 'moorings/create',
          name: 'MooringsCreate',
          component: MooringsCreate
        },
        {
          path: 'moorings/edit',
          name: 'MooringsEdit',
          component: MooringsCreate
        },
        {
          path: 'forum',
          name: 'Forum',
          component: Forum
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    }
  ]

  const router = new VueRouter ({
    routes
  })

  const isAuth = async () => {
    Auth.currentSession()
    .then(data => {
      if (from.name == null) {
        this.$store.state.username=data.idToken.payload['cognito:username']
      }
      return true
    })
    .catch(() => {
      return false
      })
  }

  router.beforeEach(async(to, from, next) => {
      Auth.currentSession()
      .then(data => {
        let username = data.idToken.payload['cognito:username']
        let group = data.idToken.payload['cognito:groups'] ?
        data.idToken.payload['cognito:groups'][0] : 'USER'

        Vue.$cookies.set('GROUP',group);

        if (!from.name) {
          store.commit('setGroup', group)
          store.commit('setUsername', username)
          if (to.name !== 'Dashboard') {
            router.push({name: 'Dashboard'}).catch(() => {})
          }
        } 
        next()
      })
      .catch(() => {
        if (to.name !== 'Login' && to.name !== 'ForgotPassword' && to.name !== 'Register') {
          router.push({name: 'Login'}).catch(() => {})
          return;
        }
      })

      next()
  });

  export default router
