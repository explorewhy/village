<template>
  <div class="console-left">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="功能列表" name="first"><function-menu></function-menu></el-tab-pane>
      <el-tab-pane label="地图操作" name="second"><map-menu></map-menu></el-tab-pane>
      <el-tab-pane label="数据漫游" name="third"><data-menu></data-menu></el-tab-pane>
      <el-tab-pane label="其他功能" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataMenu from './DataMenu';
import FunctionMenu from './FunctionMenu';
import MapMenu from './MapMenu';
export default {
  name: 'Left',
  components: {
    DataMenu,
    FunctionMenu,
    MapMenu
  },
  data () {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.console-left{
  width: 100%;
  height: 100%;
  background-color: #545c64;
}
.el-tabs--top {
  background-color:#fff;
}
.el-tabs--top >>> .el-tabs__header {
  margin: 0;
}
</style>
