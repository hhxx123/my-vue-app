<template>
  <router-view></router-view>
  <CommonTab :tabList="tabList" ></CommonTab>
</template>

<script setup>
  import CommonTab from "../Common/Tab/Index.vue"
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