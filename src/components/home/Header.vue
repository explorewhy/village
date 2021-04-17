<template>
  <div class="headerCon">
    <div class="headerTitle">
      <div class="title">智慧农村三维平台</div>
      <div class="trackBar"></div>
      <div class="userInfo">
        <div class="details">
          <el-avatar
            :size="30"
            :src="circleUrl"
            style="position: relative;top: 8px;"
          ></el-avatar>
          <span class="userName" id="userName">请登录</span>
          <el-dropdown class="userName">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-setting">
                  <el-button type="text" @click="toProfile">个人中心</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="cancellation">
            <img
              @click="toConsoleHome"
              src="../../assets/img/home/right.png"
              width="30px"
              height="30px"
            />
            <el-button @click="exit" title="退出登录" type="text" class="exit">注销</el-button>
          </div>
      </div>
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
    toProfile () {
      this.$router.push('/profile/pro-accountInfo');
    },
    toConsoleHome () {
      this.$router.push('/consoleHome');
    },
    exit () {
      this.$router.push('/login');
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
        width: 70%;
        height: 100%;
        float: left;
        pointer-events: auto;
        border-radius: 0;
        background-image: url('../../assets/imgs/home/kdt1.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .userInfo{
        width: 12%;
        height: 100%;
        float: left;
        text-shadow: none;
        font-size: 18px;
        padding: 0 0 0 15px;

        .details{
          width: 62%;
          height: 100%;
          float: left;

          .userName {
            font-size: 16px;
            letter-spacing: 0;
            font-weight: 100;
            color: #fff;
          }
        }

        .cancellation{
          width: 38%;
          height: 100%;
          color: #fff;
          float: left;
          cursor: pointer;

          .exit{
            color: #ffffff;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
