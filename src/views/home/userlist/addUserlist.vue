<template>
  <div class="addUserlist">
    <el-dialog :visible.sync="isShow" width="600px">
      <div slot="title" class="title">{{mode=="edit"?"编辑用户":"新增用户"}}</div>
      <el-form ref="form" :rules="rules" :model="form" label-width="90px" :inline="false">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select class="input" v-model="form.role">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { editUserlist, addUserlist } from "@/api/userlist.js";
export default {
  props: ["mode"],
  watch: {
    isShow(val) {
      if (val == false) {
        this.form = {
          // id: "", //是	int	用户标识
          username: "", //	否	string	昵称
          phone: "", //	否	string	手机号
          email: "", //	否	string	邮箱
          // avatar: "", //	否	string	头像
          // password: "", //	否	string	密码
          remark: "", //	否	string	备注
          status: "", //	否	string	状态：1启用0禁用
          role_id: "" //	否	string	角色：2管理员、3老师、4学生
        };
        this.$refs.form.resetFields();
      }
    }
  },
  data() {
    return {
      isShow: false,
      rules: {
        username: [{ required: true, message: "必填", trigger: "blur" }],
        email: [
          { required: true, message: "必填", trigger: "blur" },
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
          { required: true, message: "必填", trigger: "blur" },
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
        role: [{ required: true, message: "必填", trigger: "change" }],
        status: [{ required: true, message: "必填", trigger: "change" }]
      },
      form: {
        // id: "", //是	int	用户标识
        username: "", //	否	string	昵称
        phone: "", //	否	string	手机号
        email: "", //	否	string	邮箱
        // avatar: "", //	否	string	头像
        // password: "", //	否	string	密码
        remark: "", //	否	string	备注
        status: "", //	否	string	状态：1启用0禁用
        role_id: "" //	否	string	角色：2管理员、3老师、4学生
      }
    };
  },
  methods: {
    submit() {
      // 表单的提交
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "edit") {
            editUserlist(this.form).then(() => {
              this.$message.success("编辑成功");
              this.isShow = false;
              this.$emit("search");
            });
          } else {
            addUserlist(this.form).then(() => {
              this.$message.success("新增成功");
              this.isShow = false;
              this.$emit("search");
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
.addUserlist {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background: linear-gradient(to right, #01c3fa, #1394fa);
  }
  .footer {
    text-align: center;
  }
}
</style>