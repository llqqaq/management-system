<template>
  <div class>
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{nav1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{nav2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "bread",
  props: ["nav1", "nav2"],
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
}
</style>