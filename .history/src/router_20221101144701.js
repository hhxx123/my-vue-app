import {createRouter, createWebHashHistory} from "vue-router"

const demo = () => import("./components/Demo/index.vue")
const index = () => import("./components/Index/App.vue")
const DemoTable = () => import("./components/Demo/demo-table.vue")
const DemoTab = () => import("./components/Demo/demo-tab.vue")
const DemoInputSearch = () => import("./components/Demo/demo-input-search.vue")
const DemoDetail = () => import("./components/Demo/demo-detail.vue")
const DemoDropDown = ()=> import("./components/Demo/demo-dropdown.vue")
const DemoVirtualList = ()=> import("./components/Demo/demo-virtual-list");

const routes = [
  {path: "/", component: demo},
  {
    path: "/demo",
    name: "demo",
    component: demo,
    children: [
      {
        path: "/demo/demo-table",
        component: DemoTable
      },
      {
        path: "/demo/demo-tab",
        component: DemoTab
      },
      {
        path: "/demo/demo-inputsearch",
        component: DemoInputSearch
      },
      {
        path: "/demo/demo-detail",
        component: DemoDetail
      },
      {
        path: "/demo/demo-dropdown",
        component: DemoDropDown
      },
      {
        path:"/demo/demo-virtual-list",
        component:DemoVirtualList
      }]
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export default router;