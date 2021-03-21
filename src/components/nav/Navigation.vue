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
      <ul class="tool-box">
        <li>工具</li>
      </ul>
      <div class="user-manage">
        用户管理
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
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
      float: left;
      width: 50%;
      height: 100%;
      background-color:pink;
    }
    .tool-box {
      float: left;
      width: 50%;
      height: 100%;
    }
  }
</style>
