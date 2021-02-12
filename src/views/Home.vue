<template>
<div class="home">
<!--顶部-->
  <div class="home-top">
    <Navigation></Navigation>
  </div>
<!--主体-->
  <div class="home-main">
    <Main></Main>
  </div>
<!--底部-->
<!--  <Footer></Footer>-->
</div>
</template>

<script>
import Navigation from '../components/nav/Navigation';
import Main from '../components/main/Main';
// import Footer from '../components/footer/Footer';
export default {
  name: 'Home',
  components: {
    // Footer,
    Main,
    Navigation
  }
};
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  .home-top {
    height: 10%;
    background-color: pink;
  }
  .home-main {
    height: 90%;
  }
</style>
