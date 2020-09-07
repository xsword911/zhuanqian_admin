<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="140px" :rules="rules" style="display: flex; justify-content: space-between;">
      <div>
        <el-form-item label="等级" prop="level">
           <el-input v-model.trim="form.level" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="等级名称" prop="levelName">
           <el-input v-model.trim="form.levelName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="需要充值金额" prop="money">
           <el-input v-model.trim="form.money" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="可发布任务数量" prop="publishTaskSum">
           <el-input v-model.trim="form.publishTaskSum" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="每天可接任务数量" prop="receiveTaskSum">
           <el-input v-model.trim="form.receiveTaskSum" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="提现最小金额" prop="drawMin">
          <el-input v-model.trim="form.drawMin" autocomplete="off"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="提现最大金额" prop="drawMax">
          <el-input v-model.trim="form.drawMax" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提现次数" prop="drawSum">
          <el-input v-model.trim="form.drawSum" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="充值最小金额" prop="rechargeMin">
          <el-input v-model.trim="form.rechargeMin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="充值最大金额" prop="rechargeMax">
          <el-input v-model.trim="form.rechargeMax" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="desc">
           <el-input v-model.trim="form.desc" autocomplete="off"></el-input>
        </el-form-item>

        <div style="color: #ff0000;">*等级充值提现设置和系统资金配置比较，值大者生效</div>
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
      form: {

      },
      title: "",
      dialogFormVisible: false,
      rules: {
        level: [{ required: true, trigger: "blur", message: "请输入等级" }],
        levelName: [{ required: true, trigger: "blur", message: "请输入等级名称" }],
        money: [{ required: true, trigger: "blur", message: "请输入需要充值金额" }],
        publishTaskSum: [{ required: true, trigger: "blur", message: "请输入可发布任务数量" }],
        receiveTaskSum: [{ required: true, trigger: "blur", message: "请输入每天可以接任务数量" }],
        drawSum: [{ required: true, trigger: "blur", message: "请输入提现次数" }],
        drawMin: [{ required: true, trigger: "blur", message: "请输入提现最小金额" }],
        drawMax: [{ required: true, trigger: "blur", message: "请输入提现最大金额" }],
        rechargeMin: [{ required: true, trigger: "blur", message: "请输入充值最小金额" }],
        rechargeMax: [{ required: true, trigger: "blur", message: "请输入充值最大金额" }],
      }
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
          api.addUserLevel(this.form, (res)=>{
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
