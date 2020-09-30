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
<!--          <el-form-item label="配置名" prop="key">-->
<!--            <el-input v-model="ruleForm.key" clearable></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="配置值" prop="value">-->
<!--            <el-input v-model="ruleForm.value" clearable></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="清理范围" prop="type" clearable>
            <el-select v-model="ruleForm.type" placeholder="清理范围" clearable>
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

          <div class="verify-container">
            <vab-verify
              ref="slideDiv"
              :w="350"
              :slider-text="text"
              :h="175"
              @success="handleSuccess"
              @fail="handleError"
            ></vab-verify>
          </div>

<!--          <el-form-item label="备注" prop="desc">-->
<!--            <el-input v-model="ruleForm.desc" clearable></el-input>-->
<!--          </el-form-item>-->
          <el-form-item style="margin-top: 20px;">
            <el-button type="primary" @click="submitForm"
              >清理
            </el-button>
<!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/api.js";
import util from "@/utils/util.js";
import VabVerify from "@/plugins/vabVerify";
import time from "@/utils/time.js";
export default {
  // name: "Form",
  components: { VabVerify },
  data() {
    return {
      text: "向右滑动",
      type: [{
        type: [{
          value: -3,
          label: '前三天'
        },{
          value: -7,
          label: '前一周'
        },{
          value: -30,
          label: '前一个月'
        },{
          value: -60,
          label: '前二个月'
        },{
          value: -90,
          label: '前三个月'
        }]
      }],

      ruleForm: {
        type: null,
      },
      rules: {
        // key: [
        //   { required: true, message: "请输入配置名", trigger: "blur" },
        // ],
        // value: [
        //   { required: true, message: "请输入配置值", trigger: "blur" },
        // ],
        type: [
          { required: true, message: "请输入清理范围", trigger: "blur" },
        ],
      },
      verify: 0,  //验证状态 0验证失败 1验证通过 2未验证
    };
  },
  methods: {
    handleSuccess() {
      this.$baseMessage("校验成功", "success");
      this.verify = 1;
    },
    handleError() {
      this.$baseMessage("校验失败", "error");
      this.verify = 2;
    },
    //提交注册
    submitForm() {
      let date = time.getNowTime();
      let oldDate = time.getDateNext(date, this.ruleForm.type);
      let data = {
        date: oldDate
      };
      if(this.verify !== 1){
        this.$message.error("请验证");
        return;
      }
      if(util.isEmpty(this.ruleForm.type)){
        this.$message.error("填入信息不完整");
        return;
      }
      api.dataClear(data, (res)=>{
          let code = api.getCode(res);
          let msg = api.getMsg(res);
          if(code == 0){
            this.$message({ message: '清理成功', type: 'success'});
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
