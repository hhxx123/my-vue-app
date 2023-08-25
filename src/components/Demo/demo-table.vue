<template>
  <div>
    <ul class="cc_table-filter" @click="handleFilter">
      <li class="cc_table-filter-setting">
        <el-icon>
          <Setting/>
        </el-icon>
      </li>
      <li data-value="'all'">全部</li>
      <li>美股</li>
      <li>港股</li>
      <li>沪深</li>
      <li>期权</li>
      <li class="cc_table-filter-arrow">
        <el-icon  @click="handleToggle">
          <ArrowUp v-if="showFilter"></ArrowUp>
          <ArrowDown v-else></ArrowDown>
        </el-icon>
      </li>
      <template v-if="showFilter" class="test">
        <li>新加坡</li>
        <li>澳洲</li>
        <li>持仓</li>
      </template>
    </ul>
    <CommonTable
      :tableData="tableData"
      :columns="columns"
      :size="size"
      :border="border"
      :isSelect="false"
      :width="'300px'"
    >
      <template v-slot:code="{ row }">
        <el-tag class="el-icon-message-solid" type="success">
          {{'US'}}
        </el-tag>

      </template>
      <template v-slot:zip="{ row }">
        <el-tag class="el-icon-message-solid" type="success">
          {{ row.zip }}
        </el-tag>
      </template>
      <template v-slot:price="{ row }">
        <el-tag class="el-icon-message-solid" type="success">
          {{ row.price }}
        </el-tag>
      </template>

    </CommonTable>
  </div>

</template>

<script setup>
  import CommonTable from "../Common/Table/Index.vue"
  import {Setting, ArrowDown, ArrowUp} from "@element-plus/icons-vue"
  import {h,ref} from "vue"

  const size = "small", border = false;
  const showFilter = ref(true);

  const tableData = ref([]); //data 应该放在store里,
  for (let i = 0; i < 25; i++) {
    tableData.value.push({
      code: "苹果" + i,
      codeName: "AAPL" + i,
      price: 174.78 + i,
      codePrice: "174.40" + i,
      profit: "2.61",
      loss: "0.22",
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      i: '2016-05-03',
      b: '2016-05-03',
      a: '2016-05-03',
      c: '2016-05-03',
      level: "级别1111",
      zip: "ccxc"
    },)
  }
  const columns = [
    {
      prop: "code",
      label: "名称|代码",
      width: "120",
      // fixed: true,
      sortable: true,
      type: "default",
      // scopeHeader: function () {
      //   return h('el-tag', {
      //     color: 'green'
      //   },"fdfd")
      // },
      renderHeader: function ({column, $index}) {
        return h('el-tag', {
          color: 'green'
        }, "TestHeaderRender")
      },

    },
    {
      prop: "price",
      label: "价格",
      width: "120",
      sortable: true,
      type: "default",
      formatter: function (row, column, cellValue, index) {
        return `formatter: ${cellValue.toFixed(2)}`
      }
    },
    {
      label: '邮编',
      prop: 'zip',
      slotCon: true,
    },
  ]

  const handleToggle = ()=>{
    showFilter.value = !(showFilter.value);
  }

  const handleFilter = (e)=>{
    let filterValue = e.target.dataset.value;
    tableData.value = tableData.value.filter((item,index)=>index%2===0);
  }

</script>

<style scoped lang="scss">
  .cc_table-filter {
    color:var(--el-text-color-primary);
    display: flex;
    width: 300px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0;

    li {
      padding:0 10px;
    }
    .cc_table-filter-setting{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cc_table-filter-arrow{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

</style>