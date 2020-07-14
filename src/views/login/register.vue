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
          <el-col :span="14">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <img v-if="bol" style="width:100%;height:40px" :src="codeUrl" @click="changeCode" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="rcode" label="验证码">
        <el-row>
          <el-col :span="14">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-button @click="getCode" :disabled="totalTime<5">
              <span v-if="totalTime<5">({{totalTime+1+"S"}})后</span>获取用户验证码
            </el-button>
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
// import axios from "axios";
import { getCode, register } from "@/api/login.js";
export default {
  watch: {
    isShow(newValue) {
      if (newValue == false) {
        this.$refs.form.resetFields();
        this.imageUrl = "";
      }
    }
  },
  data() {
    return {
      totalTime: 5,
      bol: true,
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_email.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正确的邮箱地址"));
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "change" },
          { min: 11, max: 11, message: "请输入正确电话号码" },
          {
            validator: (rule, value, callback) => {
              let _phone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_phone.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正确的手机号"));
              }
            }
          }
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
    //点击图片改变验证码
    changeCode() {
      //通过重新对接口进行访问来达到刷新效果
      this.bol = false;
      this.$nextTick(() => {
        this.bol = true;
        this.codeUrl = process.env.VUE_APP_URL + "/captcha?type=sendsms";
      });
      // this.codeUrl =
      //   process.env.VUE_APP_URL + "/captcha?type=sendsms&sdf=" + Date.now();
    },
    // 获取验证码条件验证
    getCode() {
      let num = 0;
      this.$refs.form.validateField(["phone", "code"], errorMessage => {
        if (errorMessage == "") {
          num++;
        }
      });
      if (num == 2) {
        // this.$message.success("获取成功");
        this.totalTime--;
        let interval = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= -1) {
            clearInterval(interval);
            this.totalTime = 5;
          }
        }, 1000);
        //封装axios手机验证码获取请求
        getCode({
          code: this.form.code,
          phone: this.form.phone
        })
          .then(res => {
            window.console.log(res);
            this.$message.success(res.data.captcha + "");
          })
          .catch(res => {
            window.console.log(res);
          });
      } else {
        this.$message.error("获取失败");
      }
    },
    //注册表单提交
    submit() {
      // element表单提交方法   validate(result=>{})
      this.$refs.form.validate(result => {
        if (result) {
          // this.$message.success("验证成功");
          //封装axios注册表单数据的提交
          register(this.form)
            .then(res => {
              // window.console.log(res);
              if (res.code == 200) {
                this.$message.success("注册成功");
                this.isShow = false;
              }
            })
            .catch(res => {
              window.console.log(res);
            });
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    handleAvatarSuccess(res) {
      window.console.log(res);
      this.form.avatar = res.data.file_path;
      // 头像验证
      //部分表单元素提交
      this.$refs.form.validateField(["avatar"], errorMessage => {
        window.console.log(errorMessage);
      });
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