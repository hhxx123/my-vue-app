<template>
  <div>虚拟列表加强版</div>
  <VirtualList :itemHeight="50" :cacheCount="6" :data="allData"> </VirtualList>
</template>
<script setup>
import { onMounted,ref } from "vue";
import VirtualList from "../../ui/vitrualList/List.vue";

let allData = ref([]);
onMounted(() => {
  // 生成随机长度的汉字（范围为3到10个汉字）
  for (let i = 0; i < 100; i++) {
    allData.value.push({
      id: i,
      name: generateRandomChinese(Math.floor(Math.random() * 100 + i)),
      code: i,
    });
  }
});

//mock数据
// 生成指定长度的汉字字符串
function generateRandomChinese(length) {
  let result = "";
  const base = 0x4e00; // 汉字编码的起始位置
  const range = 0x9fa5 - base + 1; // 汉字的总数量

  for (let i = 0; i < length; i++) {
    const codePoint = base + Math.floor(Math.random() * range);
    result += String.fromCodePoint(codePoint);
  }
  return result;
}
</script>