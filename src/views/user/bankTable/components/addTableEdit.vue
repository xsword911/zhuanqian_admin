<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="94px" :rules="rules">

      <el-form-item label="用户uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="银行" prop="bank">
        <el-input v-model.trim="form.bank" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="开户支行" prop="bankBranch">
        <el-input v-model.trim="form.bankBranch" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="开户人姓名" prop="bankUserName">
        <el-input v-model.trim="form.bankUserName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号" prop="bankCode">
        <el-input v-model.trim="form.bankCode" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="提现密码" prop="pwd">
        <el-input v-model.trim="form.pwd" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="再次输入提现密码" prop="pwd2">
        <el-input v-model.trim="form.pwd2" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" autocomplete="off"></el-input>
      </el-form-item>

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
import md5 from "@/api/md5.js";
export default {
  name: "TableEdit",
  data() {
    return {
      form: {
        account: "",
        pwd: "",
        pwd2: "",
        upperCode: "",
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        uid: [{ required: true, message: "请输入用户id", trigger: "blur" }],
        bank: [{ required: true, message: "请输入银行", trigger: "blur" }],
        bankUserName: [{ required: true, message: "请输入开户人姓名", trigger: "blur" }],
        bankBranch: [{ required: true, message: "请输入开户支行", trigger: "blur" }],
        bankCode: [{ required: true, message: "请输入银行卡号", trigger: "blur" }],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度在 3 到 12 个字符", trigger: "blur" },
        ],
        pwd2: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度在 3 到 12 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
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
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          if(this.form.pwd2 != this.form.pwd){
            this.$baseMessage("二次密码输入不一致", "error");
            return;
          }
          let data = Object.assign({}, this.form);  //克隆数据
          data.pwd = md5(data.pwd);
            api.addUserBank(data, (res)=>{
                let code = api.getCode(res);
                if(code == 0){
                  this.$baseMessage("添加成功", "success");
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
