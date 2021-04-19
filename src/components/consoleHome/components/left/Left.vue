<template>
  <div class="console-left">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数据管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="功能列表" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="地图操作" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="其他功能" name="fourth">其他功能</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data () {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>

</style>
