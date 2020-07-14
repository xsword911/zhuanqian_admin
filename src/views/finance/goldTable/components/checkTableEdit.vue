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
      <el-form-item label="交易订单号" prop="sn">
        <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="关联订单编号" prop="snExt">
        <el-input v-model.trim="form.snExt" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="交易时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="交易金币" prop="gold">
        <el-input v-model.trim="form.gold" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="交易类别" prop="sort">
        <el-input value="收入" autocomplete="off" :disabled="true" v-show="form.sort == 0"></el-input>
        <el-input value="支出" autocomplete="off" :disabled="true" v-show="form.sort == 1"></el-input>
      </el-form-item>
      <el-form-item label="交易类型" prop="type">
        <el-input v-model.trim="form.type" autocomplete="off" :disabled="true"></el-input>
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
        sn: "",
        snExt: "",
        addTime: "",
        gold: "",
        sort: "",
        type: "",
        desc: "",
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
