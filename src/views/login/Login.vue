<template>
  <div class="login">
    <!--登录盒子-->
    <div class="login-box">
      <!--表单-->
      <el-form :model="formInfo" :rules="rules" ref="loginFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInfo.password" type="password"></el-input>
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
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
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
    }
  }
};
</script>

<style scoped>
  .login {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .login-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid #000;
    border-radius: 10px;
    margin: auto;
    width: 500px;
    height: 300px;
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
</style>
