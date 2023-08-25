
<script setup>
  import{defineProps} from "vue"
  defineProps({
    title:{
     default:""
    },
    trigger:{
      type:String,
      default:"click"
    },
    effect:{
      type:String,
      default:'light'
    },
    placement:{
      type:String,
      default:"bottom-start"
    }
  })
</script>
<template>
  <el-tooltip
    class="box-item"
    :trigger="trigger"
    :effect="effect"
    :content="title"
    :placement="placement"
  >
    <slot></slot>
  </el-tooltip>
</template>
<style >

</style>