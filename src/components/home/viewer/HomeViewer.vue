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
import cesiumTools from '../../../../static/cesiumTools'

  export default {
    name: 'CesiumViewer',
    data () {
      return {
        viewer: {},
        options: [{
          value: 'default',
          label: '全国geoJson'
        },{
          value: 'hebei',
          label: '河北省geoJson'
        },{
          value: 'yanggu',
          label: '阳谷县模型'
        }],
        geoJsonType: '',
        geoJsonDataSource: null
      };
    },
    created () {
    },
    mounted () {
      const latitude = document.getElementById('latitude');
      const longitude = document.getElementById('longitude');
      // 初始化地图
      this.viewer = initMap(this.viewer, 'cesiumViewer', latitude, longitude);
      // cesiumTools.offsetByDistance(Cesium, this.viewer);
    },
    methods: {
      // 获取经纬度坐标
      getCoordinates () {
        const _this = this;
        const canvas = _this.viewer.scene.canvas;
        const ellipsoid = _this.viewer.scene.globe.ellipsoid;
        const handler = new Cesium.ScreenSpaceEventHandler(canvas);
        handler.setInputAction(function (movement) {
          // 捕获椭球体，将笛卡尔二维坐标转为椭球体坐的笛卡尔三维坐标，返回球体表面的点
          const cartesian = _this.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
          if (cartesian) {
            // 将笛卡尔三维坐标转为底图坐标（弧度）
            const cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
            // 将地图坐标转为十进制
            document.getElementById('latitude').innerHTML = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
            document.getElementById('longitude').innerHTML = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      },
      // 添加默认geojson数据
      async addDefaultGeoJson () {
        const _this = this;
        this.viewer.dataSources.remove(this.geoJsonDataSource);
        this.geoJsonDataSource = await Cesium.GeoJsonDataSource.load(require('../../../assets/geojson/China.json'), {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BLUE.withAlpha(0.3), //注意：颜色必须大写，即不能为blue
          strokeWidth: 5
        });
        await this.viewer.dataSources.add(this.geoJsonDataSource);
      },
      // 添加自定义geojson数据
      async addCustomGeoJson () {
        this.viewer.dataSources.remove(this.geoJsonDataSource);
        this.geoJsonDataSource = await Cesium.GeoJsonDataSource.load(require('../../../assets/geojson/HeBei.json'), {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BLUE.withAlpha(0.3),
          strokeWidth: 5
        });
        await this.viewer.dataSources.add(this.geoJsonDataSource);
        let entities = this.geoJsonDataSource.entities.values;
        let colorHash = {};
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          let name = entity.name;
          let color = colorHash[name];
          if (!color) {
            color = Cesium.Color.fromRandom({
              alpha: 1.0
            });
            colorHash[name] = color;
          }
          entity.polygon.material = color;
          entity.polygon.outline = false;
          entity.polygon.extrudedHeight = entity.properties.childrenNum * 1000;
        }
      },
      // 添加阳谷县模型
      async addYangGuGeoJson () {
        this.viewer.dataSources.remove(this.geoJsonDataSource);
        this.geoJsonDataSource = await Cesium.GeoJsonDataSource.load(require('../../../assets/geojson/yanggu.json'), {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BLUE.withAlpha(0.3), //注意：颜色必须大写，即不能为blue
          strokeWidth: 5
        });
        await this.viewer.dataSources.add(this.geoJsonDataSource);

        let villageModel = new Cesium.Cesium3DTileset ({
          url: 'http://localhost:5000/village/tileset.json'
          // url: require('../../../../static/source/tileset.json')
        });
        this.viewer.scene.primitives.add(villageModel);
        this.viewer.flyTo(villageModel)
      },
      // geoJson样式
      geoJsonStyle () {
        if (this.geoJsonType === 'default') {
          this.addDefaultGeoJson();
        } else if (this.geoJsonType === 'hebei') {
          this.addCustomGeoJson();
        } else {
          this.addYangGuGeoJson();
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
