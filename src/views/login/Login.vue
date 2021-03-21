<template>
  <div class="login">
  <!--顶部联系管理员-->
    <div class="login-top-right">
      <el-button size="mini" round type="primary" @click="open">报BUG</el-button>
      <el-button size="mini" round type="primary" @click="dialog = true">联系我</el-button>
    </div>
    <div class="mouth"></div>
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
  </div>
</template>

<script>
import { initial } from '../../network/login/login';

export default {
  name: 'Login',
  data () {
    return {
      dialog: false,
      callMeTable: null,
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
    initial().then(data => {
      this.callMeTable = data.data;
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    /**
     * 用户登录
     */
    userLogin () {
      if (this.formInfo.username === 'admin' && this.formInfo.password === '123456') {
        this.$router.push('/home');
        this.$message.success('登录成功');
      } else {
        this.$message.error('用户名或密码错误');
      }
    },
    /**
     * 重置表单
     */
    loginFormReset () {
      this.$refs.loginFormRef.resetFields();
    },
    /**
     * 找回密码
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
    background-repeat: no-repeat;
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
  }
  .mouth {
    position: absolute;
    top: 69px;
    right: 103px;
    width: 50px;
    height: 9px;
    background-color: #fff;
    border-radius: 20px;
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
</style>
