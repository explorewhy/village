<template>
<div>
<!--顶部-->
  <Navigation></Navigation>
<!--主体-->
  <Main></Main>
<!--底部-->
  <Footer></Footer>
</div>
</template>

<script>
import Navigation from '../components/nav/Navigation';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';
export default {
  name: 'Home',
  components: {
    Footer,
    Main,
    Navigation
  }
};
</script>

<style scoped>

</style>
