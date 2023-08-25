<script setup>
  import {defineProps} from "vue"
  defineProps({
    type:{
      default:"",
      type:String
    },
    effect:{
      default:"dark",
      type:String
    },
    color:{
      default:"",
      type:String
    },

  })

</script>
<template>
  <el-tag :type="type" :effect="effect" :color="color">
    <slot></slot>
  </el-tag>
</template>

<style>
  .el-tag--default{
    padding: 0px 5px;
    height: 18px;
    --el-icon-size: 14px;
  }
</style>