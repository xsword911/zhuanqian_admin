<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="道具类型" prop="propType">
        <el-input v-model.trim="form.propType" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
     <el-form-item label="道具名称" prop="propName">
       <el-input v-model.trim="form.propName" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>
      <el-form-item label="道具数量" prop="propNum">
        <el-input v-model.trim="form.propNum" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="修改时间" prop="updTime">
        <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";

export default {
  // name: "TableEdit",
  data() {
    return {
      form: {
          id: null,
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  mounted() {},
  methods: {
    showEdit(row) {
        this.title = "查看";
        this.form = Object.assign({}, row);
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
          const { msg } = await doEdit(this.form);
          this.$baseMessage(msg, "success");
          this.$refs["form"].resetFields();
          this.dialogFormVisible = false;
          this.$emit("fetchData");
          this.form = this.$options.data().form;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
