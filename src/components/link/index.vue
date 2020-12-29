<template>
    <el-breadcrumb separator="/" class="el-breadcrumd">
      <el-breadcrumb-item class="line">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
  .el-breadcrumd {
    height: 10px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,  0, 0, 10% );
  }
  .line {
    border-left: 3px solid #31c17b;
    padding-left: 10px;
  }
</style>