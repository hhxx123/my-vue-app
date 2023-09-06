
<template>
  <div>虚拟列表</div>
  {{ listBodyHeight }}
  {{ range }}
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
import { onMounted, computed, ref, reactive, onUpdated, nextTick } from "vue";

const listWrapRef = ref(null),
  listBodyRef = ref(null),
  listViewRef = ref(null);

const allData = [];
onMounted(() => {
  // 生成随机长度的汉字（范围为3到10个汉字）
  for (let i = 0; i < 1000; i++) {
    allData.push({
      id: i,
      name: generateRandomChinese(Math.floor(Math.random() * 100 + i)),
      code: i,
    });
  }
  init();
  initPositions();
});

onUpdated(() => {
  nextTick(() => {
    updatePositions();
  });
});

const initPositions = () => {
  const { itemHeight } = props;
  obj.positions = allData.map((item, index) => {
    return {
      index,
      height: itemHeight,
      top: index * itemHeight,
      bottom: (index + 1) * itemHeight,
      doHeight: 0,
    };
  });
};

const updatePositions = () => {
  const nodes = listViewRef.value.children;
  Array.from(nodes).forEach((node) => {
    let rect = node.getBoundingClientRect();
    let height = rect.height;
    let index = Number(node.id);
    let oldHeight = obj.positions[index].height;
    let dValue = height - oldHeight;
    if (dValue != 0) {
      obj.positions[index].height = height;
      obj.positions[index].bottom = obj.positions[index].bottom + dValue;
      // 更新后面的元素
      for (let k = index + 1; k < obj.positions.length; k++) {
        obj.positions[k].top = obj.positions[k - 1].bottom;
        obj.positions[k].bottom = obj.positions[k].bottom + dValue;
      }
    }
  });
  // console.log(obj.positions);
};

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

//列表总高度
const listBodyHeight = computed(() => {
  /* 定高时的计算
   *return allData.length * props.itemHeight
   */
  // 动态高度时列表总高度就是最后一个元素的bottom值
  return obj.positions[obj.positions.length - 1].bottom;
});

const init = () => {
  const { itemHeight } = props;
  //父容器的高度，以此来计算可以容纳的元素数量
  const listWrapHeight = listWrapRef.value.clientHeight;
  obj.containCount = Math.floor(listWrapHeight / itemHeight);
};

const handleScroll = (event) => {
  //通过滚动距离计算元素的显示范围
  obj.scrollTop = event.target.scrollTop;
  //二分查找效率更高
  let rangeStart = binarySearch(obj.scrollTop);
  if(obj.positions[rangeStart].bottom < obj.scrollTop){
      rangeStart+=1;
  }
  console.log("scroll",rangeStart);
  obj.rangeStart = rangeStart;
  listBodyRef.value.style.paddingTop =
    rangeStart > 0 ? obj.positions[rangeStart - 1].bottom + "px" : 0;
};

//搜索rangeStart元素
const binarySearch = (scrollTop = 0) => {
  let start = 0;
  let end = obj.positions.length - 1;
  let tempIndex;
  while (start <= end) {
    tempIndex = Math.floor((start + end) / 2);
    let midBottom = obj.positions[tempIndex].bottom;
    if (midBottom === scrollTop) {
      return tempIndex;
    } else if (midBottom > scrollTop) {
      end = tempIndex - 1;
    } else {
      start = tempIndex + 1;
    }
  }
  return tempIndex;
};

/**定高的range计算 */
// const range = computed(() => {
//   const { itemHeight, cacheCount } = props;
//   const { scrollTop, containCount } = obj;
//   const rangeStart = Math.ceil(scrollTop / itemHeight);
//   const allDataLength = allData.length,
//     end = containCount + cacheCount + rangeStart;
//   return {
//     rangeStart,
//     rangeEnd: end > allDataLength ? allDataLength : end,
//   };
// });

/**不定高的range计算 */
const range = computed(()=>{
  const {rangeStart,containCount} = obj;
  const {cacheCount} = props;
  const allDataLength = allData.length,
  end = containCount + cacheCount + rangeStart;
  const rangeEnd = end > allDataLength ? allDataLength : end;
  return {
    rangeStart,
    rangeEnd
  }
})

//每次区域内展示的数据
const showData = computed(() => {
  let tempData = allData.slice(0);
  return tempData.slice(range.value.rangeStart,range.value.rangeEnd);
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

const itemHeightStyle = ref(props.itemHeight + "px");
</script>
<style lang="scss" scoped >
.list-wrap {
  height: 100%;
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