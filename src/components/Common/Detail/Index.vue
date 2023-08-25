<script setup>
  import {Star, Bell, Box, Bottom} from "@element-plus/icons-vue"
  import ToolTip from "../ToolTip.vue"
  import Tag from "../Tag.vue"
  import Tab from "../Tab/Index.vue"
  import Collapse from "../Collapse.vue"
  import {ref} from "vue"
  const tabList = [
    {
      label: "报价",
      name: "first"
    },
    {
      label: "分析",
      name: "second"
    },
    {
      label: "财务",
      name: "third"
    }, {
      label: "公告",
      name: "fourth"
    }, {
      label: "新闻",
      name: "fifth"
    },
    {
      label: "贴子",
      name: "sixth"
    }
  ]
  const activeName = ref('second')
  const handleTabClick = (tab, event) => {
    activeName.value = tab.props.name;
  }

</script>
<template>
  <el-card class="box-card cc_card">
    <template #header>
      <div class="card-header">
        <template class="cc_card-header-top">
          <div class="cc_card-header-t">
            <ToolTip :title="'AU AngloGold Ashanti Ltd ADS'">
              <template v-slot:default>
                <span class="cc_card-header-name">AU AngloGold Ashanti Ltd ADS</span>
              </template>
            </ToolTip>
            <span class="gray margin-left-2">(NYSE)</span>
          </div>
          <div class="cc_card-header-o">
            <ToolTip :title="'笔记'">
              <el-icon>
                <bell/>
              </el-icon>
            </ToolTip>
            <ToolTip :title="'预警'">
              <el-icon class="margin-left-5">
                <box/>
              </el-icon>
            </ToolTip>
            <ToolTip :title="'添加自选'">
              <el-icon class="margin-left-5">
                <star/>
              </el-icon>
            </ToolTip>
          </div>
        </template>
        <template class="cc_card-header-center">
          <ToolTip :title="'跳转盘中行情'" :placement="'bottom'">
            <template v-slot:default>
              <div class="cc_card-header-c-left">
                <span class="cc_card-profit">19.11</span>
                <el-icon>
                  <bottom/>
                </el-icon>
                <div class="font-size-12 font-weight-500">
                  <p>-1.26</p>
                  <p>-6.19%</p>
                </div>
              </div>
            </template>
          </ToolTip>
          <ToolTip :title="'当前为每股level1基础报价数据。你可点击查看各市场行情数据。'">
            <el-icon>
              <star/>
            </el-icon>
          </ToolTip>
        </template>
        <ToolTip :title="'跳转盘后行情'" :placement="'bottom'">
          <div class="cc_card-header-footer">
             <Tag :color="'#ddd'" :width="30" :type="'info'">
               <span>盘后</span>
             </Tag>
            <span class="cc_profit-color font-weight-500">19.22 +0.11 +0.58%</span>
          </div>
        </ToolTip>
      </div>
      <Tab :tabList="tabList" :activeName="activeName" @tabClick="handleTabClick" ></Tab>
    </template>
    <div class="cc_card-content" v-show="activeName === 'first'" @clicked="handleTabClick">
      <Collapse></Collapse>
    </div>
  </el-card>
</template>


<style  lang="scss">
  .cc_card-header-name {
    font-weight: bold;
  }

  .cc_card-header-c-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fa4d4f
  }

  .cc_card-header-top, .cc_card-header-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  .font-size-12 {
    font-size: 12px;
  }

  .cc_card-profit {
    font-size: 28px;
    font-weight: bolder;
  }

  .gray {
    color: #838d9d
  }

  .margin-left-2 {
    margin-left: 2px
  }

  .margin-left-5 {
    margin-left: 5px
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  }

  /*p {*/
  /*  margin: 0*/
  /*}*/

  .font-weight-500 {
    font-weight: 500
  }
  .cc_profit-color{
    color:#44c668
  }
  .cc_card-header-footer{
    font-size:12px ;
    width:200px;
  }

  .cc_card {
    .el-card__header {
      border-bottom:0;
      padding:5px 20px
    }
    .el-card__body{
      padding:5px 20px
    }
    .el-collapse-item__header{
      border-bottom: 0;
    }
    .el-collapse-item__wrap{
      border-bottom: 0;
    }
  }
</style>
