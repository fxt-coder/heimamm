<template>
  <div class="userlist">
    <el-card>
      <el-form :model="form" label-width="90px" ref="form" inline>
        <el-form-item prop="username" label="用户名称">
          <el-input class="input" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input class="input" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-select class="input" v-model="form.role_id">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearText">清除</el-button>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus">新增用户</i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card">
      <el-table :data="data" border>
        <el-table-column width="50px" prop="num" label="序号">
          <template v-slot="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <span v-if="scope.row.status==1">{{scope.row.status==1?"启用":"禁用"}}</span>
            <span
              v-else-if="scope.row.status==0"
              style="color:red;font-weight:700"
            >{{scope.row.status==1?"启用":"禁用"}}</span>
          </template>
        </el-table-column>
        <el-table-column width="300px" prop="operate" label="操作">
          <template v-slot="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.status==0"
              type="success"
              @click="setUserlistStatus(scope.row.id)"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button
              v-else-if="scope.row.status==1"
              type="info"
              @click="setUserlistStatus(scope.row.id)"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalPage"
        ></el-pagination>
      </div>
    </el-card>
    <addUserlist :mode="mode" @search="search" ref="addUserlist"></addUserlist>
  </div>
</template>
<script>
// import store from "@/store/store.js";
import { getUserlist, setStatus, delUserlist } from "@/api/userlist.js";
import addUserlist from "./addUserlist";
export default {
  components: {
    addUserlist
  },
  data() {
    return {
      mode: "edit",
      pagination: {
        currentPage: 1,
        pageSize: 3,
        totalPage: 10
      },
      data: [],
      form: {
        username: "", //	否	string	昵称
        email: "", //	否	string	邮箱
        role_id: "", //	否	string	角色数字 2管理员、3老师、 4学生
        page: "", //	否	string	页码 默认为1
        limit: "" //	否	string	页尺寸 默认为10
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    clearText() {
      this.$refs.form.resetFields();
      this.search();
    },
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    getData() {
      let params = {
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      };
      getUserlist(params).then(res => {
        // window.console.log(res);
        this.pagination.totalPage = res.data.pagination.total;
        this.data = res.data.items;
      });
    },
    setUserlistStatus(id) {
      setStatus({ id }).then(() => {
        this.getData();
      });
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
      // console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
      // console.log(`当前页: ${page}`);
    },
    edit(row) {
      this.mode = "edit";
      window.console.log(row);
      // 获取子组件的this == this.$refs.addUserlist.数据名;
      this.$refs.addUserlist.isShow = true;
      // 把row的值传给子组件
      this.$refs.addUserlist.form = JSON.parse(JSON.stringify(row));
    },
    add() {
      this.mode = "add";
      this.$refs.addUserlist.isShow = true;
    },
    del(id) {
      this.$confirm("你确定要删除嘛", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消"
      }).then(() => {
        delUserlist({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    }
  }
};
</script>
<style lang="less">
.userlist {
  .input {
    width: 180px;
  }
  .card {
    margin-top: 20px;
  }
  .pagination {
    text-align: center;
  }
}
</style>