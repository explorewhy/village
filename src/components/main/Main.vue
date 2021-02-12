<template>
  <div class="main">
    <ol-map></ol-map>
  </div>
</template>

<script>
import OlMap from '../../2d-3d/openlarys/OlMap';
export default {
  name: 'Main',
  components: { OlMap }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
