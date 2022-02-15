import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import PizzaItem from '../pages/pizzaitems.vue';
import Private from '../Private/secured.vue';
import DashboardHome from '../Private/dashboard/home.vue';

const routes = [
  {path:"/", component:Home},
  {path:"/store", component:PizzaItem},
  {
    path:"/user",
    component: Private,
    children:
    [
      {path:"/user/dashboard", component:DashboardHome}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;