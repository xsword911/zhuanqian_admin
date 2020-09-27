<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="id" prop="id" v-if="false">
        <el-input v-model="form.id" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户id" prop="uid">
        <el-input v-model="form.uid" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" autocomplete="off" clearable></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
      rules: {
        uid: [{ required: true, message: "请输入用户id", trigger: "blur" },],
      },
      form: {
        id: '',
        uid: "",
        desc: ""
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  mounted() {

  },
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
      if(util.isEmpty(this.form.uid)){
        this.$message.error("用户id不能为空");
        return;
      }
      this.submitUpd();
    },
    submitUpd(){
      api.updTaskBlacklist(this.form, (res)=>{
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
    },
  },
};
</script>
