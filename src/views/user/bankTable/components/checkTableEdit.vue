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
      <el-form-item label="银行" prop="bank">
         <el-input v-model.trim="form.bank" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
     <el-form-item label="开户支行" prop="bankBranch">
        <el-input v-model.trim="form.bankBranch" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCode">
        <el-input v-model.trim="form.bankCode" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="绑定时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
<!--      <el-form-item label="提现密码" prop="pwd">
        <el-input v-model.trim="form.pwd" autocomplete="off" :disabled="true"></el-input>
      </el-form-item> -->

      <el-form-item label="密码错误次数" prop="pwdError">
        <el-input v-model.trim="form.pwdError" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";

export default {
  // name: "TableEdit",
  data() {
    return {
      form: {

      },
      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        author: [{ required: true, trigger: "blur", message: "请输入作者" }],
      },
      title: "",
      dialogFormVisible: false,
      imageList: [],  //图片预览
    };
  },
  created() {},
  methods: {
    showEdit(row) {
        this.title = "查看";
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
          const { msg } = await doEdit(this.form);
          this.$baseMessage(msg, "success");
          this.$refs["form"].resetFields();
          this.dialogFormVisible = false;
          this.$emit("fetchData");
          this.form = this.$options.data().form;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
