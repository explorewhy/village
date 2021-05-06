<template>
  <div class="toolbar">
    <div :class="display==='vertical'?'btn-group-vertical':'btn-group-horizontal'"
         style="font-size: 0">
      <button type="button" title="双屏对比"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/doubleViewer.png')">
      </button>
      <button type="button" title="地球卷帘"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/shutterView.png')">
      </button>
      <button type="button" title="三角量距" @click="triangleMeasure"
              class="btn btn-sm btn-primary background-color-transparent"
      >
        <img :src="require('../../../../assets/img/toolBar/三角尺2.png')">
      </button>
      <button type="button" title="垂直距离"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/高度.png')">
      </button>
      <button type="button" title="空间距离"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/长度.png')">
      </button>
      <button type="button" title="空间面积"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/面积.png')">
      </button>
      <button type="button" title="通视分析"
              class="btn btn-sm btn-primary background-color-transparent"
      >
        <img :src="require('../../../../assets/img/toolBar/通视.png')">
      </button>
      <button type="button" title="可视域分析"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/可视域.png')">
      </button>
      <button type="button" title="地表透明度"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/透明.png')">
      </button>
      <button type="button" title="地球开关"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/地球.png')">
      </button>
      <button type="button" title="重置地图"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/消除.png')">
      </button>
      <button type="button" title="屏幕截图"
              class="btn btn-sm btn-primary background-color-transparent">
        <img :src="require('../../../../assets/img/toolBar/截图.png')">
      </button>
    </div>
  </div>
</template>

<script>
import cesiumTools from '../../../../../static/cesiumTools';
export default {
  name: 'ToolBar',
  props: {
    viewer: {
      type: Object,
      default: function () {
        return { name: '123' };
      }
    }
  },
  data () {
    return {
      display: 'vertical'
    };
  },
  mounted () {},
  methods: {
    triangleMeasure () {
      // console.log(this.$store.state.controlViewer);
      // eslint-disable-next-line no-undef
      cesiumTools.triangleMeasure(Cesium, this.$store.state.controlViewer);
    }
  }
};
</script>

<style scoped>
  .toolbar {
    position: absolute;
    left: 40px;
    top: 40px;
    z-index: 1;
  }

  .toolbar img, .toolbar span {
    width: 25px;
    height: 25px;
    margin: 5px
  }

  .btn-group-vertical .btn {
    margin: 0;
    padding: 0;
  }

  .btn-group-horizontal .btn {
    margin: 0;
    padding: 0;
  }

  .background-color-transparent {
    background-color: rgba(85, 92, 100, 0.7) !important;
  }
</style>
