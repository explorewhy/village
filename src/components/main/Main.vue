<template>
  <div class="main">
    <div class="right-toole">
      <el-button style="cursor: not-allowed" type="primary" size="mini" @click="mapSwitch">2D</el-button>
    </div>
<!--    <ol-map v-show="mapType"></ol-map>-->
<!--    <cesium-viewer v-show="!mapType"></cesium-viewer>-->
    <cesium-viewer></cesium-viewer>
  </div>
</template>

<script>
// import OlMap from '../../2d-3d/openlarys/OlMap';
import CesiumViewer from '../../2d-3d/cesium/CesiumViewer';

export default {
  name: 'Main',
  components: {
    // OlMap,
    CesiumViewer
  },
  data () {
    return {
      mapType: true
    };
  },
  methods: {
    mapSwitch () {
      this.mapType = !this.mapType;
    }
  }
};
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }
  .right-toole {
    position: absolute;
    right: 20px;
    top: 250px;
    height: 300px;
    background-color: pink;
    z-index: 9;
  }
</style>
