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
      <el-form-item label="口令密码" prop="otpSecret">
        <el-input v-model.trim="form.otpSecret" autocomplete="off" clearable></el-input>
      </el-form-item>
<!--      <el-form-item label="手机号" prop="tel">
        <el-input v-model.trim="form.tel" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick">
        <el-input v-model.trim="form.nick" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="直属上级" prop="upper">
        <el-input v-model.trim="form.upper" autocomplete="off" clearable></el-input>
      </el-form-item> -->
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
      value: '',      //交易类型
      form: {
        id: "",
        account: "",
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
        if(util.isEmpty(this.form.tel) && util.isEmpty(this.form.nick)) this.$message.error('修改信息不能为空');
        if(!util.isEmpty(this.form.nick)){
        		if(this.form.nick.length > 8){
              this.$message.error('昵称长度不能超过8位')
        			return;
        		}
        }
        if(!util.isEmpty(this.form.tel)){
        		var re = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        		if (!re.test(this.form.tel)) {
              this.$message.error('手机号格式错误');
        			return;
        		}
        }
        this.submitUpd();
    },
    submitUpd(){
      if(util.isEmpty(this.form.otpSecret)){
        this.$message.error('修改信息不能为空');
        return;
      }
      let data = {
        uid: this.form.uid,
        otpSecret: this.form.otpSecret
      };
      api.setUser(data, (res)=>{
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
