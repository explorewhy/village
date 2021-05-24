<template>
  <div class="data-menu">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>三维数据</span>
        </template>
        <el-menu-item index="1-1" @click="addYangGu">阳谷县</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'DataMenu',
  data () {
    return {};
  },
  methods: {
    addYangGu () {
      this.$store.state.isAddYangGu3DTiles = !this.$store.state.isAddYangGu3DTiles;
    }
  }
};
</script>

<style scoped>
.data-menu{
  width: 100%;
  height: 100%;
}
.el-menu{
  border-right: 0;
}
</style>
