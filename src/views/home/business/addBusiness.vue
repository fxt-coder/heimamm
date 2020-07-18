<template>
  <div class="addBusiness">
    <el-dialog :visible.sync="isShow" width="600px">
      <div slot="title" class="title">{{mode=="edit"?"编辑企业":"新增企业"}}</div>
      <el-form ref="form" :rules="rules" :model="form" label-width="90px" :inline="false">
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="企业简称">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="企业简介">
          <el-input v-model="form.intro"></el-input>
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
import { editBusiness, addBusiness } from "@/api/business.js";
export default {
  props: ["mode"],
  watch: {
    isShow(val) {
      if (val == false) {
        this.form = {
          eid: "", //	是	string	企业编号
          name: "", //	是	string	企业名称
          short_name: "", //	是	string	简称
          intro: "", //	是	string	企业简介
          remark: "" //	否	string	备注
        };
        this.$refs.form.resetFields();
      }
    }
  },
  data() {
    return {
      isShow: false,
      rules: {
        eid: [{ required: true, message: "必填", trigger: "blur" }],
        name: [{ required: true, message: "必填", trigger: "blur" }],
        short_name: [{ required: true, message: "必填", trigger: "blur" }],
        intro: [{ required: true, message: "必填", trigger: "change" }],
        remark: [{ required: true, message: "必填", trigger: "change" }]
      },
      form: {
        eid: "", //	是	string	企业编号
        name: "", //	是	string	企业名称
        short_name: "", //	是	string	简称
        intro: "", //	是	string	企业简介
        remark: "" //	否	string	备注
      }
    };
  },
  methods: {
    submit() {
      // 表单的提交
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "edit") {
            editBusiness(this.form).then(() => {
              this.$message.success("编辑成功");
              this.isShow = false;
              this.$emit("search");
            });
          } else {
            addBusiness(this.form).then(() => {
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
.addBusiness {
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