<template>
  <div class="nav">
    <div class="base">
      <ul>
        <li><span></span> 导入数据</li>
      </ul>
    </div>
    <div class="base">
      <ul>
        <li><span></span> 隐藏左侧导航栏</li>
      </ul>
    </div>
    <div class="base">
     <div class="tool-box">
     </div>
      <div class="user-manage">
        <user></user>
      </div>
    </div>
  </div>
</template>

<script>
import User from './components/User';
export default {
  name: 'Navigation',
  components: {
    User
  }
};
</script>

<style lang="less" scoped>
  .nav {
    width: 100%;
    height: 100%;
  }
  .base {
    float: left;
    width: calc(100% / 3);
    height: 100%;
    background-color: #eee;
    box-sizing: border-box;
    border: 3px solid #bab7b7;
    ul>li {
      float: left;
    }
    .user-manage {
      display: inline-block;
      width: 7%;
      height: 100%;
    }
    .tool-box {
      display: inline-block;
      width: calc(93% - 3px);
      height: 100%;
      border-right: solid 3px #bab7b7;
    }
  }
</style>
