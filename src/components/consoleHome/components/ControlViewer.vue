<template>
  <div class="control-viewer">
    <div class="tool-bar">
      <tool-bar :toolBarData="toolBarData"
                @showRollerShutter="showRollerShutter"
                @triangulation ='triangulation'
                @areaMeasurement="areaMeasurement"
                @distanceMeasurement = 'distanceMeasurement'
                @screenShot="screenShot">
      </tool-bar>
    </div>
    <div id="cesiumViewer">
      <div id="slider" class="slider" :class="{sliderOn: isActive}"></div>
    </div>
<!--    经纬度-->
    <div class="latitude-longitude">
      <div class="jingdu">经度: <span id="longitude">114.000</span></div>
      <div class="weidu">纬度: <span id="latitude">36.0000</span></div>
    </div>
<!--    地下管线控制面板-->
    <div id="toolbar" v-if="false">
      <table>
        <tbody>
        <tr>
          <td>Translucency enabled</td>
          <td>
            <input type="checkbox" data-bind="checked: translucencyEnabled">
          </td>
        </tr>
        <tr>
          <td>Fade by distance</td>
          <td>
            <input type="checkbox" data-bind="checked: fadeByDistance">
          </td>
        </tr>
        <tr>
          <td>Show vector data</td>
          <td>
            <input type="checkbox" data-bind="checked: showVectorData">
          </td>
        </tr>
        <tr>
          <td>Alpha</td>
          <td>
            <input type="range" min="0.0" max="1.0" step="0.1" data-bind="value: alpha, valueUpdate: 'input'">
            <input type="text" size="5" data-bind="value: alpha">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { initMap } from '../../../2d-3d/cesium/3d-config';

import ToolBar from './toolbar/ToolBar';

import cesiumTools from '../../../../static/cesiumTools';

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
      },
      isActive: false,
      rollerShutterTiles: null
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
    // 卷帘
    showRollerShutter () {
      this.isActive = !this.isActive;
      if (!this.isActive) {
        this.viewer.imageryLayers.remove(this.rollerShutterTiles);
      } else {
        // eslint-disable-next-line no-undef
        this.rollerShutterTiles = cesiumTools.rollerBlind(Cesium, this.viewer, document.getElementById('slider'));
      }
    },
    // 三角测量
    triangulation () {
      // eslint-disable-next-line no-undef
      const measure = new Cesium.Measure(this.viewer);
      measure._drawLayer.entities.removeAll();
      this.isActive = false;
      this.viewer.imageryLayers.remove(this.rollerShutterTiles);
      measure.drawTrianglesMeasureGraphics({ callback: () => { } });
    },
    // 空间距离
    distanceMeasurement () {
      // eslint-disable-next-line no-undef
      const measure = new Cesium.Measure(this.viewer);
      const clampToGround = true;
      measure.drawLineMeasureGraphics({ clampToGround: clampToGround, callback: () => { } });
    },
    // 空间面积
    areaMeasurement () {
      // eslint-disable-next-line no-undef
      const measure = new Cesium.Measure(this.viewer);
      const clampToGround = true;
      measure.drawAreaMeasureGraphics({ clampToGround: clampToGround, callback: () => { } });
    },
    // 屏幕截图
    screenShot () {
      const myCanvas = this.viewer.scene.canvas;
      const imgWidth = 800;
      const myImg = this.$canvas2image.convertToImage(myCanvas, imgWidth, imgWidth * myCanvas.height / myCanvas.width, 'png');
      const loading = document.createElement('a');
      loading.href = myImg.src;
      loading.download = '智慧农村截图';
      loading.click();
    }
  },
  watch: {
    '$store.state.showJWD' (value, oldVal) {
      if (this.$store.state.showJWD) {
        // eslint-disable-next-line no-undef
        cesiumTools.showLatLongLine(Cesium, this.viewer);
      } else {
        this.viewer.entities.removeAll();
      }
    },
    '$store.state.downLine' (value, oldValue) {
      const element = document.getElementById('toolbar');
      if (this.$store.state.downLine) {
        // eslint-disable-next-line no-undef
        cesiumTools.downPipeline(Cesium, this.viewer, element);
      } else {
        this.viewer.entities.removeAll();
      }
    },
    '$store.state.isAddTianDiTuVector' (value, oldValue) {
      // eslint-disable-next-line no-undef
      cesiumTools.tianDiVector(Cesium, this.viewer, this.$store.state.tiandituTk);
    },
    '$store.state.isAddTianDiTuImage' () {
      // eslint-disable-next-line no-undef
      cesiumTools.tianDiImage(Cesium, this.viewer, this.$store.state.tiandituTk);
    },
    '$store.state.isJump' (value, oldValue) {
      const data = this.$store.state.jumpData;
      cesiumTools.jumpTo(this.viewer, data.long, data.lat, data.height);
    }
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
    .slider {
      position: absolute;
      left: 50%;
      top: 0;
      width: 0;
      height: 100%;
      z-index: 9999;
    }
    .sliderOn {
      background-color: #D3D3D3;
      width: 5px;
    }
    .slider:hover {
      cursor: ew-resize;
    }
  }
  .tool-bar{
    position: absolute;
    top: 100px;
    left: 300px;
  }
  #toolbar {
    position: absolute;
    top: 70px;
    right: 16px;
    background: rgba(42, 42, 42, 0.8);
    padding: 4px;
    border-radius: 4px;
  }
  #toolbar input {
    vertical-align: middle;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  #toolbar .header {
    font-weight: bold;
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
