<template>
  <div class="headerCon">
    <div class="headerTitle">
      <div class="title">智慧农村三维平台</div>
      <div class="trackBar"></div>
      <div class="userInfo">
        <div class="details">
          <el-dropdown>
            <span class="el-dropdown-link">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid"><span @click="toProfile">个人中心</span></el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-close"><span @click="exit">注销</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
          <div class="cancellation">
            <el-button type="primary" size="mini" @click="toConsoleHome">控制台</el-button>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
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
        width: 75%;
        height: 100%;
        float: left;
        pointer-events: auto;
        border-radius: 0;
        background-image: url('../../assets/imgs/home/kdt1.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .userInfo{
        width: 10%;
        height: 100%;
        float: left;
        text-shadow: none;

        .details{
          width: 40%;
          height: 100%;
          float: left;
          font-size: 14px;

          .el-avatar {
            margin-top: 10px;
            margin-left: 15px;
            cursor: pointer;
          }
        }

        .cancellation{
          float: left;
          width: 60%;
          height: 100%;
          /*margin-left: 5px;*/
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
</style>
