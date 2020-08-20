<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">

          <el-form-item label="配置名" prop="key">
            <el-input v-model="form.key" clearable></el-input>
          </el-form-item>
          <el-form-item label="配置值" prop="value">
            <el-input v-model="form.value" clearable></el-input>
          </el-form-item>
          <el-form-item label="配置类型" prop="type">
            <el-select v-model="form.type" placeholder="配置类型" clearable>
              <el-option-group
                v-for="group in type"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.type"
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
      type: [{
        type: [{
          value: 0,
          label: '登录配置'
        },{
          value: 1,
          label: '客服'
        }]
      }],
      typeValue: '',      //选中的配置类型

      form: {
        key: "",
        value: "",
        type: "",
        desc: "",
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        key: [
          { required: true, message: "请输入配置名", trigger: "blur" },
        ],
        value: [
          { required: true, message: "请输入配置值", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请输入配置类型", trigger: "blur" },
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
            api.addConfig(this.form, (res)=>{
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
