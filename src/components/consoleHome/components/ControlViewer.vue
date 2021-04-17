<template>
  <div class="control-viewer">
    <div id="cesiumViewer"></div>
    <div class="latitude-longitude">
      <div class="jingdu">经度: <span id="longitude">114.000</span></div>
      <div class="weidu">纬度: <span id="latitude">36.0000</span></div>
    </div>
  </div>
</template>

<script>
import { initMap } from '../../../2d-3d/cesium/3d-config';

export default {
  name: 'ControlViewer',
  data () {
    return {
      viewer: {}
    };
  },
  mounted () {
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    // 初始化地图
    initMap(this.viewer, 'cesiumViewer', latitude, longitude);
  }
};
</script>

<style lang="less" scoped>
  .control-viewer {
    width: 100%;
    height: 100%;
  }

  #cesiumViewer {
    width: 100%;
    height: 100%;
  }

  .latitude-longitude {
    position: relative;
    bottom: 54px;
    height: 30px;
    width: 280px;
    border-radius: 20px;
    background-color: #272d33;
    margin-left: 20px;
    color: #fff;

    div {
      display: inline-block;
      line-height: 30px;
    }

    .jingdu {
      position: absolute;
      left: 150px;
    }

    .weidu {
      position: absolute;
      left: 20px;
    }
  }
</style>
