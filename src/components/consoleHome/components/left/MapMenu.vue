<template>
  <div class="map-menu">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-picture-outline"></i>
          <span>地图API</span>
        </template>
        <el-submenu index="1-1">
        <template slot="title">
          <span>天地图</span>
        </template>
          <el-menu-item index="1-1-1">矢量底图</el-menu-item>
          <el-menu-item index="1-1-2">影像底图</el-menu-item>
          <el-menu-item index="1-1-2">三维地形</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2" disabled>
          <template slot="title">
            <span>谷歌地图</span>
          </template>
          <el-menu-item index="1-2-1">谷歌</el-menu-item>
        </el-submenu>
        <el-submenu index="1-3">
          <template slot="title">
            <span>ArcGIS</span>
          </template>
          <el-menu-item index="1-3-1">矢量底图</el-menu-item>
          <el-menu-item index="1-3-2">影像底图</el-menu-item>
          <el-menu-item index="1-3-2">三维地形</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>设置中心点</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MapMenu',
  data () {
    return {};
  },
  methods: {
    handleOpen () {},
    handleClose () {}
  }
};
</script>

<style scoped>
.map-menu{
  width: 100%;
  height: 100%;
}
.el-menu{
  border-right: 0;
}
</style>
