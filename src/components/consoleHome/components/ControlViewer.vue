<template>
  <div class="control-viewer">
    <div class="tool-bar">
      <tool-bar :toolBarData="toolBarData"
                @showRollerShutter="showRollerShutter"
                @triangulation ='triangulation'
                @areaMeasurement="areaMeasurement"
                @distanceMeasurement = 'distanceMeasurement'
                @screenShot="screenShot"
                @showLatLog="showLatLog">
      </tool-bar>
    </div>
    <div id="cesiumViewer">
      <div id="slider" class="slider" :class="{sliderOn: isActive}"></div>
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
      this.isActive = true;
      // eslint-disable-next-line no-undef
      this.rollerShutterTiles = cesiumTools.rollerBlind(Cesium, this.viewer, document.getElementById('slider'));
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
    },
    // 显示经纬度
    showLatLog () {
      // eslint-disable-next-line no-undef
      cesiumTools.showLatLongLine(Cesium, this.viewer);
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
