<template>
<div class="home">
<!--顶部-->
  <div class="home-top">
    <Navigation></Navigation>
  </div>
<!--主体-->
  <div class="home-main">
    <div class="home-main-aside">
      <Left></Left>
    </div>
    <div class="home-map">
      <Main></Main>
    </div>
  </div>
<!--底部-->
<!--  <Footer></Footer>-->
</div>
</template>

<script>
import Navigation from '../components/nav/Navigation';
import Main from '../components/main/Main';
import Left from '../components/main/Left';
// import Footer from '../components/footer/Footer';
export default {
  name: 'Home',
  components: {
    Left,
    // Footer,
    Main,
    Navigation
  },
  data () {
    return {
      isFold: true
    };
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  .home-top {
    height: 10%;
    background-color: pink;
  }
  .home-main {
    position: relative;
    height: 90%;
    background-color: #fff;
    .home-main-aside {
      position: absolute;
      width: 200px;
      top: 100px;
      z-index: 999;
    }
    .home-map {
      width: 100%;
      height: 100%;
    }
  }
  .item {
    border-bottom: 1px solid #000;
    padding-bottom: 1px;
  }
</style>
