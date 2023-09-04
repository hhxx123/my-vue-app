<template>
  <el-container
    class="layout-container-demo"
    style="border: 1px solid #eee"
  >
    <el-aside width="50px">
      <el-scrollbar>
        <el-row class="tac">
          <el-col :span="24">
            <img src="../../../public/favicon.ico" style="width:50px;height:50px;"/>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item v-for="menuItem in menu" class="cc_el-menu-item" :index="menuItem.name" style="padding:0 10px">
                <div>
                  <el-icon><histogram/></el-icon>
                  <p>{{menuItem.name}}</p>
                </div>
<!--                <component :class="menuItem.icon" :is="menuItem.icon"></component>-->
<!--                <i :class="[menuItem.icon]"></i>-->
<!--                <Icon :class="menuItem.icon" :icon="menuItem.icon"></Icon>-->
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-aside>

    <el-container >
      <el-header class="cc_el-header">
        <div class="cc_header-left">
          <InputSearch />
        </div>
        <div class="cc_header-title">
          <el-icon><basketball/></el-icon>
          <span style="margin-left: 10px">Mitrade</span>
        </div>
        <div class="cc_header-right">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            >
              <setting
              />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar height="100%">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
      <el-footer>
        <p>footer</p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
  import {ref,onMounted} from 'vue'
  import {useRouter} from "vue-router"
  import $store from "../../store/index";
  import {CHANGE_THEME} from "../../store/types";
  const router = useRouter()
  import InputSearch from "../Common/Search/Input.vue"
  import {
    Location,
    Document,
    Menu as IconMenu,
    Setting,
    Histogram,
    Postcard,
    Suitcase,
    Coin,
    Calendar,
    Basketball
  } from '@element-plus/icons-vue'

  onMounted(()=>{
    $store.dispatch(CHANGE_THEME)
  })

  const handleOpen = (key, keyPath=[]) => {
    router.push('/demo')
    console.log("open",key, keyPath)
  }
  const handleClose = (key, keyPath=[]) => {
    console.log(key, keyPath)
  }

  const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
  const tableData = ref(Array(20).fill(item))
  const menu = [
    {
      "name": "行情",
      "icon": "el-icon-histogram"
    },
    {
      "name": "个股",
      "icon": "postcard"
    },
    {
      "name": "交易",
      "icon": "suitcase"
    },
    {
      "name": "资产",
      "icon": "coin"
    },
    {
      "name": "日历",
      "icon": "calendar"
    },

  ]
</script>

<style lang="scss">
  .cc_el-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:40px;
  }
  .cc_el-menu-item{
    line-height: 0!important;
  }
  .layout-container-demo {
    .el-header {
      position: relative;
      background-color: #b3c0d1;
      /*color: var(--el-text-color-primary);*/
    }

    .el-aside {
      width: 50px;
      /*color: var(--el-text-color-primary);*/
      /*background: #fff !important;*/
      border-right: solid 1px #e6e6e6;
      box-sizing: border-box;
    }

    .el-menu {
      border-right: none;
    }

    .el-main {
      padding: 0;
    }

    .toolbar {
      position: absolute;
      display: inline-flex;
      align-items: center;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
  }
  .cc_header-title{
    display: flex;
    align-items: center;
    flex:1;
    justify-content: center;
    font-size: 14px;
  }
  .cc_header-right{
    flex: 1;
    text-align: right;
  }
  .cc_header-left{
    flex: 1;
  }
  .el-scrollbar__view{
    height:100%;
  }

</style>
