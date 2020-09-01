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
          <el-form-item label="配置名" prop="key">
            <el-input v-model="ruleForm.key" clearable></el-input>
          </el-form-item>
          <el-form-item label="配置值" prop="value">
            <el-input v-model="ruleForm.value" clearable></el-input>
          </el-form-item>
          <el-form-item label="配置类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="配置类型" clearable>
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
              >立即添加
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
      type: [{
        type: [{
          value: 0,
          label: '登录配置'
        },{
          value: 1,
          label: '客服'
        },{
          value: 2,
          label: '幸运大转盘配置'
        },{
          value: 3,
          label: '代理'
        },{
          value: 4,
          label: '注册配置'
        },{
          value: 5,
          label: '平台配置'
        }]
      }],
      typeValue: '',      //选中的配置类型

      ruleForm: {
        key: '',
        value: '',
        type: null,
        desc: '',
      },
      rules: {
        key: [
          { required: true, message: "请输入配置名", trigger: "blur" },
        ],
        value: [
          { required: true, message: "请输入配置值", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请输入配置类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //提交注册
    submitForm() {
      if(util.isEmpty(this.ruleForm.key) || util.isEmpty(this.ruleForm.value) || util.isEmpty(this.ruleForm.type)){
        this.$message.error("填入信息不完整");
        return;
      };
      api.addConfig(this.ruleForm, (res)=>{
          let code = api.getCode(res);
          let msg = api.getMsg(res);
          if(code == 0){
            this.$message({ message: '添加系统配置成功', type: 'success'});
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
