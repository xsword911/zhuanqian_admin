<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="110px" :rules="rules">

          <el-form-item label="排序" prop="order">
            <el-input v-model="form.order" clearable></el-input>
          </el-form-item>
          <el-form-item label="存款计划名称" prop="planName">
            <el-input v-model="form.planName" clearable></el-input>
          </el-form-item>

          <el-form-item label="存款天数" prop="planDays">
            <el-input v-model="form.planDays" clearable></el-input>
          </el-form-item>
          <el-form-item label="存款利率" prop="planRate">
            <el-input v-model="form.planRate" clearable></el-input>
          </el-form-item>
          <el-form-item label="服务费" prop="planServe">
            <el-input v-model="form.planServe" clearable></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="state">
            <el-select v-model="form.state" placeholder="状态" clearable>
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

          <el-form-item label="备注" prop="desc">
            <el-input v-model="form.desc" clearable></el-input>
          </el-form-item>
          <div style="color: #ff0000;">注: 存款利率和服务费请按照正确格式填写如：1% 填写100</div>
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
      stateValue: '',      //选中的配置类型

      form: {
        key: "",
        state: null,
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        order: [{ required: true, message: "请输入排序", trigger: "blur"}],
        planName: [{ required: true, message: "请输入存款计划名称", trigger: "blur"}],
        planDays: [{ required: true, message: "请输入存款天数", trigger: "blur"}],
        planRate: [{ required: true, message: "请输入存款利率", trigger: "blur"}],
        planServe: [{ required: true, message: "请输入服务费", trigger: "blur"}],
        state: [{ required: true, message: "请输入状态", trigger: "blur"}],
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
            api.addPlanRate(this.form, (res)=>{
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
