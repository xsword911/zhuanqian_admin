<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="管理员uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="ip" prop="ip">
        <el-input v-model.trim="form.ip" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="ip所在地" prop="ipArea">
        <el-input v-model.trim="form.ipArea" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="操作内容" prop="content">
        <el-input v-model.trim="form.content" autocomplete="off" :disabled="true" type="textarea" rows="10"></el-input>
      </el-form-item>

      <el-form-item label="操作类型" prop="typeTest">
        <el-input v-model.trim="form.typeTest" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" autocomplete="off" :disabled="true"></el-input>
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
        day: null,
        awardType: null,
        award: '',
        state: null,
        stateTest: '',
        awardTypeTest: '',
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
