<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="序号" prop="order">
        <el-input v-model.trim="form.order" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="类型id" prop="typeId">
        <el-input v-model.trim="form.typeId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="类型名称" prop="typeName">
        <el-input v-model.trim="form.typeName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="渠道id" prop="wayId">
        <el-input v-model.trim="form.wayId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="渠道名" prop="wayName">
        <el-input v-model.trim="form.wayName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="收款平台" prop="platform">
        <el-input v-model.trim="form.platform" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收款账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收款人姓名" prop="owner">
        <el-input v-model.trim="form.owner" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="银行id" prop="bankId">
        <el-input v-model.trim="form.bankId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input v-model.trim="form.bankName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开户支行" prop="bankBranch">
        <el-input v-model.trim="form.bankBranch" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="二维码" prop="imgUrl">
         <div class="block" style="width: 80px; height: 80px;">
              <el-image
                :preview-src-list="[form.imgUrl]"
                :src="form.imgUrl"
              ></el-image>
          </div>
       </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
      </el-form-item>
      <el-form-item label="是否自动到账" prop="isAuto">
        <el-input value="手动" autocomplete="off" :disabled="true" v-show="form.isAuto == 0"></el-input>
        <el-input value="自动" autocomplete="off" :disabled="true" v-show="form.isAuto == 1"></el-input>
      </el-form-item>
      <el-form-item label="自动到账渠道名称" prop="autoName">
        <el-input v-model.trim="form.autoName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="自动到账渠道规则" prop="autoRule">
        <el-input v-model.trim="form.autoRule" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="充值上限" prop="moneyMax">
        <el-input v-model.trim="form.moneyMax" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="已充金额" prop="moneySun">
        <el-input v-model.trim="form.moneySun" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="lv">
        <el-input v-model.trim="form.lv" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="添加时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="修改时间" prop="updTime">
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
