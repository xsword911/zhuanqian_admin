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
          <el-form-item label="用户id" prop="uid">
            <el-input v-model="ruleForm.uid" clearable placeholder="请输入用户id"></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="account">
            <el-input v-model="ruleForm.account" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="金额" prop="money">
            <el-input type="text" v-model="ruleForm.money" clearable placeholder="请输入金额" :change="check()">></el-input>
          </el-form-item>

          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="类型" clearable>
              <el-option-group
                v-for="group in type"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="备注" prop="desc">
            <el-input v-model="ruleForm.desc" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm"
              >确定
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
import storage from "@/api/storage.js";
export default {
  // name: "Form",
  data() {
    return {
      type: [{
        type: [{
          value: 10,
          label: '加款'
        },{
          value: 104,
          label: '扣款'
        }]
      }],

      ruleForm: {
        uid: '',
        money: '',
        type: null,
        desc: '',
        admin: ''
      },
      rules: {
        // uid: [{ required: true, message: "请输入用户id", trigger: "blur" },],
        money: [{ required: true, message: "请输入金额",  trigger: "blur" },],
        type: [{ required: true, message: "请选择操作类型", trigger: "blur" },],
      },
    };
  },
  created() {
     this.ruleForm.admin = storage.getUid();
  },
  methods: {
    //金额输入框取值
    check(){
        var price = '' + this.ruleForm.money;
        price = price
            .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
            .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
            .replace('.', '$#$')
            .replace(/\./g, '')
            .replace('$#$', '.')
            .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
        if (price.indexOf('.') < 0 && price != '') {
            // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            price = parseFloat(price);
        }
        price = price + '';
        this.ruleForm.money = price;
    },

    //提交注册
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          api.moneyChange(this.ruleForm, (res)=>{
              let code = api.getCode(res);
              if(code == 0){
                this.$message({ message: '成功', type: 'success'});
                // this.resetForm('ruleForm');
              } else {
                let msg = api.getMsg(res);
                this.$message.error(msg);
              }
          });
        } else {
          this.$message.error("填写信息不完整");
          return false;
        }
      });
    },
    //清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
