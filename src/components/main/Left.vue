<template>
  <div class="left">
    <el-tooltip class="item" effect="dark" content="折叠菜单" placement="right">
      <div v-show="!isCollapse" style="width: 200px;" class="el-icon-s-operation" @click="controlAside"></div>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="展开菜单" placement="right">
      <div v-show="isCollapse" style="width: 64px;" class="el-icon-s-operation" @click="controlAside"></div>
    </el-tooltip>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#545c64"
      text-color="#fff"
      unique-opened>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <span slot="title">选项4</span>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data () {
    return {
      isCollapse: false
    };
  },
  methods: {
    controlAside () {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped>
  .left {
    width: 100%;
    height: 100%;
  }
  .el-menu {
    border-right: none;
  }
  .el-icon-s-operation {
    text-align: center;
    color: #ccc;
    font-size: 30px;
    background-color: #545c64;
    cursor: pointer;
    transition: all ease-in 0.3s;
  }
  .el-icon-s-operation:hover {
    color: #fff;
    background-color: #434a50;
  }
</style>
