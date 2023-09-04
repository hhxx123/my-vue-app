<template>
  <div>虚拟列表加强版</div>
  <VirtualList :itemHeight="50" :cacheCount="6"> </VirtualList>
</template>
<script setup>
import VirtualList from "../../ui/vitrualList/List.vue";
</script>