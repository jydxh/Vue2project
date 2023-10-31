<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>演员管理</el-breadcrumb-item>
      <el-breadcrumb-item>演员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">演员列表</el-divider>

    <!-- 呈现演员列表 -->
    <person name="成亮"></person>

  </div>
</template>

<script>
import Person from '@/components/Person.vue'
export default {
  components: {
    Person
  }
};
</script>

<style lang="scss" scoped>
</style>