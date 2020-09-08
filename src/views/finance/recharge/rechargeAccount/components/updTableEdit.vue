<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="110px" :rules="rules" style="display: flex; justify-content: space-between;">
   <div>
     <el-form-item label="排序" prop="order">
        <el-input v-model.trim="form.order" autocomplete="off"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
     </el-form-item>

        <el-form-item label="渠道" prop="wayId">
          <el-select v-model="form.wayId" placeholder="渠道">
            <el-option-group
              v-for="group in rechargeWay"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.rechargeWay"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

     <el-form-item label="收款平台" prop="platform">
        <el-input v-model.trim="form.platform" autocomplete="off"></el-input>
     </el-form-item>
     <el-form-item label="收款账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off"></el-input>
     </el-form-item>
     <el-form-item label="收款人姓名" prop="owner">
        <el-input v-model.trim="form.owner" autocomplete="off"></el-input>
     </el-form-item>

        <el-form-item label="银行" prop="bankId">
          <el-select v-model="form.bankId" placeholder="银行" clearable>
            <el-option-group
              v-for="group in bank"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.bank"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

     <el-form-item label="开户支行" prop="bankBranch">
        <el-input v-model.trim="form.bankBranch" autocomplete="off" clearable></el-input>
     </el-form-item>

     <el-form-item label="二维码" prop="imgUrl">
       <div style="display: flex;">
         <div class="block" style="width: 80px; height: 80px;">
              <el-image
                :src="form.imgUrl"
              ></el-image>
          </div>

          <el-upload
            class="avatar-uploader"
            :action= "getPostFileUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imgUrlNew" :src="imgUrlNew"  class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
       </div>
       <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议200*200</div>
      </el-form-item>
   </div>

   <div>
     <el-form-item label="是否自动到账" prop="isAuto">
       <el-select v-model="form.isAuto" placeholder="是否自动到账">
         <el-option-group
           v-for="group in isAuto"
           :key="group.label"
           :label="group.label">
           <el-option
             v-for="item in group.isAuto"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-option-group>
       </el-select>
     </el-form-item>

     <el-form-item label="自动到账渠道名称" prop="autoName">
        <el-input v-model.trim="form.autoName" autocomplete="off"></el-input>
     </el-form-item>
     <el-form-item label="自动到账渠道规则" prop="autoRule">
        <el-input v-model.trim="form.autoRule" autocomplete="off"></el-input>
     </el-form-item>

     <el-form-item label="状态" prop="state">
       <el-select v-model="form.state" placeholder="状态">
         <el-option-group
           v-for="group in state"
           :key="group.label"
           :label="group.label">
           <el-option
             v-for="item in group.state"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-option-group>
       </el-select>
     </el-form-item>

     <el-form-item label="充值上限" prop="moneyMax">
        <el-input v-model.trim="form.moneyMax" autocomplete="off"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
     </el-form-item>
     <el-form-item label="已充金额" prop="moneySun">
        <el-input v-model.trim="form.moneySun" autocomplete="off"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
     </el-form-item>
     <el-form-item label="等级" prop="lv">
        <el-input v-model.trim="form.lv" autocomplete="off"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
     </el-form-item>

     <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" autocomplete="off"></el-input>
     </el-form-item>
   </div>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitUpd">确 定</el-button>
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
      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],
      value: '',      //交易类型

      isAuto: [{
        isAuto: [{
          value: 0,
          label: '手动'
        },{
          value: 1,
          label: '自动'
        }]
      }],

      bank: [{
        bank: []
      }],

      rechargeWay: [{
        rechargeWay: []
      }],

      form: {
        id: '',
        state: null,
      },
      form2: {
        id: '',
      },
      title: "",
      dialogFormVisible: false,
      rules: {
        order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        wayId: [{ required: true, trigger: "blur", message: "请输入渠道id" }],
        state: [{ required: true, trigger: "blur", message: "请选择状态" }],

        platform: [{ required: true, trigger: "blur", message: "请输入收款平台" }],
        account: [{ required: true, trigger: "blur", message: "请输入收款账号" }],
        owner: [{ required: true, trigger: "blur", message: "请输入收款人姓名" }],
        // bankId: [{ required: true, trigger: "blur", message: "请输入银行id" }],
        // bankBranch: [{ required: true, trigger: "blur", message: "请输入开户支行" }],

        isAuto: [{ required: true, trigger: "blur", message: "请输入是否自动到账" }],
        autoName: [{ required: true, trigger: "blur", message: "请输入自动到账渠道名称" }],
        autoRule: [{ required: true, trigger: "blur", message: "请输入自动到账渠道规则" }],
        moneyMax: [{ required: true, trigger: "blur", message: "请输入充值上限" }],
        moneySun: [{ required: true, trigger: "blur", message: "请输入已充金额" }],
        lv: [{ required: true, trigger: "blur", message: "请输入等级" }],
      },
      imgUrlNew: ''  ,//选择的图片
    };
  },
  mounted() {

  },
  methods: {
    //获取文件上传地址
    getPostFileUrl(){
      return api.getPostFileUrl();
    },
          //文件上传成功
          handleAvatarSuccess(res, file) {
            // this.imgUrlNew = URL.createObjectURL(file.raw);
            this.form.imgUrl = res.data.url;
          },
    showEdit(row, bankData, rechargeWay) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.bank[0].bank = bankData;
      this.rechargeWay[0].rechargeWay = rechargeWay;
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    submitUpd(){
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.form.order = parseInt(this.form.order);
          this.form.moneyMax = parseInt(this.form.moneyMax);
          this.form.moneySun = parseInt(this.form.moneySun);
          this.form.lv = parseInt(this.form.lv);
          api.updRechargeAccount(this.form, (res)=>{
            let code = api.getCode(res);
            if(code == 0){
              this.$baseMessage("修改成功", "success");
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
        } else {
          this.$message.error("填写信息不完整");
          return false;
        }
      });
    },
  },
};
</script>
