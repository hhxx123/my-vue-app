<script setup>
  import DemoTable from "./demo-table.vue"
  import DemoTab from "./demo-tab.vue"
  import DemoInputSearch from "./demo-input-search.vue"
  import DemoDetail from "./demo-detail.vue"
  import DemoDropDown from "./demo-dropdown.vue"
  import DemoVirtualList from "./demo-virtual-list.vue"
  import DemoVirtualListStronger from "./demo-virtual-list-stronger.vue"
  import $store from "../../store/index";

  import {CHANGE_THEME} from "../../store/types";

  const demos = [
    {
      name: "demo-table",
      component: DemoTable
    },
    {
      name: "demo-tab",
      component: DemoTab
    },
    {
      name: "demo-inputsearch",
      component: DemoInputSearch
    },
    {
      name: "demo-detail",
      component: DemoDetail
    },
    {
      name: "demo-virtual-list",
      component: DemoVirtualList
    },
     {
      name: "demo-virtual-list-stronger",
      component: DemoVirtualListStronger
    },

  ]

  const handleChangeTheme = ()=>{
    $store.dispatch(CHANGE_THEME);
  }


</script>

<template>
  <ul>
    <li v-for="demo in demos" :key="demo.name">
      <router-link :to="{path: `/demo/${demo.name}`}" class="button">
        {{ demo.name }}
      </router-link>
    </li>
  </ul>
  <el-button @click="handleChangeTheme">切换主题</el-button>
  <router-view></router-view>
</template>

<style scoped>

</style>