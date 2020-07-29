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
      <el-form-item label="设备id" prop="deviceId">
         <el-input v-model.trim="form.deviceId" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
     <el-form-item label="用户名" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model.trim="form.tel" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick">
        <el-input v-model.trim="form.nick" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="code">
        <el-input v-model.trim="form.code" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="金币" prop="gold">
        <el-input v-model.trim="form.gold" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="余额" prop="money">
        <el-input v-model.trim="form.money" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="直属上级" prop="upper">
        <el-input v-model.trim="form.upper" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="regTime">
        <el-input v-model.trim="form.regTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="最后一次登录时间" prop="loginTime">
        <el-input v-model.trim="form.loginTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="最后一次登录ip" prop="ip">
        <el-input v-model.trim="form.ip" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="账号状态" prop="state">
        <el-input value="正常" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="冻结" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
        <el-input value="管理员封号" autocomplete="off" :disabled="true" v-show="form.state == 2"></el-input>
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
  },
};
</script>
