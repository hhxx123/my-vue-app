<template>
  <el-table :data="tableData"
            :border="border"
            :style="{width:width}"
            :size="size"
            max-height="250"
            class="cc_el-table"
  >
    <el-table-column
      v-if="isSelect"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="column in columns"
                     :fixed="column.fixed"
                     :sortable="column.sortable"
                     :prop="column.prop"
                     :label="column.label"
                     :width="column.width"
                     :type="column.type"
                     :formatter="column.formatter"
                     :renderHeader="column.renderHeader"
    >
      <!--      <template #header v-if="column.scopeHeader">-->
      <!--        {{column.scopeHeader()}}-->
      <!--      </template>-->
      <template #default="scope" v-if="column.slotCon">
        <slot :name="column.prop" :row="scope.row"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
  import {defineEmits, toRef, ref} from "vue"

  const multipleTableRef = ref()
  defineProps({
    isSelect: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    border: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "small"
    },
    type: {
      type: String,
      default: ""
    }
  })


</script>

<style>
  .cc_el-table .cell {
    line-height: 10px !important;
  }

  /*.cc_el-table{*/
  /*  height:calc(100vh - 100px) !important*/
  /*}*/
  .father {
    height: 500px;
    display: flex;
    flex-flow: column;
    background-color: black;
  }

  .son1 {
    background-color: red;
  }

  .son2 {
    flex-grow: 1;
    background-color: green;

  }


</style>