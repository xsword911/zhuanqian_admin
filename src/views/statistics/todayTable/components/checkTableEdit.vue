<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="display: flex; justify-content: space-between;"
    >
      <div>
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
          label="盈利"
          prop="money"
        >
          <el-input
            v-model.trim="form.money"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="任务收入"
          prop="moneyTaskAdd"
        >
          <el-input
            v-model.trim="form.moneyTaskAdd"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="发布支出"
          prop="moneyTaskLose"
        >
          <el-input
            v-model.trim="form.moneyTaskLose"
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
          label="活动收入"
          prop="moneyActiveAdd"
        >
          <el-input
            v-model.trim="form.moneyActiveAdd"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="活动支出"
          prop="moneyActiveLose"
        >
          <el-input
            v-model.trim="form.moneyActiveLose"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
      </div>

      <div>
        <el-form-item
          label="充值次数"
          prop="rechargeSum"
        >
          <el-input
            v-model.trim="form.rechargeSum"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="充值金额"
          prop="rechargeMoney"
        >
          <el-input
            v-model.trim="form.rechargeMoney"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        
        <el-form-item
          label="首充金额"
          prop="firstRechargeMoney"
        >
          <el-input
            v-model.trim="form.firstRechargeMoney"
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
          label="提现金额"
          prop="drawMoney"
        >
          <el-input
            v-model.trim="form.drawMoney"
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
          label="代理佣金"
          prop="moneyAgency"
        >
          <el-input
            v-model.trim="form.moneyAgency"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        
        <el-form-item
          label="当天注册"
          prop="isRegisterTodayTip"
        >
          <el-input
            v-model.trim="form.isRegisterTodayTip"
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
            :disabled="true"
          />
        </el-form-item>
      </div>

     <!-- <el-form-item
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
      </el-form-item> -->
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
