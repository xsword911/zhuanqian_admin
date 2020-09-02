<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="用户id"
        prop="uid"
      >
        <el-input
          v-model.trim="form.uid"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="增加金额"
        prop="moneyAdd"
      >
        <el-input
          v-model.trim="form.moneyAdd"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="减少金额"
        prop="moneyLose"
      >
        <el-input
          v-model.trim="form.money"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>

      <el-form-item
        label="提现次数"
        prop="drawSum"
      >
        <el-input
          v-model.trim="form.drawSum"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>


      <el-form-item
        label="得到金币"
        prop="goldAdd"
      >
        <el-input
          v-model.trim="form.goldAdd"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="消耗金币"
        prop="goldLose"
      >
        <el-input
          v-model.trim="form.goldLose"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="任务次数"
        prop="taskSum"
      >
        <el-input
          v-model.trim="form.taskSum"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>

      <el-form-item
        label="加款"
        prop="moneyIns"
      >
        <el-input
          v-model.trim="form.moneyIns"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>

      <el-form-item
        label="扣款"
        prop="moneySubtract"
      >
        <el-input
          v-model.trim="form.moneySubtract"
          autocomplete="off"
          :disabled="true"
        />
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
