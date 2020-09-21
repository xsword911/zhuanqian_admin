<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="管理员uid" prop="uid">
         <el-input v-model.trim="form.uid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="name">
         <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="操作内容" prop="content">
         <el-input v-model.trim="form.content" autocomplete="off"></el-input>
      </el-form-item>

         <el-form-item label="操作类型" prop="type">
              <el-select v-model="form.type" placeholder="操作类型" clearable>
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
      type: [{
        type: [{
          value: 0,
          label: '操作类型0'
        },{
          value: 1,
          label: '操作类型1'
        }]
      }],

      form: {
        type: 1,
        admin: "admin1",
        toUrl: "",
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        uid: [{ required: true, trigger: "blur", message: "请输入管理员uid" }],
        name: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        content: [{ required: true, trigger: "blur", message: "请输入内容" }],
        type: [{ required: true, trigger: "blur", message: "请选择操作类型" }],
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
          api.addLogOperation(this.form, (res)=>{
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
