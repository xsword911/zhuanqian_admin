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
      label-width="90px"
      style="display: flex; justify-content: space-between;"
    >
      <!-- <el-input v-model.trim="form.id" autocomplete="off" :disabled="true" v-if="false"></el-input> -->
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
          label="等级"
          prop="levelName"
        >
          <el-input
            v-model="userInfo.levelName"
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
          label="银行"
          prop="bank"
        >
          <el-input
            v-model.trim="form.bank"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="开户支行"
          prop="bankBranch"
        >
          <el-input
            v-model.trim="form.bankBranch"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="收款账号"
          prop="account"
        >
          <el-input
            v-model.trim="form.account"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="收款人姓名"
          prop="owner"
        >
          <el-input
            v-model.trim="form.owner"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="账号状态"
          prop="bankUserName"
        >
          <el-input
            v-if="userInfo.state == 0"
            value="正常"
            autocomplete="off"
            :disabled="true"
          />
          <el-input
            v-if="userInfo.state == 1"
            value="冻结"
            autocomplete="off"
            :disabled="true"
          />
          <el-input
            v-if="userInfo.state == 2"
            value="管理员封号"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
      </div>

      <div>
        <el-form-item label="二维码">
          <div style="display: flex;">
            <div
              class="block"
              style="width: 80px; height: 80px;"
            >
              <el-image
                :src="form.imgUrl"
                :preview-src-list="[form.imgUrl]"
              />
            </div>
          </div>
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

        <el-form-item label="充值截图">
          <div style="display: flex;">
            <div
              class="block"
              style="width: 80px; height: 80px;"
            >
              <el-image
                :src="form.finishUrl"
                :preview-src-list="[form.finishUrl]"
              />
            </div>
          </div>
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
          label="状态"
          prop="state"
        >
          <el-select
            v-model="form.state"
            placeholder="状态"
          >
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-option-group>
          </el-select>
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

        <el-form-item
          label=""
          prop="desc"
        >
          <div style="color: #dc3b40;">
            备注是支付人姓名，微信号，支付宝号等
          </div>
        </el-form-item>
      </div>

      <div>
        <el-form-item
          label="用户名"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.account"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.tel"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="昵称"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.nick"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="金币"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.gold"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="余额"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.money"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="登录ip"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.ip"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="注册时间"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.regTime"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item
          label="登录时间"
          prop="bankUserName"
        >
          <el-input
            v-model="userInfo.loginTime"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
      </div>
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
        @click="submitUpd"
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
      options: [{
        options: [{
          value: -1,
          label: '未提交'
        },{
          value: 0,
          label: '未审核'
        },{
          value: 1,
          label: '审核通过'
        },{
          value: 2,
          label: '审核未通过'
        }]
      }],
      value: '',      //交易类型
      form: {
        id: '',
        desc: '',
      },
      form2: {
        id: '',
      },
      title: "",
      dialogFormVisible: false,
      userInfo: {
        tel: "",
        nick: "",
        account: "",
        state: 0,
      }, //用户信息
      level: [],  //会员等级信息
    };
  },
  mounted() {

  },
  methods: {
    showEdit(row, level) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "审核";
        this.form = Object.assign({}, row);
      }
      console.log(this.form);
      this.dialogFormVisible = true;
      this.level = level;
      this.getUserInfo();  //获取用户信息
    },
    //取用户数据
    getUserInfo()
    {
      api.getUserByUid({uid: this.form.uid}, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          if(res.data == null) return;
          this.level.forEach((item) =>{
            if(res.data.level == item.level) res.data.levelName = item.levelName;
          });
          this.userInfo = res.data;
          // console.log(this.userInfo);
        }else{
          let msg = api.getMsg(res);
          this.$message.error(msg);
        }
      });
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    submitUpd(){
      this.form2.admin = "admin1";
      this.form2.id = this.form.id;
      this.form2.state  = this.form.state;
      if(!util.isEmpty(this.form.desc)) this.form2.desc = this.form.desc;
      api.updMoneyRecharge(this.form2, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          this.$baseMessage("审核成功", "success");
          this.$refs["form"].resetFields();
          this.dialogFormVisible = false;
          this.$emit("fetchData");
          this.form = this.$options.data().form;
          this.$emit('refreshList');
        }else{
          let msg = api.getMsg(res);
          this.$message.error(msg);
        }
      });
    },
  },
};
</script>
