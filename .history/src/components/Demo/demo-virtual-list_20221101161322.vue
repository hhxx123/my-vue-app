<template>
    <div>虚拟列表</div>
    <!-- 可视区域 -->
    <div class="virtual-list-wrap" ref="virtualWrapRef">
        <!--总高度，滚动  -->
        <div class="virtual-list-scroll" ref="virtualScrollRef">
            <!--渲染区域  -->
            <div class="virtual-list-body" ref="virtualBodyRef">
                <div v-for="item in showList" class="list-item">
                    <span>{{item.name}}</span>
                    <span>{{item.description}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,computed,onMounted} from "vue";

const virtualWrapRef = ref(""),virtualScrollRef=ref(""),virtualBodyRef=ref("");

const listData = ref([]);//所有的数据
const itemHeight = 40;//列表项固定高度
const range = ref([]);//数据的起始和终止索引

onMounted(()=>{
    for(let i = 0 ;i<1000;i++){
        listData.value.push({
            name:`name ${i}`,
            description:`description ${i}`
        })
    }
    initData();
})

//通过获取可视区域的高度来判断可以展示列表项的长度
const initData = ()=>{
    if(virtualWrapRef.value){
        let bodyHeight = virtualWrapRef.value.clientHeight;
        let itemLength = Math.ceil(bodyHeight / itemHeight);
        range.value = [0,itemLength];
    }
}

// 展示的数据根据 rang 区间变化
const showList  = computed(()=>{
    let start = range.value[0] || 0;
    let end = range.value[1] || 6;
    return listData.value.slice(0).slice(start,end);
})







</script>
<style lang="scss">
.virtual-list-wrap{
    height:300px;
    width:100%;
    border:1px solid black;
    color:white;
    overflow:auto;

    .list-item{
        display:flex;
        justify-content:space-between;
        height:39px;
        line-height:39px;
        border-bottom:1px solid black;
    }
}
</style>