<template>
  <div class="personalSettings">
    <Header></Header>
    <el-container>
      <UserCenterLeft></UserCenterLeft>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header';
import UserCenterLeft from './components/UserCenterLeft';

export default {
  name: 'personalSettings',
  data: function () {
    return {
    };
  },
  components: {
    Header: Header,
    UserCenterLeft: UserCenterLeft
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .personalSettings {
    padding: 90px 30px 30px;
    width: 70%;
    position: absolute;
    left: 15%;
    min-width: 500px;

    .el-main {
      background-color: #ffffff;
      padding: 0 20px;

      .myCard {
        border: none !important;
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    }
  }
</style>

<style scoped>
  .myCard >>> .el-card__header {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }

  .myCard >>> .el-card__body {
    width: 38%;
    min-width: 300px;
  }

  .myForm >>> .el-form-item {
    margin-bottom: 15px;
  }
</style>
