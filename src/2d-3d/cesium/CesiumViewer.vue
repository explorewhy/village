<template>
  <div id="cesiumViewer"></div>
</template>

<script>
/* eslint-disable */
import { initMap } from './3d-config'
export default {
  name: 'CesiumViewer',
  data () {
    return {
      viewer: {}
    };
  },
  mounted () {
    // 初始化地图
    initMap(this.viewer, 'cesiumViewer');
  },
  methods: {
  }
};
</script>

<style scoped>
  #cesiumViewer {
    width: 100%;
    height: 100%;
  }
</style>
