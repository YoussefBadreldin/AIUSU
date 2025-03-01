import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/user/home.vue";
import Elections from "../views/user/elections.vue";
import Join from "../views/user/join.vue";
import About from "../views/user/about.vue";
import rules from "../views/user/rules.vue";
import members from "../views/user/members.vue";
import Calander from "../views/user/Calander.vue";
import Complaints_Suggestions from "../views/user/ComplaintsSuggestions.vue";
import adminpanel from "../views/admin/adminpanel.vue";
import events from "../views/admin/events.vue";
import inquiry from "../views/admin/inquiry.vue";
import CSBox from "../views/admin/CSBox.vue";

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
  {
    path: '/adminpanel/events',
    name: "events",
    component: events,
  },
  {
    path: '/adminpanel/inquiry',
    name: "inquiry",
    component: inquiry,
  },
  {
    path: '/adminpanel/CSBox',
    name: "CSBox",
    component: CSBox,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
