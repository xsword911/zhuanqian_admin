<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="950px"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="90px"
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
          label="账单号"
          prop="sn"
        >
          <el-input
            v-model.trim="form.sn"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="金额"
          prop="money"
        >
          <el-input
            v-model.trim="form.money"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="提交时间"
          prop="addTime"
        >
          <el-input
            v-model.trim="form.addTime"
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
            value="未审核"
            autocomplete="off"
            :disabled="true"
          />
          <el-input
            v-show="form.state == 1"
            value="审核成功"
            autocomplete="off"
            :disabled="true"
          />
          <el-input
            v-show="form.state == 2"
            value="审核未通过"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="审核人"
          prop="admin"
        >
          <el-input
            v-model.trim="form.admin"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
      </div>

      <div>
        <el-form-item
          label="银行"
          prop="bank"
        >
          <el-input
            v-model.trim="userBank.bank"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="开户支行"
          prop="bankBranch"
        >
          <el-input
            v-model.trim="userBank.bankBranch"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="银行卡号"
          prop="bankCode"
        >
          <el-input
            v-model.trim="userBank.bankCode"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="开户人姓名"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userBank.bankUserName"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="审核时间"
          prop="updTime"
        >
          <el-input
            v-model.trim="form.updTime"
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

      <div>
        <el-form-item
          label="用户名"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.account"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.tel"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="昵称"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.nick"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="金币"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.gold"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="余额"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.money"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="登录ip"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.ip"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="登录时间"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userInfo.loginTime"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="账号状态"
          prop="bankUserName"
        >
          <el-input value="正常" autocomplete="off":disabled="true" v-if="userInfo.state == 0"/>
          <el-input value="冻结" autocomplete="off":disabled="true" v-if="userInfo.state == 1"/>
          <el-input value="管理员封号" autocomplete="off":disabled="true" v-if="userInfo.state == 2"/>
        </el-form-item>
      </div>

    </el-form>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";
import api from "@/api/api.js";

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
      userBank: {
        bank: "",
      }, //用户银行
      userInfo: {
        tel: "",
        nick: "",
        account: "",
        state: 0
      }, //用户信息
    };
  },
  mounted() {},
  methods: {
    //取用户银行卡数据
    getUserBank()
    {
      api.getUserBank({uid: this.form.uid}, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          this.userBank = api.getData(res)[0];
          console.log(this.userBank);
        }else{
          let msg = api.getMsg(res);
          this.$message.error(msg);
        }
      });
    },

    //取用户数据
    getUserInfo()
    {
      api.getUserByUid({uid: this.form.uid}, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          if(res.data == null) return;
          this.userInfo = res.data;
          console.log(this.userInfo);
        }else{
          let msg = api.getMsg(res);
          this.$message.error(msg);
        }
      });
    },

    showEdit(row) {
      this.title = "查看";
      this.form = Object.assign({}, row);
      this.dialogFormVisible = true;
      this.getUserBank();//取用户银行卡
      this.getUserInfo();  //获取用户信息
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
