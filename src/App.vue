<template>
  <div>
    <el-button @click="click">默认按钮</el-button>
  </div>
</template>
<script>
export default {
  methods:{
    click() {
      alert('点了我一下');
    }
  }
};
</script>
<style>
</style>