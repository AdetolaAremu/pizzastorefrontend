import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import PizzaItem from '../pages/pizzaitems.vue';
import Private from '../Private/secured.vue';
import DashboardHome from '../Private/dashboard/home.vue';
import OrderHistory from '../Private/dashboard/order-history.vue';
import Profile from '../Private/dashboard/profile.vue';
import Cart from '../pages/cart.vue';
import paymentsuccess from '../pages/paymentsuccess.vue';
import getOrder from '../Private/dashboard/getOrder.vue';
import PostPizza from '../Private/dashboard/postpizza.vue';
import AllPizzas from '../Private/dashboard/allpizza.vue';
import editPizza from '../Private/dashboard/editpizza.vue';
import Register from '../pages/register.vue';
import Login from '../pages/login.vue';

export const isLoggedIn = () => {
  return localStorage.getItem('token')
}

const routes = [
  {path:"/", component:Home},
  {path:"/store", component:PizzaItem},
  {path:"/register", component:Register, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn()){
        next('/user/dashboard')
      }else{
        next()
      }
    }
  },
  {path:"/login", component:Login, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn()){
        next('/user/dashboard')
      }else{
        next()
      }
    }
  },
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
      {path:"/user/profile", component:Profile},
      {path:"/user/order/:id", component:getOrder},
      {path:"/user/post-pizza",  component:PostPizza},
      {path:"/user/all-pizzas",  component:AllPizzas},
      {path:"/user/edit-pizza/:id",  component:editPizza}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;