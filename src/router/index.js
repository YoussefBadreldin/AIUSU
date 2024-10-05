import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/home.vue";
import Elections from "../views/elections.vue";
import Join from "../views/join.vue";
import About from "../views/about.vue";
import portfolio from "../views/portfolio.vue";

const routes = [
  {
    path:'/',
    name:'MainComponent',
    component:MainComponent
  },
  {
    path:"/Home",
    name:"Home",
    component:MainComponent
  },
  {
    path:'/Elections',
    name:'Elections',
    component: Elections
  },
  {
    path: '/Join',
    name: "Join",
    component: Join
  },
  {
    path: '/About',
    name: "About",
    component: About,
  },
  {
    path: '/portfolio',
    name: "portfolio",
    component: portfolio,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
