import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import PizzaItem from '../pages/pizzaitems.vue';
import Private from '../Private/secured.vue';
import DashboardHome from '../Private/dashboard/home.vue';
import OrderHistory from '../Private/dashboard/order-history.vue';
import Profile from '../Private/dashboard/profile.vue';
import Cart from '../pages/cart.vue';
import paymentsuccess from '../pages/paymentsuccess.vue';
import Register from '../pages/register.vue';
import Login from '../pages/login.vue';

const isLoggedIn = () => {
  return localStorage.getItem('token')
}

const routes = [
  {path:"/", component:Home},
  {path:"/store", component:PizzaItem},
  {path:"/register", component:Register},
  {path:"/login", component:Login},
  {path:"/cart", component:Cart},
  {path:"/payment-sucess", component:paymentsuccess},
  {
    path:"/user",
    component: Private,
    beforeEnter(to, from, next) {
      if (isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    },
    children:
    [
      {path:"/user/dashboard", component:DashboardHome},
      {path:"/user/order-history", component:OrderHistory},
      {path:"/user/profile", component:Profile}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;