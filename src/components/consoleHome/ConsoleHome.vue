<template>
  <div class="console-home">
    <div class="console-header">
      <Header></Header>
    </div>
    <div class="console-aside"><Left></Left></div>
    <div class="console-main"><ControlViewer></ControlViewer></div>
  </div>
</template>

<script>
import Header from './components/Header';
import ControlViewer from './components/ControlViewer';
import Left from './components/left/Left';
export default {
  name: 'ConsoleHome',
  components: {
    Header,
    ControlViewer,
    Left
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
