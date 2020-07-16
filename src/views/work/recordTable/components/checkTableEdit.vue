<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="任务标题" prop="title">
         <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
       <el-form-item label="任务说明" prop="explain">
          <el-input v-model.trim="form.explain" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
       <el-form-item label="订单号" prop="sn">
          <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      <el-form-item label="任务状态" prop="state">
        <el-input value="进行中" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="已完成" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
        <el-input value="任务失败" autocomplete="off" :disabled="true" v-show="form.state == 2"></el-input>
      </el-form-item>
      <el-form-item label="奖励金币" prop="award">
         <el-input v-model.trim="form.award" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
      <el-form-item label="完成时间" prop="finishTime">
         <el-input v-model.trim="form.finishTime" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
       <el-form-item label="审核时间" prop="updTime">
          <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="admin">
           <el-input v-model.trim="form.admin" autocomplete="off" :disabled="true"></el-input>
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
        account: '',
        sn: '',
        day: null,
        finishTime: '',
        awardType: null,
        award: '',
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
