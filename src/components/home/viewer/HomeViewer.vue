<template>
  <div class="home-viewer">
    <div id="cesiumViewer"></div>
    <div class="latitude-longitude">
      <div class="jingdu">经度: <span id="longitude">114.000</span></div>
      <div class="weidu">纬度: <span id="latitude">36.0000</span></div>
    </div>
  </div>
</template>

<script>/* eslint-disable */
  import { initMap } from '../../../2d-3d/cesium/3d-config';

  export default {
    name: 'CesiumViewer',
    data () {
      return {
        viewer: {}
      };
    },
    created () {
    },
    mounted () {
      const latitude = document.getElementById('latitude');
      const longitude = document.getElementById('longitude');
      // 初始化地图
      initMap(this.viewer, 'cesiumViewer', latitude, longitude);
      // this.getCoordinates();
    },
    methods: {
      getCoordinates () {
        const that = this;
        const canvas = that.viewer.scene.canvas;
        const ellipsoid = that.viewer.scene.globe.ellipsoid;
        const handler = new Cesium.ScreenSpaceEventHandler(canvas);
        handler.setInputAction(function (movement) {
          // 捕获椭球体，将笛卡尔二维坐标转为椭球体坐的笛卡尔三维坐标，返回球体表面的点
          const cartesian = that.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
          if (cartesian) {
            // 将笛卡尔三维坐标转为底图坐标（弧度）
            const cartographic = that.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
            // 将地图坐标转为十进制
            document.getElementById('latitude').innerHTML = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
            document.getElementById('longitude').innerHTML = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }
    }
  };
</script>

<style lang="less" scoped>
  .home-viewer {
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
    width: 260px;
    border-radius: 20px;
    background-color: #272d33;
    margin-left: 20px;
    div {
      display: inline-block;
      line-height: 30px;
    }
    .jingdu {
      position: absolute;
      left: 150px;
    }
    .weidu{
      position: absolute;
      left: 20px;
    }
  }
</style>
