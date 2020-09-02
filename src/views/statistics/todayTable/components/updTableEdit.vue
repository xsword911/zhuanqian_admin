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
        label="交易日期"
        prop="addTime"
      >
        <el-input
          v-model.trim="form.addTime"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="前一天余额"
        prop="moneyOld"
      >
        <el-input
          v-model.trim="form.moneyOld"
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
        label="前一天金币"
        prop="goldOld"
      >
        <el-input
          v-model.trim="form.goldOld"
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

      <el-form-item
        label="备注"
        prop="desc"
      >
        <el-input
          v-model.trim="form.desc"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="save"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "TableEdit",
  data() {
    return {
      form: {
        account: "",
        sn: '',
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  mounted() {

  },
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      this.close();
    },
  },
};
</script>
