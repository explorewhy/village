<template>
  <div class="footerCon">
    <div class="footerTitle"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
  .footerCon {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #000000;
    overflow: hidden;
    position: fixed;
    bottom: 0px;
    left: 0px;

    .footerTitle {
      width: 100%;
      height: 30px;
      line-height: 30px;
      position: relative;
      color: #ffffff;
      padding: 0 10px;
      background-size: 100% 100%;
      font-size: 14px;
      letter-spacing: 5px;
      font-weight: 800;
      text-shadow: 3px 3px 0px #1a68b9;
      background-image: url('../../../assets/imgs/home/kdt.svg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
