<template>
  <div class="headerCon">
    <div class="headerTitle">
      <div class="title">智慧农村三维平台</div>
      <div class="trackBar"></div>
      <el-button type="primary" size="mini" @click="toHome">首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  mounted () {
  },
  methods: {
    toHome () {
      this.$router.push('/home');
    }
  }
};
</script>
<style lang="less" scoped="scoped">
  .headerCon {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #000000;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;

    .headerTitle {
      width: 100%;
      height: 60px;
      line-height: 60px;
      color: #ffffff;
      padding: 0 10px;
      font-size: 24px;
      letter-spacing: 5px;
      font-weight: 800;
      text-shadow: 3px 3px 0 #1a68b9;

      .title{
        width: 15%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        float: left;
      }

      .trackBar{
        width: 80%;
        height: 100%;
        float: left;
        pointer-events: auto;
        border-radius: 0;
        background-image: url('../../../assets/imgs/home/kdt1.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
