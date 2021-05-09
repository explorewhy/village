<template>
  <div class="home-viewer">
    <div id="cesiumViewer"></div>
    <div class="latitude-longitude">
      <div class="jingdu">经度: <span id="longitude">114.000</span></div>
      <div class="weidu">纬度: <span id="latitude">36.0000</span></div>
    </div>
    <div class="geoJsonSelector">
      <el-select v-model="geoJsonType" placeholder="自定义" @change="geoJsonStyle">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>/* eslint-disable */
  import { initMap } from '../../../2d-3d/cesium/3d-config';

  export default {
    name: 'CesiumViewer',
    data () {
      return {
        viewer: {},
        options: [{
          value: 'default',
          label: '默认显示'
        },{
          value: 'custom',
          label: '自定义显示'
        }],
        geoJsonType: '',
        geoJsonData: null
      };
    },
    created () {
    },
    mounted () {
      const latitude = document.getElementById('latitude');
      const longitude = document.getElementById('longitude');
      // 初始化地图
      this.viewer = initMap(this.viewer, 'cesiumViewer', latitude, longitude);
      // this.addDefaultGeoJson();
      // this.addCustomGeoJson();
    },
    methods: {
      // 获取经纬度坐标
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
      },
      // 添加默认geojson数据
      async addDefaultGeoJson () {
        let res = await Cesium.GeoJsonDataSource.load(require('../../../assets/geojson/China.json'), {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BLUE.withAlpha(0.3), //注意：颜色必须大写，即不能为blue
          strokeWidth: 5
        });
        await this.viewer.dataSources.add(res);
      },
      // 添加自定义geojson数据
      async addCustomGeoJson () {
        // Cesium.Math.setRandomNumberSeed(0);
        const res = await Cesium.GeoJsonDataSource.load(require('../../../assets/geojson/SiChuan.json'), {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BLUE.withAlpha(0.3),
          strokeWidth: 5
        });
        await this.viewer.dataSources.add(res);
        var entities = res.entities.values;
        var colorHash = {};
        console.log(entities.length);
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          var name = entity.name;
          var color = colorHash[name];
          if (!color) {
            color = Cesium.Color.fromRandom({
              alpha: 1.0
            });
            colorHash[name] = color;
          }
          entity.polygon.material = color;
          entity.polygon.outline = false;
          entity.polygon.extrudedHeight = entity.properties.childrenNum * 5000;
        }
      },
      // geoJson样式
      geoJsonStyle () {
        switch (this.geoJsonType) {
          case 'default':
            this.addDefaultGeoJson();
            break;
          case 'custom':
            this.addCustomGeoJson();
            break;
        }
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
  .geoJsonSelector {
    position: absolute;
    right: 30px;
    top: 100px;
  }

  /deep/ .el-select,
  /deep/ .el-input,
  /deep/ .el-input__inner{
    background-color:#555c64 ;
    color:#fff;
    text-align: center;
    height: 40px;
  }

</style>
