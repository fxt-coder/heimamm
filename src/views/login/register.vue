<template>
  <el-dialog class="register" :visible="isShow" :show-close="false" width="600px">
    <div slot="title" class="title">用户注册</div>

    <el-form ref="form" :rules="rules" :model="form" label-width="70px">
      <el-form-item prop="avatar" label="头像">
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="imgURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="图形码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img style="width:100%;height:40px" :src="codeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="rcode" label="验证码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      isShow: false,
      form: {
        avatar: "", //是	string	头像地址
        username: "", //是	string	用户名
        email: "", //是	string	邮箱
        phone: "", //是	string	手机号
        password: "", //是	string	密码
        code: "",
        rcode: "" //是	string	验证码
      },
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "change" },
          { min: 6, max: 12, message: "账号为6-12位数字或者字符" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "change" },
          { min: 11, max: 11, message: "请输入正确电话号码" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "密码为6-12位" }
        ],
        code: [
          { required: true, message: "请输入图形验证码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入手机验证码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success("验证成功");
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    handleAvatarSuccess(res) {
      this.form.avatar = res.data.file_path;
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less">
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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