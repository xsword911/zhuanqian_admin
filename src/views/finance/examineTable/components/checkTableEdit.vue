<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="80px">
     <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="账单号" prop="sn">
        <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="money">
        <el-input v-model.trim="form.money" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="提交时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input value="未审核" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="审核成功" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
        <el-input value="审核未通过" autocomplete="off" :disabled="true" v-show="form.state == 2"></el-input>
      </el-form-item>
      <el-form-item label="审核人" prop="admin">
        <el-input v-model.trim="form.admin" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="审核时间" prop="updTime">
        <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
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
        account: "",
        tel: "",
        nick: "",
        code: "",
        gold: "",
        money: "",
        upper: "",
        regTime: "",
        loginTime: "",
        ip: "",
        state: "",
      },
      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        author: [{ required: true, trigger: "blur", message: "请输入作者" }],
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  mounted() {},
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
