<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
  <el-form ref="form" :model="account" label-width="110px" :rules="rules" style="display: flex; justify-content: space-between;">
      <div>
        <el-form-item label="排序" prop="order">
             <el-input v-model.trim="account.order" autocomplete="off"
             onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
          </el-form-item>

          <el-form-item label="渠道" prop="wayId">
            <el-select v-model="account.wayId" placeholder="渠道">
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
             <el-input v-model.trim="account.platform" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收款账号" prop="account">
             <el-input v-model.trim="account.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收款人姓名" prop="owner">
             <el-input v-model.trim="account.owner" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="银行" prop="bankId">
            <el-select v-model="account.bankId" placeholder="银行" clearable>
              <el-option-group
                v-for="group in arrBank"
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
             <el-input v-model.trim="account.bankBranch" autocomplete="off" clearable></el-input>
          </el-form-item>

        <el-form-item label="图片url">
           <el-upload
             class="avatar-uploader"
             :action= "getPostFileUrl()"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="account.imgUrl" :src="account.imgUrl"  class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
           <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议200*200</div>
         </el-form-item>
      </div>

      <div>
        <el-form-item label="是否自动到账" prop="isAuto">
          <el-select v-model="account.isAuto" placeholder="是否自动到账">
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
           <el-input v-model.trim="account.autoName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="自动到账渠道规则" prop="autoRule">
           <el-input v-model.trim="account.autoRule" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select v-model="account.state" placeholder="状态">
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
           <el-input v-model.trim="account.moneyMax" autocomplete="off"
           onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
        </el-form-item>
        <el-form-item label="已充金额" prop="moneySun">
           <el-input v-model.trim="account.moneySun" autocomplete="off"
           onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="lv">
           <el-input v-model.trim="account.lv" autocomplete="off"
           onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="desc">
           <el-input v-model.trim="account.desc" autocomplete="off"></el-input>
        </el-form-item>
      </div>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  name: "TableEdit",
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
      stateValue: '',      //选中的任务状态

      isAuto: [{
        isAuto: [{
          value: 0,
          label: '手动'
        },{
          value: 1,
          label: '自动'
        }]
      }],

      arrBank: [{
        bank: []
      }],

      rechargeWay: [{
        rechargeWay: []
      }],

      //添加账号
      account: {
        imgUrl: '',
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
      }
    };
  },
  created() {},
  methods: {
    //获取文件上传地址
    getPostFileUrl(){
      return api.getPostFileUrl();
    },
    //文件上传成功
    handleAvatarSuccess(res, file) {
      // this.imgUrlNew = URL.createObjectURL(file.raw);
      this.account.imgUrl = res.data.url;
    },
    //上传文件之前的钩子，参数为上传的文件
    beforeAvatarUpload(file) {
      return;
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    showEdit(row, rechargeWay) {
      this.title = "添加";
      this.arrBank[0].bank = row;
      this.rechargeWay[0].rechargeWay = rechargeWay;
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      // this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      //银行id为空时删除属性
      if(util.isEmpty(this.account.bankId)){
         this.account.bankId = null;
      }
      console.log(this.account);
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.account.order = parseInt(this.account.order);
          this.account.moneyMax = parseInt(this.account.moneyMax);
          this.account.moneySun = parseInt(this.account.moneySun);
          this.account.lv = parseInt(this.account.lv);
          console.log(this.account);
          api.addRechargeAccount(this.account, (res)=>{
            let code = api.getCode(res);
            if(code == 0){
              this.$baseMessage("添加成功", "success");
              this.$refs["form"].resetFields();
              this.dialogFormVisible = false;
              this.$emit("fetchData");
              // this.account = this.$options.data().form;
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left:30rpx;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
