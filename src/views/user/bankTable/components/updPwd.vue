<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="旧密码" prop="pwd" v-if="false">
        <el-input v-model.trim="form.pwd" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="pwd1">
        <el-input v-model.trim="form.pwd1" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="pwd2">
        <el-input v-model.trim="form.pwd2" autocomplete="off"></el-input>
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
import storage from "@/api/storage.js";
export default {
  // name: "TableEdit",
  data() {
    return {
      form: {
        uid: '',
        pwd: "",
        pwd1: "",
        pwd2: "",
      },
      submitForm: {
        admin: "",
        id: null,
        pwd: "",
      },
      rules: {
        pwd1: [
          { required: true, trigger: "blur", message: "请输入新资金密码" },
          { min: 3, max: 12, message: "密码长度在 3 到 12 个字符", trigger: "blur" },
        ],
        pwd2: [
          { required: true, trigger: "blur", message: "请确认资金密码" },
          { min: 3, max: 12, message: "密码长度在 3 到 12 个字符", trigger: "blur" },
        ],
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  created() {},
  methods: {
    showEdit(row) {
        this.title = "修改资金密码";
        this.form = Object.assign({}, row);
        this.dialogFormVisible = true;
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
          if(this.form.pwd1 != this.form.pwd2){
            this.$baseMessage("二次密码输入不一致", "error");
            return;
          }else{
            this.submitForm.id = this.form.id;
            this.submitForm.pwd = this.form.pwd1;
            this.submitForm.admin = storage.getUid();
            api.updCashPwd(this.submitForm, (res)=>{
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
          }

          // const { msg } = await doEdit(this.form);
          // this.$baseMessage(msg, "success");
          // this.$refs["form"].resetFields();
          // this.dialogFormVisible = false;
          // this.$emit("fetchData");
          // this.form = this.$options.data().form;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
