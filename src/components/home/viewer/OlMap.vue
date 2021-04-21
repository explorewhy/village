<template>
  <div class="olview" id="mapViewer"></div>
</template>

<script>
import { Map, View } from 'ol';
import config from '../../../2d-3d/openlarys/2d-config';
export default {
  name: 'OlMap',
  data () {
    return {
      map: null
    };
  },
  mounted () {
    this.initMap();
  },
  methods: {
    initMap () {
      const mapViewer = document.getElementById('mapViewer');
      this.map = new Map({
        target: mapViewer,
        layers: config.streetap(),
        view: new View({
          projection: 'EPSG:4326',
          center: [config.x, config.y],
          zoom: config.zoom
        })
      });
    }
  }
};
</script>

<style scoped>
  .olview {
    width: 100%;
    height: 100%;
  }
</style>
