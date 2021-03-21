<template>
  <div class="user">
    <ul>
      <el-tooltip class="item" effect="dark" content="个人" placement="left">
        <li class="iconfont icon-nav-icon-gerenxiaoxi_active"></li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="消息" placement="left">
        <el-badge :value="12" class="item">
        <li class="iconfont icon-shetuanhuodong_active"></li>
        </el-badge>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出" placement="left">
        <li class="iconfont icon-tuichudenglu"></li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'User'
};
</script>

<style lang="less" scoped>
  .user{
    position: relative;
    width: 100%;
    height: 100%;
    ul{
      position: absolute;
      top: 7px
    }
    ul li{
      line-height: 24px;
      font-size: 24px;
      cursor: pointer;
      margin-left: 3px;
    }
    ul li:hover{
      color: #00BFFF;
    }
  }
</style>
