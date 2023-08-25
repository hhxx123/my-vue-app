<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleTabClick"
    class="cc_el-tabs"
    :style="{width:width}"
  >
    <el-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.name"></el-tab-pane>
  </el-tabs>
</template>
<script setup>
  import {defineEmits, ref} from "vue"

  const props = defineProps({
    tabList: {
      type: Array,
      default: []
    },
    width: {
      type: String,
    },
    activeName:{
      type:String
    },
    handleTabClick:{
      type:Function
    }
  })
  const emit = defineEmits(['tab-click'])
  console.log(props.activeName);
  const handleTabClick = (tab,event)=>{
     emit("tab-click",tab,event)
  }
</script>
<style lang="scss">
  .cc_el-tabs {
    .el-tabs__nav-wrap::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px !important;
      background-color: var(--el-border-color-light);
      z-index: var(--el-index-normal);
    }
  }


</style>
