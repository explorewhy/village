<template>
  <div class="function-menu">
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        unique-opened
        active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-picture-outline-round"></i>
          <span>地图工具</span>
        </template>
        <el-menu-item index="1-1">
          <img :src="require('../../../../assets/img/toolBar/doubleViewer.png')">
          <span>双屏对比</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <img :src="require('../../../../assets/img/toolBar/shutterView.png')">
          <span>地球卷帘</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <img :src="require('../../../../assets/img/toolBar/三角尺2.png')">
          <span>三角测量</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <img :src="require('../../../../assets/img/toolBar/高度.png')">
          <span>垂直距离</span>
        </el-menu-item>
        <el-menu-item index="1-5">
          <img :src="require('../../../../assets/img/toolBar/长度.png')">
          <span>空间距离</span>
        </el-menu-item>
        <el-menu-item index="1-6">
          <img :src="require('../../../../assets/img/toolBar/面积.png')">
          <span>空间面积</span>
        </el-menu-item>
        <el-menu-item index="1-7">
          <img :src="require('../../../../assets/img/toolBar/通视.png')">
          <span>通视分析</span>
        </el-menu-item>
        <el-menu-item index="1-8">
          <img :src="require('../../../../assets/img/toolBar/可视域.png')">
          <span>可视域分析</span>
        </el-menu-item>
        <el-menu-item index="1-9">
          <img :src="require('../../../../assets/img/toolBar/透明.png')">
          <span>地表透明度</span>
        </el-menu-item>
        <el-menu-item index="1-10">
          <img :src="require('../../../../assets/img/toolBar/地球.png')">
          <span>地球开关</span>
        </el-menu-item>
        <el-menu-item index="1-11">
          <img :src="require('../../../../assets/img/toolBar/消除.png')">
          <span>重置地图</span>
        </el-menu-item>
        <el-menu-item index="1-12">
          <img :src="require('../../../../assets/img/toolBar/截图.png')">
          <span>屏幕截图</span>
        </el-menu-item>
      </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>其他工具</span>
      </template>
      <el-menu-item index="2-1">
        <span>添加经纬度线</span>
      </el-menu-item>
    </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'FunctionMenu',
  mounted () {
  },
  data () {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.function-menu{
  width: 100%;
  height: 100%;
}
.el-menu{
  border-right: 0;
  /*text-align: center;*/
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>
