<template>
  <div class="headerCon">
    <div class="headerTitle">
      <div class="title">智慧农村三维平台</div>
      <div class="trackBar"></div>
      <div class="userInfo">
        <div class="details">
          <el-button @click="exit" size="mini">注销</el-button>
          </div>
          <div class="cancellation">
            <el-button @click="exit" size="mini">注销</el-button>
            <el-button @click="exit" size="mini">注销</el-button>
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
          width: 50%;
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
          width: 50%;
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
