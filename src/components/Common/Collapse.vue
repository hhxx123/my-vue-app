<script lang="ts" setup>
    import {ref} from 'vue'
    import {Key} from "@element-plus/icons-vue"
    import Descriptions from "./Descriptions.vue"
    const activeNames = ref(['1'])
    const handleChange = (val: string[]) => {

    }
</script>
<template>
  <div class="demo-collapse">
    <el-collapse  @change="handleChange" class="cc_collapse">
      <el-collapse-item name="3">
        <template #title>
          <div class="cc_collapse-title">Consistency
            <el-icon class="header-icon" style="vertical-align: middle">
              <info-filled/>
            </el-icon>
          </div>
        </template>
        <Descriptions>
          <template v-slot:default>
            <el-descriptions-item label="最高"><span class="cc_profit-color">679.38</span></el-descriptions-item>
            <el-descriptions-item label="今开"><span class="cc_loss-color">661.63</span></el-descriptions-item>
            <el-descriptions-item label="成交量">137.67万</el-descriptions-item>
            <el-descriptions-item label="最低">644.66</el-descriptions-item>
            <el-descriptions-item label="昨收">648.57</el-descriptions-item>
            <el-descriptions-item label="成交额">9.12亿</el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                换手率<el-icon><key /></el-icon>
              </template>
              9.12亿
            </el-descriptions-item>
          </template>
        </Descriptions>
      </el-collapse-item>
      <el-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss">
  .cc_profit-color {
    color: #44c668
  }

  .cc_loss-color {
    color: #fa4d4f
  }

  .cc_collapse {
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
</style>
