<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
     <el-form-item label="第几天" prop="day">
            <el-input v-model="form.day" placeholder="第几天"  clearable
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
            maxlength="2"/>

      </el-form-item>

      <el-form-item label="奖励内容" prop="award">
         <el-input v-model.trim="form.award" autocomplete="off" type="number"></el-input>
       </el-form-item>

      <el-form-item label="奖励类型" prop="awardType">
        <el-select v-model="form.awardType" placeholder="奖励类型" clearable filterable allow-create>
          <el-option-group
            v-for="group in awardType"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.awardType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state" placeholder="状态">
          <el-option-group
            v-for="group in state"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.state"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  name: "TableEdit",
  data() {
    return {
    awardType: [{
        awardType: [{
          value: 0,
          label: '金币'
        },{
          value: 1,
          label: '现金'
        }]
      }],
      awardTypeValue: '',      //选中的任务类型

      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],
      stateValue: '',      //选中的任务状态

      form: {
        id: null,
        awardType: null,
        state: null,
        day: null,
        award: '',
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        day: [{ required: true, trigger: "blur", message: "请输入每月第几天" }],
        award: [{ required: true, trigger: "blur", message: "请输入签到奖励内容" }],
        awardType: [{ required: true, trigger: "blur", message: "请输入签到奖励类型" }],
        state: [{ required: true, trigger: "blur", message: "请输入签到奖励状态" }],
      }
    };
  },
  created() {},
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      //输入日期不能大于当月最大日期
      if(!util.isEmpty(this.form.day)){
          let date = this.mGetDate();  //获取当前月份总共有多少天
          this.form.day = parseInt(this.form.day);
          if(this.form.day > date){
            this.$message.error("输入日期错误");
            return;
          }
      }else this.form.day = null;  //为空时强制改为null（数字）

      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          api.updSign(this.form, (res)=>{
            let code = api.getCode(res);
            if(code == 0){
              this.$baseMessage("修改成功", "success");
              this.$refs["form"].resetFields();
              this.dialogFormVisible = false;
              this.$emit("fetchData");
              this.form = this.$options.data().form;
              this.$emit('refreshList');
            }else{
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
    //获取当前月份一共有几天
    mGetDate(){
         var date = new Date();
         var year = date.getFullYear();
         var month = date.getMonth()+1;
         var d = new Date(year, month, 0);
         return d.getDate();
    },
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left:30rpx;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
