<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="96px">
     <el-form-item label="uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
     <el-form-item label="序列号" prop="sn">
       <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>
      <el-form-item label="标题" prop="title">
         <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
     <el-form-item label="需要抽奖次数" prop="num">
       <el-input v-model.trim="form.num" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>
     <el-form-item label="奖励金额" prop="award">
       <el-input v-model.trim="form.award" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>
      <el-form-item label="奖励类型" prop="typeTest">
        <el-input v-model.trim="form.typeTest" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="领取时间" prop="addTime">
         <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
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
