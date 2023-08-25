<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    popper-class="my-autocomplete"
    placeholder="代码/拼音/名称"
    @select="handleSelect"
    clearable="true"
    size="small"
    class="cc_auto"
  >
    <template #prefix>
      <el-icon class="el-input__icon" @click="handleIconClick">
        <search />
      </el-icon>
    </template>
    <template #default="{ item }">
      <div class="cc_auto-con">
        <span class="link">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </template>
  </el-autocomplete>
</template>

<script  setup>
    import { ref, onMounted } from 'vue'
    import { Edit,Search } from '@element-plus/icons-vue'

    let state = ref('')
    const links = ref([])

    const querySearch = (queryString, cb) => {
        const results = queryString
            ? links.value.filter(createFilter(queryString))
            : links.value
        cb(results)
    }
    const createFilter = (queryString) => {
        return (restaurant) => {
            return (
                restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            )
        }
    }
    const loadAll = () => {
        return [
            { value: 'vue', label: 'https://github.com/vuejs/vue' },
            { value: 'element', label: 'https://github.com/ElemeFE/element' },
            { value: 'cooking', label: 'https://github.com/ElemeFE/cooking' },
            { value: 'mint-ui', label: 'https://github.com/ElemeFE/mint-ui' },
            { value: 'vuex', label: 'https://github.com/vuejs/vuex' },
            { value: 'vue-router', label: 'https://github.com/vuejs/vue-router' },
            { value: 'babel', label: 'https://github.com/babel/babel' },
        ]
    }
    const handleSelect = (item) => {
        // state.value = ""
        console.log(item)
    }

    const handleIconClick = (ev) => {
        console.log(ev)
    }

    onMounted(() => {
        links.value = loadAll()
    })
</script>

<style>
  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }
  .my-autocomplete li .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete li .addr {
    font-size: 12px;
    color: #b4b4b4;
  }
  .my-autocomplete li .highlighted .addr {
    color: #ddd;
  }
  .cc_auto-con{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cc_auto{
    font-size: 12px;
  }
</style>
