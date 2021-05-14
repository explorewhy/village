<template>
  <div class="login">
  <!--顶部联系管理员-->
    <div class="login-top-right">
      <el-button size="mini" round type="primary" @click="open">报BUG</el-button>
      <el-button size="mini" round type="primary" @click="dialog = true">联系我</el-button>
    </div>
<!--    <el-tooltip  class="item" effect="dark" content="点我刷新" placement="left">-->
<!--      <div class="mouth" @click="refresh"></div>-->
<!--    </el-tooltip>-->
    <!--登录盒子-->
    <div class="login-box">
      <div class="login-title"><span>智慧农村管理平台</span></div>
      <!--表单-->
      <el-form :model="formInfo" :rules="rules" ref="loginFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formInfo.username" prefix-icon="iconfont icon-wode"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInfo.password" type="password" prefix-icon="iconfont icon-password"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮-->
      <div class="btns">
        <el-button size="mini" type="info" @click="loginFormReset">重置</el-button>
        <el-button size="mini" type="primary" @click="userLogin">登录</el-button>
      </div>
      <div class="forgot-password">
        <el-button type="warning" size="mini" @click="backPassword">忘记密码</el-button>
      </div>
    </div>
<!--左侧弹框-->
    <el-drawer
      title="联系我:"
      direction="ltr"
      :visible.sync="dialog"
      custom-class="demo-drawer"
      ref="drawer"
      size= 20%
    >
      <div class="demo-drawer__content">
        <el-table
          :data="callMeTable"
          style="width: 100%"
          stripe>
          <el-table-column
            prop="type"
            label="联系类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="value"
            label="联系方式"
            width="180">
          </el-table-column>
        </el-table>
        <div class="drawer-thanks">非常感谢您的支持</div>
      </div>
    </el-drawer>
<!--底部版权-->
    <div class="copy-right">
      <div> CopyRight © 2021 版权归河北工程大学地球科学与工程学院 <strong>地理信息科学专业</strong> 所有</div>
    </div>
  </div>
</template>

<script>
import { initial, getMasterInfo, login } from '../../network/login/login';

export default {
  name: 'Login',
  data () {
    return {
      dialog: false,
      callMeTable: [
        {
          type: 'QQ',
          value: '485417456'
        },
        {
          type: '电话',
          value: '139xxxxxxxx(微信同号)'
        },
        {
          type: '邮箱',
          value: 'xxxxxxxx@outlook.com'
        }
      ],
      formInfo: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    const _this = this;
    initial().then(data => {
      try {
        if (data.meta.status !== 200) {
          _this.$message.error('服务器连接失败, 请联系管理员');
        }
      } catch (e) {
        _this.$message.error('服务器连接失败, 请联系管理员');
      }
    });
    getMasterInfo().then(data => {
      if (data.meta.status === 200) {
        _this.callMeTable = data.data;
      } else {
        _this.$message.warning('服务器连接失败, 请联系管理员');
      }
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    /**
     * 用户登录
     */
    userLogin () {
      const _this = this;
      login(_this.formInfo.username, _this.formInfo.password).then(data => {
        console.log(data);
        if (data.meta.status === 200) {
          _this.$message.success('登陆成功');
          window.sessionStorage.setItem('token', data.data.token);
          window.sessionStorage.setItem('roleType', data.data.roleType);
          _this.$router.push('/home');
        } else if (data.meta.status === 400) {
          _this.$message.error('用户名或密码错误,请重新输入');
        } else {
          _this.$message.warning('服务器连接失败, 请联系管理员');
        }
      });
    },
    /**
     * 表单重置
     */
    loginFormReset () {
      this.$refs.loginFormRef.resetFields();
    },
    /**
     * 进入找回密码路由
     */
    backPassword () {
      this.$router.push('/backpassword');
    },
    /**
     * 关闭右侧提示框
     */
    cancelForm () {

    },
    /**
     * 打开左侧提示框
     */
    open () {
      this.$notify({
        title: '您好:',
        message: '请您联系站长，感谢您的反馈',
        offset: 100,
        type: 'success'
      });
    },
    /**
     * 刷新界面
     */
    refresh () {
      window.location.reload();
    }
  }
};
</script>

<style lang="less" scoped>
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/imgs/login.jpg');
    /*background-repeat: no-repeat;*/
    background-size: cover;
    background-position: center;
  }
  .login-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    opacity: 0.9;
    border: 1px solid #000;
    border-radius: 10px;
    margin: auto;
    width: 500px;
    height: 300px;
  }
  .login-title {
    padding-top: 20px;
    box-sizing: border-box;
    text-align: center;
  }
  .login-top-right {
    position: absolute;
    top: 20px;
    right: 50px;
    padding: 5px 5px;
    color: #000;
    background: #fff;
    border-radius: 20px;
    transition: 500ms;
  }
  .login-top-right:hover{
    transform: scale(1.2, 1.2);
  }
  .mouth {
    position: absolute;
    top: 69px;
    right: 93px;
    width: 70px;
    height: 9px;
    background-color: #fff;
    border-radius: 20px;
    transition: 700ms;
  }
  .mouth:hover{
    cursor: pointer;
    height: 30px;
    background-color: #30c7cb;
    border-radius: 100%;
  }
  .forgot-password {
    position: absolute;
    bottom: 20px;
    right: 30px;
  }
  .btns {
    position: absolute;
    right: 0;
    margin-right: 30px;
  }
  .el-form {
    margin-top: 60px;
  }
  .el-form-item {
    padding: 0 30px 0 0;
  }
  .el-form[data-v-2529d779] {
    margin-top: 35px;
  }
  .drawer-thanks {
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }
  .copy-right {
    position: absolute;
    right: 10px;
    cursor: pointer;
    bottom: 15px;
    color: #eee;
    transition: 700ms;
  }
  .copy-right:hover {
    bottom: 5px;
    font-size: 17px;
  }
</style>
