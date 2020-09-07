<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="140px" style="display: flex; justify-content: space-between;">
      <div>
        <el-form-item label="等级" prop="level">
          <el-input v-model.trim="form.level" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="等级名称" prop="levelName">
          <el-input v-model.trim="form.levelName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="需要充值金额" prop="money">
           <el-input v-model.trim="form.money" autocomplete="off" :disabled="true"></el-input>
         </el-form-item>

        <el-form-item label="可发布任务数量" prop="publishTaskSum">
          <el-input v-model.trim="form.publishTaskSum" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="每天可接任务数量" prop="receiveTaskSum">
          <el-input v-model.trim="form.receiveTaskSum" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="提现最小金额" prop="drawMin">
          <el-input v-model.trim="form.drawMin" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="提现最大金额" prop="drawMax">
          <el-input v-model.trim="form.drawMax" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="提现次数" prop="drawSum">
          <el-input v-model.trim="form.drawSum" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="充值最小金额" prop="rechargeMin">
          <el-input v-model.trim="form.rechargeMin" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="充值最大金额" prop="rechargeMax">
          <el-input v-model.trim="form.rechargeMax" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="更新时间" prop="updTime">
          <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model.trim="form.desc" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <div style="color: #ff0000;">*等级充值提现设置和系统资金配置比较，值大者生效</div>
      </div>
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
