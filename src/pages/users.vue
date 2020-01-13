<template>
  <div class>
    <breadcrumb nav1="用户管理" nav2="用户列表"></breadcrumb>
    <el-row>
      <el-col :span="5">
        <el-input
          placeholder="请输入内容"
          v-model.trim="query"
          @keyup.enter.native="search"
          class="input-with-select"
        >
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="success" plain @click="adduser = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 切换，注意绑定的数据 -->
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="update(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑操作 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="display(scope.row)"
            plain
            size="mini"
          ></el-button>
          <!-- 删除操作 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            @click="delOne(scope.row)"
            size="mini"
          ></el-button>
          <!-- 角色操作 -->
          <el-button
            type="success"
            icon="el-icon-check"
            @click="showRole(scope.row)"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="adduser">
      <el-form :model="form" ref="ruleForm" label-position="top" :rules="rules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adduser = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户表单 -->
    <el-dialog title="用户信息" :visible.sync="edit">
      <el-form :model="form1">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form1.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form1.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form1.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="editOne">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色用户表单 -->
    <el-dialog title="分配角色" :visible.sync="role">
      <el-form :model="roleform">
        <el-form-item label="当前用户" label-width="120px">{{roleform.username}}</el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="rolevalue" placeholder="请选择">
            <el-option v-for="item in roles" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="role = false">取 消</el-button>
        <el-button type="primary" @click="disRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  addUser,
  deleteUser,
  updateUserState,
  editUser,
  roles,
  disrole
} from "../api/http";
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      roleId: 0,
      rolevalue: "",
      roles: [],
      roleform: {
        username: "",
        role: ""
      },
      role: false,
      total: 0,
      edit: false,
      adduser: false,
      query: "",
      pagenum: 1,
      pagesize: 10,
      input3: "",
      tableData: [],
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      form1: {
        id: 0,
        username: "",
        email: "",
        mobile: ""
      },
      /* 表单验证规则 */
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {},
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.pagenum = 1;
      this.search();
    },
    handleCurrentChange(currentpage) {
      this.pagenum = currentpage;
      this.search();
    },
    search() {
      users({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(backData => {
        this.total = backData.data.data.total;
        this.tableData = backData.data.data.users;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUser(this.form).then(backData => {
            if (backData.data.meta.status == 201) {
              this.$message.success("添加成功");
              this.adduser = false;
              this.search();
            }
          });
        } else {
          this.$message.error("输入的内容格式出错");
          return false;
        }
      });
    },
    delOne(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        /* 点击确定 */
        .then(() => {
          deleteUser({ id: row.id }).then(backData => {
            if (backData.data.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        /* 点击取消 */
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    update(row) {
      updateUserState({
        uId: row.id,
        type: row.mg_state
      }).then(backData => {
        if (backData.data.meta.status == 200) {
          this.search();
        }
      });
    },
    display(row) {
      this.edit = true;
      console.log(row);
      (this.form1.id = row.id), (this.form1.username = row.username);
      this.form1.email = row.email;
      this.form1.mobile = row.mobile;
    },
    editOne() {
      this.edit = false;
      /* console.log(this.form.id);
      console.log(this.form.username);
      console.log(this.form.id); */

      editUser({
        id: this.form1.id,
        email: this.form1.email,
        mobile: this.form1.mobile
      }).then(backData => {
        if (backData.data.meta.status == 200) {
          this.$message.success("更新成功");
          this.search();
        } else {
          console.log(backData);
        }
      });
    },
    showRole(row) {
      console.log(row);
      this.roleId = row.id;
      this.rolevalue = row.role_name;
      this.role = true;
      this.roleform.username = row.username;
      roles().then(backData => {
        if (backData.data.meta.status == 200) {
          this.roles = backData.data.data;
        }
      });
    },
    disRole() {
      if (typeof this.rolevalue == 'string') {
        this.role = false;
        console.log('meijinqu');
        
        return;
      } else {
        console.log('zhixingle');
        
        disrole({ id: this.roleId, rid: this.rolevalue }).then(backData => {
          if (backData.data.meta.status == 200) {
            this.$message.success("分配成功");
            this.role = false;
            this.search();
          }
        });
      }
    }
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
</style>