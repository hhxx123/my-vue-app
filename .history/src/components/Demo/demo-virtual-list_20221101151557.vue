<template>
    <div>虚拟列表</div>
    <div class="virtual-list-wrap" ref="virtualWrapRef">
        <!--总高度，滚动  -->
        <div class="virtual-list-scroll" ref="virtualScrollRef">
            <!--渲染区域  -->
            <div class="virtual-list-body" ref="virtualBodyRef">
                <div v-for="item in listData" class="list-item">
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
            description:"description ${i}"
        })
    }
})




</script>
<style lang="scss">
.virtual-list-wrap{
    height:300px;
    width:100%;
    border:1px solid black;


    .list-item{
        display:flex;
        justify-content:space-between;
    }
}
</style>