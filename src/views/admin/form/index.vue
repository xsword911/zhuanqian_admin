<template>
  <div class="form-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwd2">
            <el-input v-model="ruleForm.pwd2" clearable></el-input>
          </el-form-item>
<!--          <el-form-item label="邀请码" prop="upperCode">
            <el-input v-model="ruleForm.upperCode" clearable></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm"
              >立即注册
            </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "Form",
  data() {
    return {
      ruleForm: {
        account: "",  //账号
        pwd: "",   //密码
        pwd2: "",  //确认密码
        upperCode: "",  //邀请码
        type: 1,  //账户类型 0:普通用户; 1:管理员
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度在 3 到 12 个字符", trigger: "blur" },
        ],
        pwd2: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度在 3 到 12 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //提交注册
    submitForm() {
      if(this.ruleForm.pwd != this.ruleForm.pwd2){
        this.$message.error('二次密码输入不一致');
        return;
      }
      api.register(this.ruleForm, (res)=>{
          let code = api.getCode(res);
          let msg = api.getMsg(res);
          if(code == 0){
            this.$message({ message: '注册成功', type: 'success'});
            this.resetForm('ruleForm');
          }
          else this.$message.error(msg);
      });
    },
    //清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
