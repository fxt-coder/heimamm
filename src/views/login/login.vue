<template>
  <div class="login">
    <div class="left">
      <div class="header">
        <img src="@/assets/img/login_left.png" alt />
        <div class="type1">黑马面面</div>
        <div class="type2"></div>
        <div class="type3">用户登录</div>
      </div>
      <el-form class="form" :model="form">
        <el-form-item>
          <el-input v-model="form.phine" placeholder="请输入电话号码" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            placeholder="请输入电话密码"
            prefix-icon="el-icon-lock"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="img" src="@/assets/img/code.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="checkbox" v-model="form.isPass">
            我已阅读并同意
            <el-link class="link" type="primary">用户协议</el-link>和
            <el-link class="link" type="primary">隐私协议</el-link>
          </el-checkbox>
          <el-form-item>
            <el-button class="btn" type="primary">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary">注册</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_right.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        idPass: ""
      }
    };
  }
};
</script>
<style lang='less'>
.login {
  /* 弹性盒子布局 */
  display: flex;
  /* 水平布局 */
  justify-content: space-around;
  /* 垂直居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .left {
    width: 478px;
    height: 550px;
    padding: 48px;
    margin-left: -60px;
    background-color: #f5f5f5;
    .form {
      margin-top: 30px;
      .link {
        margin-bottom: 3px;
      }
      .btn {
        width: 100%;
        margin-top: 35px;
      }
      .img {
        width: 100%;
        height: 40px;
      }
    }

    .header {
      display: flex;
      align-items: center;

      .input {
        margin-top: 28px;
      }

      img {
        width: 22px;
        height: 17px;
      }
      .type1 {
        margin-left: 20px;
        font-size: 24px;
        font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
      .type2 {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
        margin: 0 20px;
      }
      .type3 {
        font-size: 21px;
        font-family: PingFangSC Regular, PingFangSC Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
    }
  }
}
</style>