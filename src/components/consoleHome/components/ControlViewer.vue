<template>
  <div class="control-viewer">
    <div class="tool-bar">
      <tool-bar :toolBarData="toolBarData"></tool-bar>
    </div>
    <div id="cesiumViewer">
      <div id="slider"></div>
    </div>
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
      viewer: {},
      toolBarData: {
        slider: {}
      }
    };
  },
  created () {
  },
  mounted () {
    // 初始化地图
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    this.viewer = initMap(this.viewer, 'cesiumViewer', latitude, longitude);
    this.toolBarData.slider = document.getElementById('slider');
    const homeViewer = this.viewer;
    this.$store.commit('addControlViewer', { homeViewer });
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
    position: relative;
    width: 100%;
    height: 100%;
    #slider {
      position: absolute;
      left: 50%;
      top: 0;
      background-color: #D3D3D3;
      width: 5px;
      height: 100%;
      z-index: 9999;
    }
    #slider:hover {
      cursor: ew-resize;
    }
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
