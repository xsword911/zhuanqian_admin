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
      label-width="90px"
    >
      <el-form-item
        label="序号"
        prop="order"
      >
        <el-input
          v-model.trim="form.order"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="类型id"
        prop="typeId"
      >
        <el-input
          v-model.trim="form.typeId"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="类型名称"
        prop="typeName"
      >
        <el-input
          v-model.trim="form.typeName"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="渠道id"
        prop="wayId"
      >
        <el-input
          v-model.trim="form.wayId"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="渠道名"
        prop="wayName"
      >
        <el-input
          v-model.trim="form.wayName"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="充值最大值"
        prop="rechargeMax"
      >
        <el-input
          v-model.trim="form.rechargeMax"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="充值最小值"
        prop="rechargeMin"
      >
        <el-input
          v-model.trim="form.rechargeMin"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="state"
      >
        <el-input
          v-show="form.state == 0"
          value="关闭"
          autocomplete="off"
          :disabled="true"
        />
        <el-input
          v-show="form.state == 1"
          value="开启"
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

      <el-form-item
        label=""
        prop=""
      >
        <div style="color: #ff0000;">
          *充值金额范围受到：等级设置、充值渠道设置、系统设置中资金配置，3者共同影响。3种设置中，值最大者生效。
        </div>
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
        tel: "",
        nick: "",
        code: "",
        gold: "",
        money: "",
        upper: "",
        regTime: "",
        loginTime: "",
        ip: "",
        state: "",
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
