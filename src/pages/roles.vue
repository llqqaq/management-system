<template>
  <div class>
    <breadcrumb nav1="权限管理" nav2="用户列表"></breadcrumb>
    <el-row>
      <el-col :span="1">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border>
      <!-- 展开部分 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 最外层的行数 -->
          <el-row v-for="topLever in props.row.children">
            <el-col :span="4">
              <!-- 第一列 -->
              <el-tag
                class="my-tag"
                @close="close(props.row,topLever)"
                closable
              >{{topLever.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="20">
              <el-row v-for="secondLever in topLever.children">
                <el-col :span="6">
                  <!-- 第二列 -->
                  <el-tag
                    class="my-tag"
                    @close="close(props.row,secondLever)"
                    closable
                    type="success"
                  >{{secondLever.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    class="my-tag"
                    v-for="thildLever in secondLever.children"
                    @close="close(props.row,thildLever)"
                    closable
                    type="warning"
                  >{{thildLever.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑操作 -->
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <!-- 删除操作 -->
          <el-button type="danger" plain icon="el-icon-delete" size="mini"></el-button>
          <!-- 角色操作 -->
          <el-button
            type="success"
            icon="el-icon-check"
            @click="showDialog(scope.row)"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限对话框 -->
    <el-dialog title="收货地址" :visible.sync="roleForm">
      <!-- 树形权限 -->
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-checked-keys="choosed"
        :props="defaultProps"
         ref="tree"
        default-expand-all
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleForm = false">取 消</el-button>
        <el-button type="primary" @click="giveRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roles, deleteRole, rightsTree,giveRights } from "../api/http";
import { log } from "util";
export default {
  name: "roles",
  components: {},
  props: {},
  data() {
    return {
      /* 被选中的角色ID */
      choosedId: '',
      /* 树形数据 */
      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      /* 勾选的值 */
      choosed: [],
      roleForm: false,
      input3: "",
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      roles().then(backData => {
        this.tableData = backData.data.data;
        /* console.log(backData); */
      });
    },
    close(row, tag) {
      /* 
      console.log(row.id);
      console.log(row.id);
 */
      deleteRole({
        roleId: row.id,
        rightId: tag.id
      }).then(backData => {
        if (backData.data.meta.status == 200) {
          /* 重新渲染局部 */
          /* 这里很有疑问 */
          row.children = backData.data.data;
        }
      });
    },
    showDialog(row) {
      /* console.log(row); */
      this.choosedId = row.id
      this.roleForm = true;
      rightsTree().then(backData => {
        if (backData.data.meta.status == 200) {
          this.data = backData.data.data;
        }
      });
      let tem = [];
      /* for (let i = 0; i < row.children.length; i++) {
        for (let j = 0; j < row.children[i].children.length; j++) {
          for(let k = 0;k < row.children[i].children[j].children.length;k++){
            tem.push(row.children[i].children[j].children[k].id)
          }
        }
      } */
      /* 可以用递归的方式把id加进去 */
      function addId(items) {
        for (let i = 0; i < items.children.length; i++) {
          if (items.children[i].children) {
            addId(items.children[i]);
          } else {
            tem.push(items.children[i].id);
          }
        }
      }
      addId(row);
      this.choosed = tem;
      
    },
    giveRole(){

      /* 获取全选中的id,返回数组 */
      const allrids = this.$refs.tree.getCheckedKeys()
      /* 获取半选中的id */
      const halfrids = this.$refs.tree.getHalfCheckedKeys()
  
      /* Es6中拼接数组的方法 */
      const totalrids = [...allrids,...halfrids]

      /* 将数组转化成以规定字符拼接起来的字符串 */
      const rids = totalrids.join(',')
      
      giveRights({
        roleId: this.choosedId,
        rids: rids
      }).then(backData => {
        if(backData.data.meta.status == 200){
          this.$message.success('更新成功')
          this.roleForm = false
          this.getData()
        }
      })
      
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.my-tag {
  margin-bottom: 10px;
  margin-right: 6px;
}
</style>