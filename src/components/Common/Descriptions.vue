<script setup>
</script>
<template>
  <el-descriptions class="cc_el-description">
    <slot></slot>
  </el-descriptions>
</template>

<style  lang="scss">
  .cc_el-description {
    .el-descriptions__body .el-descriptions__table .el-descriptions__cell {
      font-size: 12px;
    }

    .el-descriptions__label {
      color: #828c9c !important;

    }

    .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
      padding-bottom: 6px;
    }

    .el-descriptions__table tr {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
    }

    .el-descriptions__cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  }

</style>