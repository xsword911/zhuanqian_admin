<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="排序id" prop="sort">
         <el-input v-model.trim="form.sort" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="标题" prop="title">
         <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
         <el-input
           type="textarea"
           :rows="2"
           placeholder="请输入内容"
           v-model="form.content">
         </el-input>
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

      form: {
        type: 3,
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        sort: [{ required: true, trigger: "blur", message: "请输入排序id" }],
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        content: [{ required: true, trigger: "blur", message: "请输入内容" }],
        state: [{ required: true, trigger: "blur", message: "请选择状态" }],
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
          api.addInformation(this.form, (res)=>{
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
