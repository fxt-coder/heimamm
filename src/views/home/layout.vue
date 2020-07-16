<template>
  <el-container class="layout" v-if="$store.state.userInfo!=''">
    <el-header class="header">
      <ul class="header-ul">
        <li>
          <i @click="isCollapse=!isCollapse" class="el-icon-s-fold" style="font-size:20px"></i>
        </li>
        <li>
          <img class="img1" src="@/assets/img/layout-logo.png" style="height:20px" alt />
        </li>
        <li class="t1">后台管理系统</li>
        <li class="null"></li>
        <li>
          <img class="img2" :src="baseUrl+'/'+$store.state.userInfo.avatar" alt />
        </li>
        <li class="t2">{{$store.state.userInfo.username}}，欢迎回家</li>
        <li>
          <el-button @click="backLogin" class="button" type="primary">退出</el-button>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside class="aside" width="auto">
        <el-menu
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          router
        >
          <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userlist">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, exitHome } from "@/api/home.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      isCollapse: false
    };
  },
  created() {
    getUserInfo().then(res => {
      // window.console.log(res);
      if (getToken()) {
        // this.userInfo = res.data;
        this.$store.state.userInfo = res.data;
      } else {
        this.$router.push("/");
        return;
      }
    });
  },
  methods: {
    backLogin() {
      this.$confirm("您确定要退出嘛", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          exitHome().then(() => {
            removeToken();
            this.$message.success("退出成功");
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='less' scoped>
.layout {
  height: 100%;
  .header {
    background-color: #fff;
    .header-ul {
      display: flex;
      align-items: center;
      padding-top: 7px;
    }
    .img1 {
      margin-top: 4px;
      padding: 0 10px 0 10px;
    }
    .img2 {
      width: 43px;
      height: 43px;
    }
    .null {
      flex: 1;
    }
    .t1 {
      font-size: 22px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #49a1ff;
      letter-spacing: 1px;
    }
    .t2 {
      padding: 0 10px 0 10px;
    }
    .button {
      margin-right: 10px;
    }
  }
  .aside {
    background-color: #fff;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .main {
    background-color: #e8e9ec;
  }
}
</style>