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
      <div>
        <!-- <el-input v-model.trim="form.id" autocomplete="off" :disabled="true" v-if="false"></el-input> -->
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
      </div>

      <div>
        <el-form-item
          label="银行"
          prop="bank"
        >
          <el-input
            v-model.trim="userBank[0].bank"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="开户支行"
          prop="bankBranch"
        >
          <el-input
            v-model.trim="userBank[0].bankBranch"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="银行卡号"
          prop="bankCode"
        >
          <el-input
            v-model.trim="userBank[0].bankCode"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="开户人姓名"
          prop="bankUserName"
        >
          <el-input
            v-model.trim="userBank[0].bankUserName"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>

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
      </div>

      <div>
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
      userBank: null, //用户银行
      userInfo: null, //用户信息
    };
  },
  mounted() {

  },
  methods: {
    //取用户银行卡数据
    getUserBank()
    {
      api.getUserBank({uid: this.form.uid}, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          this.userBank = api.getData(res);
          //console.log(this.userBank);
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
          this.userInfo = res.data;
          console.log(this.userInfo);
        }else{
          let msg = api.getMsg(res);
          this.$message.error(msg);
        }
      });
    },

    showEdit(row) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "审核";
        this.form = Object.assign({}, row);
      }
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
    submitUpd(){
      this.form2.admin = "admin1";
      this.form2.id = this.form.id;
      this.form2.state = this.form.state;
      if(!util.isEmpty(this.form.desc)) this.form2.desc = this.form.desc;
      api.updMoneyDraw(this.form2, (res)=>{
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
