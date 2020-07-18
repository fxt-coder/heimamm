<template>
  <div class="business">
    <el-card>
      <el-form :model="form" label-width="70px" ref="form" inline>
        <el-form-item prop="eid" label="企业编号">
          <el-input class="input" v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input class="input" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input class="input" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status" class="select">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearText">清除</el-button>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus">新增企业</i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card">
      <el-table :data="data" border>
        <el-table-column width="50px" prop="num" label="序号">
          <template v-slot="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
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
              @click="setBusinessStatus(scope.row.id)"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button
              v-else-if="scope.row.status==1"
              type="info"
              @click="setBusinessStatus(scope.row.id)"
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
          :page-sizes="[2, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalPage"
        ></el-pagination>
      </div>
    </el-card>
    <addBusiness :mode="mode" @search="search" ref="addBusiness"></addBusiness>
  </div>
</template>
<script>
// import store from "@/store/store.js";
import { getBusiness, setStatus, delBusiness } from "@/api/business.js";
import addBusiness from "./addBusiness";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      mode: "edit",
      pagination: {
        currentPage: 1,
        pageSize: 2,
        totalPage: 10
      },
      data: [],
      form: {
        name: "", //否	string	企业名称
        // page: "", //否	string	页码 默认为1
        // limit: "", //否	string	页尺寸 默认为10
        eid: "", //否	string	企业id
        username: "", //否	string	用户名
        status: "" //否	string	状态 1（启用） 0（禁用）
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
      getBusiness(params).then(res => {
        // window.console.log(res);
        this.pagination.totalPage = res.data.pagination.total;
        this.data = res.data.items;
      });
    },
    setBusinessStatus(id) {
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
      // 获取子组件的this == this.$refs.addBusiness.数据名;
      this.$refs.addBusiness.isShow = true;
      // 把row的值传给子组件
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
    },
    add() {
      this.mode = "add";
      this.$refs.addBusiness.isShow = true;
    },
    del(id) {
      this.$confirm("你确定要删除嘛", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消"
      }).then(() => {
        delBusiness({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    }
  }
};
</script>
<style lang="less">
.business {
  .select {
    width: 100px;
  }
  .input {
    width: 150px;
  }
  .card {
    margin-top: 20px;
  }
  .pagination {
    text-align: center;
  }
}
</style>