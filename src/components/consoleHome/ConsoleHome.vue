<template>
  <div class="console-home">
    <div class="console-header">
      <Header></Header>
    </div>
    <div class="console-aside">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width: 292px">
        <el-tab-pane label="数据管理" name="first">
        </el-tab-pane>
        <el-tab-pane label="功能列表" name="second">
        </el-tab-pane>
        <el-tab-pane label="地图操作" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="console-main"><ControlViewer></ControlViewer></div>
  </div>
</template>

<script>
import Header from './components/Header';
import ControlViewer from './components/ControlViewer';
export default {
  name: 'ConsoleHome',
  components: {
    Header,
    ControlViewer
  },
  data () {
    return {
      activeName: 'first',
      dataTree: [],
      funTree: [],
      mapTree: []
    };
  },
  methods: {
    handleClick () {
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style scoped>
.console-home {
  width: 100%;
  height: 100%;
}
.console-header{
  width: 100%;
  height: 60px;
}
.console-aside {
  float: left;
  width: 15.5%;
  height: calc(100% - 60px);
}
.console-main{
  float: left;
  padding: 0;
  width: 84.5%;
  height: calc(100% - 60px);
  overflow: hidden;
}
</style>
