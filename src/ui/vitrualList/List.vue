
<template>
  <div>虚拟列表</div>
  <div class="list-wrap" ref="listWrapRef" @scroll="handleScroll">
    <div class="list-body" ref="listBodyRef" :style="`height:${obj.listBodyHeight}px`">
      <div class="list-view" ref="listViewRef">
        <div v-for="item in showData" :key="item.code" class="list-view-item">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/**可不可以靠自己的思维写一个虚拟列表啊  加油💪🏻
 * 一个最外层容器高度是可显示空间的高度
 * 能放得下所有元素的容器
 * 渲染的区域
 */
import { onMounted, computed, ref, reactive } from "vue";

const listWrapRef = ref(null),
  listBodyRef = ref(null),
  listViewRef = ref(null);

const allData = [];
onMounted(() => {
  for (let i = 0; i < 10000; i++) {
    allData.push({
      name: i,
      code: i,
    });
  }
  init();
});

const props = defineProps({
  itemHeight: {
    //每个item的渲染高度
    required: true,
    type: [String, Number],
  },
  cacheCount: {
    //缓存显示的数量
    default: 6,
    type: [String, Number],
  },
  containerMinHeight: {
    //容器的最小高度，如果容器作为子元素很可能占位过小，导致可能展示半条元素高度
    default: "",
    type: [String, Number],
  },
});

const emits = defineEmits([]);

const obj = reactive({
  containCount: 0,
  rangeStart: 0,
  rangeEnd: 0,
  scrollTop: 0,
});

const init = () => {
  const { itemHeight} = props;
  //父容器的高度，以此来计算可以容纳的元素数量
  const listWrapHeight = listWrapRef.value.clientHeight;
  obj.containCount = Math.floor(listWrapHeight / itemHeight);
  const allDataLength = allData.length;
  obj.listBodyHeight = allDataLength * itemHeight;
};

const handleScroll = (event) => {
  //通过滚动距离计算元素的显示范围
  const {itemHeight} = props;
  obj.scrollTop = event.target.scrollTop;
  const rangeStart = Math.ceil(obj.scrollTop / itemHeight);
  listBodyRef.value.style.paddingTop = rangeStart  * itemHeight + 'px';
};

const range = computed(()=>{
  const {itemHeight,cacheCount} = props;
  const {scrollTop ,containCount} = obj;
  const rangeStart = Math.ceil(scrollTop / itemHeight);
  const allDataLength = allData.length,  end = containCount + cacheCount + rangeStart ;
  return {
    rangeStart,
    rangeEnd:end > allDataLength ? allDataLength : end
  }
})

//每次区域内展示的数据
const showData = computed(() => {
  let tempData = allData.slice(0);
  return tempData.slice(range.value.rangeStart, range.value.rangeEnd);
});

const itemHeightStyle = ref(props.itemHeight + 'px')
</script>
<style lang="scss" scoped >
.list-wrap {
  height: 100%;
  color:#fff;
  overflow: auto;
  .list-body{
    overflow: hidden;
  }
  .list-view{
    overflow: hidden;
    &-item{
      height:v-bind(itemHeightStyle);
    }
  }
}
</style>