<template>
  <el-container class="layout">
    <el-header class="myheader">
      <el-col>
        <el-col :span="4">
          <img src="../assets/timg.jpg" class="logo" alt />
        </el-col>
        <el-col :span="19">
          <h2>电竞后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="javascript:;" class="layout" @click.prevent="logout">退出</a>
        </el-col>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px" class="myaside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu :index="''+index" v-for="(item,index) in menusList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName}}</span>
            </template>
            <!-- 这里设置跳转的地址 -->
            <el-menu-item :index="'/index/'+ it.path" v-for="(it,i) in item.children">
              <i class="el-icon-menu"></i>
              {{ it.authName }}
            </el-menu-item>
            
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <el-main class="mymain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {menus} from '../api/http'

export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      menusList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    logout(){
      this.$confirm('是否退出', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        }).catch(() => {
          this.$message('已取消退出')        
        });
    }
  },
  created() {
    menus().then(backData => {
        this.menusList = backData.data.data      
    })
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  .myheader {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    .logo {
      height: 60px;
      width: 70%;
    }
    .layout {
      color: #fff;
      text-decoration: none;
      padding: 5px;
      background-color: skyblue;
    }
    h2 {
      text-align: center;
    }
  }
  .myaside {
    background-color: #fff;
  }
  .mymain {
    padding-top: 0;
    background-color: #e9ecf3;
  }
}
</style>