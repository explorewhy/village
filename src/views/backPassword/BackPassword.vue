<template>
  <div class="back-password">
    <div class="back-password-title">找回密码</div>
    <!--卡片-->
    <el-card class="card-main" shadow="hover">
      <el-steps :active="active" align-center>
        <el-step title="用户验证" description=""></el-step>
        <el-step title="修改密码" description=""></el-step>
        <el-step title="结果" description=""></el-step>
      </el-steps>
      <!--用户验证-->
      <el-card class="user-card" shadow="hover">
        <el-form v-show="active === 1" :model="verifyUserForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm user-verify" @submit.native.prevent>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="verifyUserForm.username" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-form v-show="active === 2" :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm password-modification">
          <el-form-item label="新密码" prop="firstPassword">
            <el-input v-model="passwordForm.firstPassword" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="secondPassword">
            <el-input v-model="passwordForm.secondPassword" clearable type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="card-btns" v-if="isShowBtns">
          <el-button v-if="backStepIsShow" @click="backStep">上一步</el-button>
          <el-button v-if="nextStepIsShow" @click="subUserForm">下一步</el-button>
        </div>
        <div class="password-modification" v-if="isShowResult">
          <span style="color: #42b883">密码修改成功</span>
        </div>
      </el-card>
    </el-card>
  <!--跳转对话框-->
    <el-dialog
        title="页面跳转"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false">
      <div>即将跳转到登录页面 <span style="color: red">{{skipTime}}</span> s</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="skipLogin">立即跳转</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { verifyUser, changePassword } from '../../network/backPassword';
export default {
  name: 'BackPassword',
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        firstPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        secondPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
      },
      active: 1,
      backStepIsShow: false,
      nextStepIsShow: true,
      isShowBtns: true,
      isShowResult: false,
      verifyUserForm: {
        username: ''
      },
      passwordForm: {
        firstPassword: '',
        secondPassword: ''
      },
      skipTime: 5,
      dialogVisible: false,
      timer: null
    };
  },
  methods: {
    backStep () {
      this.active--;
      this.nextStepIsShow = true;
      if (this.active === 1) {
        this.active = 1;
        this.backStepIsShow = false;
      }
    },
    subUserForm () {
      const _this = this;
      if (this.active === 1) {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            verifyUser(this.verifyUserForm.username).then(data => {
              if (data.meta.status === 200) {
                _this.active++;
                if (this.active !== 1) {
                  this.backStepIsShow = true;
                }
              } else {
                _this.$message.error('用户不存在');
              }
            });
          } else {
            return false;
          }
        });
      } else if (this.active === 2) {
        this.$refs.passwordForm.validate((valid) => {
          if (valid) {
            changePassword(_this.passwordForm.firstPassword).then(data => {
              if (data.meta.status === 200) {
                _this.active++;
                _this.$message.success('密码修改成功,5秒后跳转到登录页');
              } else {
                _this.$message.error('密码修改失败');
              }
            });
            _this.nextStepIsShow = false;
            _this.isShowBtns = false;
            _this.isShowResult = true;
            if (_this.active !== 1) {
              this.backStepIsShow = true;
            }
            _this.dialogVisible = true;
            _this.backTimer();
          } else {
            return false;
          }
        });
      }
    },
    backTimer () {
      const _this = this;
      _this.timer = setInterval(() => {
        _this.skipTime--;
        console.log(_this.skipTime);
        if (_this.skipTime === 0) {
          _this.$router.push('/login');
          clearInterval(_this.timer);
        }
      }, 1000);
    },
    skipLogin () {
      clearInterval(this.timer);
      this.dialogVisible = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="less" scoped>
  .back-password {
    width: 100%;
    height: 100%;
    background-color: #c3d6e8;
  }

  .card-main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 20px;
  }

  .back-password-title {
    height: 10%;
    text-align: center;
    line-height: 96px;
    font-size: 20px;
    font-weight: 700;
  }

  .user-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width: 50%;
    .card-btns {
      position: absolute;
      width: 180px;
      right: 10px;
      bottom: 20px;
    }
  }
  .user-verify{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
  }
  .password-modification{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    text-align: center;
  }
</style>
