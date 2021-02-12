<template>
  <div class="olview" id="mapViewer"></div>
</template>

<script>
import { Map, View } from 'ol';
import mapconfig from './mapConfig';
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
        layers: mapconfig.streetap(),
        view: new View({
          projection: 'EPSG:4326',
          center: [mapconfig.x, mapconfig.y],
          zoom: mapconfig.zoom
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
