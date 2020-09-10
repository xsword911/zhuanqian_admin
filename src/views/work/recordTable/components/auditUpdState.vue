<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="110px" :rules="rules">

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
import storage from "@/api/storage.js";
export default {
  name: "TableEdit",
  data() {
    return {
      state: [{
        state: [{
          value: 0,
          label: '进行中'
        },{
          value: 1,
          label: '未审核'
        },{
          value: 2,
          label: '已完成'
        },{
          value: 3,
          label: '任务失败'
        },{
          value: 10,
          label: '任务取消'
        }]
      }],
      stateValue: '',      //选中的任务状态

      form: {
        state: null,
      },
      title: "",
      dialogFormVisible: false,
      uid: '',  //uid

      rules: {
        state: [{ required: true, trigger: "blur", message: "请输入状态" }],
      },
    };
  },
  created() {},
  methods:{
    showEdit(row) {
      this.title = "你确定要批量审核选中项吗";
      this.form = Object.assign({}, row);
      this.dialogFormVisible = true;
      console.log(row);
      this.uid = storage.getUid();
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.form.adminUid = this.uid;
          api.auditTaskDetailsArr(this.form, (res)=>{
            let code = api.getCode(res);
            if(code == 0){
              this.$baseMessage("审核成功", "success");
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
