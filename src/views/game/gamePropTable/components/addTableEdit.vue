<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="uid" prop="uid">
      <el-input v-model.trim="form.uid" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="道具类型" prop="propType">
      <el-select v-model="form.propType" placeholder="道具类型">
        <el-option-group
          v-for="group in propType"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.propType"
            :key="item.propType"
            :label="item.propName"
            :value="item.propType">
          </el-option>
        </el-option-group>
      </el-select>
    </el-form-item>



    <el-form-item label="道具数量" prop="propNum">
      <el-input v-model.trim="form.propNum" autocomplete="off"></el-input>
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
      propType: [{
        propType: []
      }],

      form: {

      },
      title: "",
      dialogFormVisible: false,

      rules: {
        uid: [{ required: true, trigger: "blur", message: "请输入uid" }],
        propType: [{ required: true, trigger: "blur", message: "请输入道具类型" }],
        propNum: [{ required: true, trigger: "blur", message: "请输入道具数量" }],
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
      console.log(row);
      this.propType = row;
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
          api.addGameProp(this.form, (res)=>{
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
