<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <!-- <el-input v-model.trim="form.id" autocomplete="off" :disabled="true" v-if="false"></el-input> -->
      <el-form-item label="银行id" prop="bankId">
         <el-input v-model.trim="form.bankId" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="银行名称" prop="bankName">
         <el-input v-model.trim="form.bankName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
         <el-input v-model.trim="form.desc" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitUpd">确 定</el-button>
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
      form: {
        id: '',
      },
      form2: {
        id: '',
        state: null,
      },
      title: "",
      dialogFormVisible: false,
      rules: {
        bankId: [{ required: true, trigger: "blur", message: "银行id" }],
        bankName: [{ required: true, trigger: "blur", message: "银行名称" }],
      }
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
    submitUpd(){
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          api.updBank(this.form, (res)=>{
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
