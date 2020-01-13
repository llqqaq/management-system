<template>
  <div class>
    <el-alert title="添加商品信息" type="info" show-icon></el-alert>
    <el-steps :active="parseInt(active)" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="基本信息" name="0">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :headers="header"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <quillEditor></quillEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* 富文本样式 */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
/* 导包 */
import { quillEditor } from 'vue-quill-editor'

export default {
/* 组件注册 */
   components: {
    quillEditor
  },
  props: {},
  data() {
    return {
      /* 切换关联的数据 */
      active: "0",
      /* 图片的数组 */
      fileList: [],
      /* 请求头 */
      header: {
        Authorization: window.sessionStorage.getItem('token')
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 图片的回调函数 */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>