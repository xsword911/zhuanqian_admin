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
      label-width="120px"
      style="display: flex; justify-content: space-between;"
    >
      <div>
        <el-form-item
          label="uid"
          prop="uid"
        >
          <el-input
            v-model.trim="form.uid"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="设备id"
          prop="deviceId"
        >
          <el-input
            v-model.trim="form.deviceId"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="account"
        >
          <el-input
            v-model.trim="form.account"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="tel"
        >
          <el-input
            v-model.trim="form.tel"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="昵称"
          prop="nick"
        >
          <el-input
            v-model.trim="form.nick"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="邀请码"
          prop="code"
        >
          <el-input
            v-model.trim="form.code"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="头像"
          prop="imgUrl"
        >
          <div
            class="block"
            style="width: 80px; height: 80px;"
          >
            <el-image
              :preview-src-list="[form.headUrl]"
              :src="form.headUrl"
            />
          </div>
        </el-form-item>
      </div>

      <div>
        <el-form-item
          label="直属下级"
          prop="subSum"
        >
          <el-input
            v-model.trim="form.subSum"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="所有下级"
          prop="allSubSum"
        >
          <el-input
            v-model.trim="form.allSubSum"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="金币"
          prop="gold"
        >
          <el-input
            v-model.trim="form.gold"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="余额"
          prop="money"
        >
          <el-input
            v-model.trim="form.money"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="直属上级"
          prop="upper"
        >
          <el-input
            v-model.trim="form.upper"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="注册时间"
          prop="regTime"
        >
          <el-input
            v-model.trim="form.regTime"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="最后登录时间"
          prop="loginTime"
        >
          <el-input
            v-model.trim="form.loginTime"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="最后登录ip"
          prop="ip"
        >
          <el-input
            v-model.trim="form.ip"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="账号状态"
          prop="state"
        >
          <el-input
            v-show="form.state == 0"
            value="正常"
            autocomplete="off"
            :disabled="true"
          />
          <el-input
            v-show="form.state == 1"
            value="冻结"
            autocomplete="off"
            :disabled="true"
          />
          <el-input
            v-show="form.state == 2"
            value="管理员封号"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
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
      imageList: [],  //图片预览
    };
  },
  created() {},
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
