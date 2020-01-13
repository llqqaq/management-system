<template>
  <div class="login">
    <div class="form-box">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/http'
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        /* 表单验证成功 */
        if (valid) {
          login(this.ruleForm).then(backData => {
            console.log(backData);
              if(backData.data.meta.status == 200){
                this.$message.success(backData.data.meta.msg)
                window.sessionStorage.setItem('token',backData.data.data.token)

                this.$router.push('/index')
              }
              else if(backData.data.meta.status == 400){
                this.$message.error(backData.data.meta.msg)
              }
          })
        } 
        /* 表单验证失败 */
        else {
          this.$message.error('请按要求填写表单')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  display: flex;
  /* 内部水平居中 */
  justify-content: center;
  /* 内部垂直居中 */
  align-items: center;
  .form-box {
    width: 580px;
    height: 435px;
    border-radius: 10px;
    background-color: white;
    padding: 50px 40px;
    box-sizing: border-box;
    h2 {
      margin-bottom: 20px;
    }
    .submit {
      width: 100%;
    }
  }
}
</style>