<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="80px">
     <el-form-item label="配置名" prop="key">
        <el-input v-model.trim="form.key" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="配置值" prop="value">
        <el-input v-model.trim="form.value" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="配置类型" prop="type">
        <el-input value="登录配置" autocomplete="off" :disabled="true" v-show="form.type == 0"></el-input>
        <el-input value="客服" autocomplete="off" :disabled="true" v-show="form.type == 1"></el-input>
        <el-input value="幸运大转盘配置" autocomplete="off" :disabled="true" v-show="form.type == 2"></el-input>
      </el-form-item>
      <el-form-item label="添加时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="修改时间" prop="updTime">
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
