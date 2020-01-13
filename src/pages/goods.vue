<template>
  <div class>
    <breadcrumb nav1='商品管理' nav2='商品列表'></breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      input3: '',
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange(pagesize) {},
    handleCurrentChange(currentpage) {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
</style>