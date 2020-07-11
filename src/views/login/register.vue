<template>
  <el-dialog class="register" :visible="isShow" :show-close="false" width="600px">
    <div slot="title" class="title">用户注册</div>
    <div slot="footer" class="footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    };
  }
};
</script>
<style lang="less">
.register {
  .title {
    width: 100%;
    height: 53px;
    line-height: 53px;
    text-align: center;
    background-color: #0ea2fa;
    color: #fff;
  }
  .footer {
    text-align: center;
  }
  .el-dialog__header {
    padding: 0;
  }
}
</style>