<template>
  <el-card class="box-card myCard">
    <div slot="header" class="clearfix">
      <span>账号信息</span>
    </div>
    <div>
      <el-form :model="accountInformationForm" :label-position="labelPosition" status-icon ref="accountInformationForm" label-width="85px"
               class="demo-accountInformationForm">
        <el-form-item label="账号：">
          <el-input
              v-model="accountInformationForm.account"
              :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="accountInformationForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="accountInformationForm.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出生日期：">
          <el-input
              v-model="accountInformationForm.birthday"
              :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input
              v-model="accountInformationForm.idNumber"
              :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      labelPosition: 'left',
      accountInformationForm: {
        account: '',
        name: '',
        sex: '',
        birthday: '',
        idNumber: ''
      }
    };
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
</style>
