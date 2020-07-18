<template>
  <div class="subject">
    <!-- 搜索栏 -->
    <el-card>
      <el-form :model="form" ref="form" inline>
        <el-form-item label="学科编号" prop="rid">
          <el-input class="input" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="input" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="input" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clickClear">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus"></i>新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 学科列表 -->
    <el-card class="table">
      <el-table :data="tableData">
        <el-table-column width="50px" prop="id" label="序号">
          <template v-slot="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <span v-if="scope.row.status==1">{{scope.row.status==1?"启用":"禁用"}}</span>
            <span v-else style="color:red;font-weight: 700;">{{scope.row.status==1?"启用":"禁用"}}</span>
          </template>
        </el-table-column>
        <el-table-column width="300px" prop="operate" label="操作">
          <template v-slot="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.status==1"
              type="info"
              @click="clickSetStatus(scope.row.id)"
            >{{scope.row.status==1?"禁用":"启用"}}</el-button>
            <el-button
              v-else  
              type="success"
              @click="clickSetStatus(scope.row.id)"
            >{{scope.row.status==1?"禁用":"启用"}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addSubject :mode="mode" ref="addSubject" @search="search"></addSubject>
  </div>
</template>
<script>
import {
  sortSubjectList,
  setSubjectStatus,
  delSubject
} from "@/api/subject.js";
import addSubject from "./addSubject";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add",
      pagination: {
        currentPage: 1, // 当前 页
        pageSize: 10, //每页条数
        total: 1 //总数
      },
      tableData: [],
      form: {
        name: "", //否	string	学科名称
        // page: "", //否	string	页码 默认为1
        // limit: "", //否	string	页尺寸 默认为10
        rid: "", //否	string	学科编号
        username: "", //否	string	创建者用户名
        status: "" //否	string	状态 0(禁用) 1(启用)
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    clickSetStatus(id) {
      // window.console.log(id);
      setSubjectStatus({ id: id }).then(res => {
        this.$message.success("切换状态成功");
        window.console.log(res);
        // 通过搜索来完成状态的重新渲染
        this.getData();
      });
    },
    clickClear() {
      this.$refs.form.resetFields();
      this.search();
    },
    getData() {
      let params = {
        // 遍历数组
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      };
      sortSubjectList(params).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items;
        // window.console.log(this.pagination.total);
        // window.console.log(res.data.pagination.total);
        this.pagination.total = res.data.pagination.total;
      });
    },
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
      //每页条数改变时回调
      window.console.log("每页条数:", size);
    },
    handleCurrentChange(page) {
      //当前页码改变时的回调
      this.pagination.currentPage = page;
      this.getData();
      window.console.log("当前页面：", page);
    },
    add() {
      this.mode = "add";
      this.$refs.addSubject.isShow = true;
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addSubject.isShow = true;
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
    },
    del(id) {
      this.$confirm("你确定要删除嘛", "提示", {
        confirmButtonText: "确定删除",
        cancleButtonText: "取消",
        type: "warning"
      }).then(() => {
        delSubject({ id }).then(() => {
          this.$message.success("删除成功！");
          this.search();
        });
      });
    }
  }
};
</script>
<style lang='less'>
.subject {
  .table {
    margin-top: 20px;
  }
  .pagination {
    padding-top: 20px;
    text-align: center;
  }
  .input {
    width: 130px;
  }
}
</style>