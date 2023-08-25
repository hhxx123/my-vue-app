<template>
  <router-view></router-view>
  <DemoDetail :tabList="tabList" ></DemoDetail>
</template>

<script setup>
  import DemoDetail from "../Common/Detail/Index.vue"
  const tabList = [
    {
      label: "User",
      name: "first"
    },
    {
      label: "Config",
      name: "second"
    },
    {
      label: "Role",
      name: "third"
    }, {
      label: "Task",
      name: "fourth"
    }
  ]
</script>

<style scoped>

</style>