<template>
  <div class>
    <breadcrumb nav1="商品管理" nav2="商品分类"></breadcrumb>
    <el-row>
      <el-col :span="1">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" row-key="cat_id" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          {{scope.row.cat_level | toHanzi}}
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          {{scope.row.cat_level | toDeleted}}
        </template>
      </el-table-column>
       <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑操作 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <!-- 删除操作 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
import { getCategories } from "../api/http";
export default {
  name: "categories",
  components: {},
  props: {},
  data() {
    return {
      input3: "",
      tableData: []
    };
  },
  filters:{
    toHanzi(num){
      switch (num) {
        case 0:
          return '一级'
          break;
        case 1:
          return '二级'
          break;
        case 2:
          return '三级'
          break;
        default:
          break;
      }
    },
    toDeleted(isDeleted){
      return isDeleted?'无效':'有效'
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange(pagesize) {},
    handleCurrentChange(currentpage) {}
  },
  created() {
    getCategories().then(backData => {
      if (backData.data.meta.status == 200) {
        this.tableData = backData.data.data
      }
    });
  },
  mounted() {}
};
</script>
<style scoped lang="less">
</style>