<template>
  <el-card class="box-card myCard">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <div>
      <el-form :model="changePasswordForm" :label-position="labelPosition" status-icon :rules="rules"
               ref="changePasswordRef" label-width="80px"
               class="demo-ruleForm myForm">
        <el-form-item label="原始密码" prop="prePassword">
          <el-input type="password" v-model="changePasswordForm.prePassword" autocomplete="off"
                    placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="changePasswordForm.newPassword" autocomplete="off"
                    placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="changePasswordForm.confirmPassword" autocomplete="off"
                    placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'changePassword',
  data: function () {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.changePasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else if (this.changePasswordForm.newPassword === this.changePasswordForm.prePassword) {
        callback(new Error('新密码不能跟旧密码相同'));
      } else {
        callback();
      }
    };

    return {
      // 对齐方式
      labelPosition: 'left',
      changePasswordForm: {
        prePassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        prePassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm () {
    },
    // 重置表单
    resetForm () {
      this.$refs.changePasswordRef.resetFields();
    }
  }
};
</script>

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
    margin-bottom: 30px;
  }
</style>
