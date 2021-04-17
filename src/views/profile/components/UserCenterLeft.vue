<template>
  <el-aside width="220px">
    <el-row class="hang hangbackground">
      <el-col :span="7">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
      </el-col>
      <el-col :span="17">
        <span class="userName">用户名</span>
      </el-col>
    </el-row>
    <el-row class="hang">
      <p class="tltle">消息中心</p>
      <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo myMenu"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" disabled>
          <i class="el-icon-message-solid"></i>
          <span>我的消息</span>
        </el-menu-item>
        <el-menu-item index="2" disabled>
          <i class="el-icon-thumb"></i>
          <span slot="title">通知设置</span>
        </el-menu-item>
      </el-menu>
    </el-row>
    <el-row class="hang">
      <p class="tltle">基础设置</p>
      <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo myMenu"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="/profile/pro-accountInfo">
          <i class="el-icon-user-solid"></i>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/profile/pro-changePassword">
          <i class="el-icon-key"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-message"></i>
          <span slot="title">邮箱管理</span>
        </el-menu-item>
      </el-menu>
    </el-row>
    <el-row class="hang">
      <p class="tltle">安全设置</p>
      <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo myMenu"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" disabled>
          <i class="el-icon-time"></i>
          <span slot="title">登录历史</span>
        </el-menu-item>
      </el-menu>
    </el-row>
    <el-row class="hang">
      <p class="tltle">数据管理</p>
      <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo myMenu"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" disabled>
          <i class="el-icon-pie-chart"></i>
          <span slot="title">仓库空间信息</span>
        </el-menu-item>
        <el-menu-item index="1" disabled>
          <i class="el-icon-collection"></i>
          <span slot="title">私有仓库成员</span>
        </el-menu-item>
        <el-menu-item index="1" disabled>
          <i class="el-icon-set-up"></i>
          <span slot="title">代码风格</span>
        </el-menu-item>
      </el-menu>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: 'userCenterLeft',
  data () {
    return {
      // 用户头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
  .el-aside {
    border: 1px solid #dadada;
    text-align: left;
    overflow: hidden;
    border-radius: 5px;

    .hang {
      border-bottom: 1px solid #d6d6d6e0;
      padding: 10px 0 10px 15px;

      .userName {
        line-height: 53px;
        font-size: 16px;
      }

      .tltle {
        font-weight: 500;
        font-size: 14px;
      }
    }

    .hangbackground {
      background: #f8f8f8;
    }
  }
</style>
<style scoped>
  .myMenu >>> .el-menu-item {
    font-size: 12px;
    color: #6c6c6d;
    padding: 0 0 !important;
  }

  .myMenu >>> .el-menu-item, .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
</style>
