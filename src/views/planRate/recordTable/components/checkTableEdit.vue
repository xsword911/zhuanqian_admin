<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="110px">
     <el-form-item label="编号" prop="sn">
        <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户id" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款计划名称" prop="planName">
        <el-input v-model.trim="form.planName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="需要存款的天数" prop="planDays">
        <el-input v-model.trim="form.planDays" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款利率" prop="planRate">
        <el-input v-model.trim="form.planRate" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      
      <el-form-item label="服务费利率" prop="planServe">
        <el-input v-model.trim="form.planServe" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="计划结束时间" prop="finishTime">
        <el-input v-model.trim="form.finishTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="取出时间" prop="outTime">
        <el-input v-model.trim="form.outTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款金额" prop="addMoney">
        <el-input v-model.trim="form.addMoney" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存款到期利息" prop="rateMoney">
        <el-input v-model.trim="form.rateMoney" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      
      <el-form-item label="实际取款金额" prop="outMoney">
        <el-input v-model.trim="form.outMoney" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手续费" prop="serveMoney">
        <el-input v-model.trim="form.serveMoney" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      
      
      
      <el-form-item label="状态" prop="state">
        <el-input value="在存" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="已取出" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
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
