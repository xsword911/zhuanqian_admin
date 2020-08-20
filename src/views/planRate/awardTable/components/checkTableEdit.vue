<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="80px">
     <el-form-item label="排序" prop="order">
        <el-input v-model.trim="form.order" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款计划名称" prop="planName">
        <el-input v-model.trim="form.planName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款天数" prop="planDays">
        <el-input v-model.trim="form.planDays" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款利率" prop="planRate">
        <el-input v-model.trim="form.planRate" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="服务费" prop="planServe">
        <el-input v-model.trim="form.planServe" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
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
