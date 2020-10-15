<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="130px" :rules="rules">
      <el-form-item label="用户uid" prop="uid">
        <el-input v-model="form.uid" placeholder="排序" :disabled="true"/>
      </el-form-item>

      <el-form-item label="抽奖次数" prop="num">
        <el-input v-model="form.num" placeholder="标题"/>
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
        form: {
          id: null,
        },
        title: "",
        dialogFormVisible: false,

        rules: {
          num: [{ required: true, trigger: "blur", message: "请输入抽奖次数" }],
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
            api.updLuckNum(this.form, (res)=>{
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

</style>
