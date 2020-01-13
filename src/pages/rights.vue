<template>
  <div class>
    <breadcrumb nav1="权限管理" nav2="权限列表"></breadcrumb>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {rightsList} from '../api/http'
export default {
  name: "rights",
  components: {},
  props: {},
  data() {
    return {
      input3: "",
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    rightsList().then(backData => {
      if(backData.data.meta.status == 200){
        for(let i = 0; i<backData.data.data.length;i++){
          switch (backData.data.data[i].level){
            case '0':
                backData.data.data[i].level = '一级';
                break;
            case '1':
                backData.data.data[i].level = '二级';
                break;
            case '2':
                backData.data.data[i].level = '三级';
                break;
          }
        }
          this.tableData = backData.data.data
      }
    })
  },
  mounted() {}
};
</script>
<style scoped lang="less">
</style>