<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="等级" prop="level">
        <el-input v-model.trim="form.level" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="等级名称" prop="levelName">
        <el-input v-model.trim="form.levelName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="需要充值金额" prop="money">
         <el-input v-model.trim="form.money" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>

      <el-form-item label="可以发布任务数量" prop="publishTaskSum">
        <el-input v-model.trim="form.publishTaskSum" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="每天可接任务数量" prop="receiveTaskSum">
        <el-input v-model.trim="form.receiveTaskSum" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      
      <el-form-item label="提现次数" prop="drawSum">
        <el-input v-model.trim="form.drawSum" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="更新时间" prop="updTime">
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
