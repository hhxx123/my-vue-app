
<template>
  <div class="list-wrap" ref="listWrapRef" @scroll="handleScroll">
    <div
      class="list-body"
      ref="listBodyRef"
      :style="`height:${listBodyHeight}px`"
    >
      <div class="list-view" ref="listViewRef">
        <div
          v-for="item in showData"
          :key="item.code"
          :id="item.id"
          class="list-view-item"
        >
          {{ item.id }} --------- {{ item.name }}
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
import {
  onMounted,
  computed,
  ref,
  reactive,
  onUpdated,
  nextTick,
  watch,
  watchEffect,
} from "vue";

const listWrapRef = ref(null),
  listBodyRef = ref(null),
  listViewRef = ref(null);

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
  data: {
    // 所有数据
    default: [],
    type: Array,
  },
});

const emits = defineEmits([]);

const obj = reactive({
  containCount: 0,
  rangeStart: 0,
  scrollTop: 0,
  positions: [
    {
      index: 0,
      top: 0,
      height: props.itemHeight,
      bottom: props.itemHeight,
    },
  ],
});

onMounted(() => {
  init();
  initPositions();
});

onUpdated(() => {
  nextTick(() => {
    updatePositions();
  });
});

const init = () => {
  const { itemHeight } = props;
  //父容器的高度，以此来计算可以容纳的元素数量
  const listWrapHeight = listWrapRef.value.clientHeight;
  obj.containCount = Math.floor(listWrapHeight / itemHeight);
};

const initPositions = () => {
  const { itemHeight, data } = props;
  obj.positions = data.map((item, index) => {
    return {
      index,
      height: itemHeight,
      top: index * itemHeight,
      bottom: (index + 1) * itemHeight,
      doHeight: 0,
    };
  });
};

watchEffect(() => {//依赖项发生更改时
  initPositions();
});

const updatePositions = () => {
  const nodes = listViewRef.value.children;
  Array.from(nodes).forEach((node) => {
    let rect = node.getBoundingClientRect();
    let height = rect.height;
    let index = Number(node.id);

    let oldHeight = obj.positions[index].height;
    let dValue =  oldHeight - height;
    if (dValue != 0) {
      obj.positions[index].height = height;
      obj.positions[index].bottom = obj.positions[index].bottom - dValue;
      // 更新后面的元素
      for (let k = index + 1; k < obj.positions.length; k++) {
        obj.positions[k].top = obj.positions[k - 1].bottom;
        obj.positions[k].bottom = obj.positions[k].bottom - dValue;
      }
    }
  });
};

//列表总高度
const listBodyHeight = computed(() => {
  /* 定高时的计算
   *return allData.length * props.itemHeight
   */
  // 动态高度时列表总高度就是最后一个元素的bottom值
  return obj.positions[obj.positions.length - 1]?.bottom;
});

const handleScroll = (event) => {
  //通过滚动距离计算元素的显示范围
  obj.scrollTop = event.target.scrollTop;
  //二分查找效率更高
  let rangeStart = binarySearch(obj.scrollTop);
  obj.rangeStart = rangeStart;
  let startOffset =
        rangeStart >= 1 ? obj.positions[rangeStart - 1].bottom : 0;
      listViewRef.value.style.transform = `translate3d(0,${startOffset}px,0)`;
  // 添加触底加载更多的功能
  const clientHeight = event.target.clientHeight;
  const scrollHeight = event.target.scrollHeight;
  loadMore(clientHeight,scrollHeight);
};

/**到底部去加载更多元素 */
const loadMore = (clientHeight,scrollHeight)=>{
  const isScrolledToBottom = obj.scrollTop + clientHeight >= scrollHeight;
  if (isScrolledToBottom) {
    console.log("ended");
    //这个时候去加载更多数据
  }
}

//搜索rangeStart元素
const binarySearch = (scrollTop = 0) => {
  let start = 0;
  let end = obj.positions.length - 1;
  let tempIndex;
  while (start <= end) {
    let midIndex = Math.floor((start + end) / 2);
    let midValue = obj.positions[midIndex].bottom;
    if (midValue === scrollTop) {
      return midIndex + 1;
    } else if(midValue < scrollTop){
      start = midIndex + 1;
    }else if(midValue > scrollTop){
      if(!tempIndex || tempIndex > midIndex){
        tempIndex = midIndex
      }
      end = end - 1;
    }
  }
  return tempIndex;
};

/**不定高的range计算 */
const range = computed(() => {
  const { rangeStart, containCount } = obj;
  const { cacheCount, data } = props;
  const allDataLength = data.length,
    end = containCount + cacheCount + rangeStart;
  const rangeEnd = end > allDataLength ? allDataLength : end;
  return {
    rangeStart,
    rangeEnd,
  };
});

//每次区域内展示的数据
const showData = computed(() => {
  let tempData = props.data.slice(0);
  return tempData.slice(range.value.rangeStart, range.value.rangeEnd);
});

</script>
<style lang="scss" scoped >
.list-wrap {
  height: 400px;
  color: #fff;
  overflow: auto;
  .list-body {
    overflow: hidden;
  }
  .list-view {
    overflow: hidden;
    &-item {
      // height:v-bind(itemHeightStyle);
      padding: 4px 4px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>