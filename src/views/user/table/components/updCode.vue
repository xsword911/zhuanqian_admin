<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true" clearable></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="code">
        <el-input v-model.trim="form.code" autocomplete="off" clearable ></el-input>
        <div><div style="color:#FF3A00; display:inline-block;">*</div>邀请码为六位数</div>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitUpd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from "@/api/api.js";
import util from "@/utils/util.js";
import storage from "@/api/storage.js";
export default {
  // name: "TableEdit",
  data() {
    return {
      postFileUrl: '',  //文件上传地址
      options: [{
        options: [{
          value: 0,
          label: '正常'
        },{
          value: 1,
          label: '冻结'
        },{
          value: 2,
          label: '管理员封号'
        }]
      }],
      value: '',      //交易类型
      form: {
        code: '',
        uid: "",
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  created() {
    this.form.uid = storage.getUid();
  },
  methods: {
    showEdit(row) {
      this.title = "修改邀请码";
      this.form = Object.assign({}, row);
      this.dialogFormVisible = true;
      this.oldHeadImg = this.form.headUrl;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    submitUpd(){
      let data = {
        uid: this.form.uid,
        code: this.form.code
      };
      api.setCode(data, (res)=>{
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
    },
  },
};
</script>

<style>

</style>
