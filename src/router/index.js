import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/home.vue";
import Elections from "../views/elections.vue";
import Join from "../views/join.vue";
import About from "../views/about.vue";
import rules from "../views/rules.vue";
import members from "../views/members.vue";
import adminpanel from "../views/adminpanel.vue";
import Calander from "../views/Calander.vue";
import Complaints_Suggestions from "../views/ComplaintsSuggestions.vue";

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
    path: '/rules',
    name: "rules",
    component: rules,
  },
  {
    path: '/members',
    name: "members",
    component: members,
  },
  {
    path: '/Calander',
    name: "Calander",
    component: Calander,
  },
  {
    path: '/Complaints_Suggestions',
    name: "Complaints_Suggestions",
    component: Complaints_Suggestions,
  },
  {
    path: '/adminpanel',
    name: "adminpanel",
    component: adminpanel,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
