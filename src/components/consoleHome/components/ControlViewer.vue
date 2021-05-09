<template>
  <div class="control-viewer">
    <div class="tool-bar">
      <tool-bar :viewer="viewer"></tool-bar>
    </div>
    <div id="cesiumViewer"></div>
    <div class="latitude-longitude">
      <div class="jingdu">经度: <span id="longitude">114.000</span></div>
      <div class="weidu">纬度: <span id="latitude">36.0000</span></div>
    </div>
  </div>
</template>

<script>
import { initMap } from '../../../2d-3d/cesium/3d-config';
import ToolBar from './toolbar/ToolBar';

export default {
  name: 'ControlViewer',
  components: {
    ToolBar
  },
  data () {
    return {
      viewer: {}
    };
  },
  mounted () {
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    // 初始化地图
    this.viewer = initMap(this.viewer, 'cesiumViewer', latitude, longitude);
    this.$store.commit('addControlViewer', { viewer: this.viewer });
  },
  methods: {
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
  .tool-bar{
    position: absolute;
    top: 100px;
    left: 300px;
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
