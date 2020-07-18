<template>
  <el-dialog :visible.sync="isShow" width="600px" class="addSubject">
    <div slot="title" class="title">{{mode=="edit"?"编辑学科":"新增学科"}}</div>
    <el-form :model="form" :rules="rules" label-width="90px" ref="form">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  props: ["mode"],
  // 侦听器
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        this.form = {
          id: "",
          rid: "", //	是	string	学科编号
          name: "", //	是	string	学科名称
          short_name: "", //	否	string	学科简称
          intro: "", //	否	string	学科简介
          remark: "" //	否	string	备注
        };
        this.$refs.form.resetFields();
        // this.$nextTick(() => {
        //   this.$refs.form.clearValidate();
        // });
      }
    }
  },
  data() {
    return {
      isShow: false,
      form: {
        rid: "", //	是	string	学科编号
        name: "", //	是	string	学科名称
        short_name: "", //	否	string	学科简称
        intro: "", //	否	string	学科简介
        remark: "" //	否	string	备注
      },
      rules: {
        rid: [{ required: true, message: "必填嗷", trigger: "change" }],
        name: [{ required: true, message: "必填嗷", trigger: "change" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addSubject(this.form).then(() => {
              this.$message.success("新增成功");
              this.isShow = false;
              this.$parent.search();
            });
          } else {
            editSubject(this.form).then(() => {
              this.$message.success("编辑成功");
              this.isShow = false;
              // 子用父方法
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
.addSubject {
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