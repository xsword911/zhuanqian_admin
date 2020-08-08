<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="用户id" prop="uid">
       <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>
     <el-form-item label="收件人" prop="to">
        <el-input v-model.trim="form.to" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="发件人" prop="from">
         <el-input v-model.trim="form.from" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model.trim="form.content" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      
      <el-form-item label="发送时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      
      <el-form-item label="是否已读" prop="isRead">
        <el-input value="未读" autocomplete="off" :disabled="true" v-show="form.isRead == 0"></el-input>
        <el-input value="已读" autocomplete="off" :disabled="true" v-show="form.isRead == 1"></el-input>
      </el-form-item>
      
      <el-form-item label="是否删除" prop="isDel">
        <el-input value="未删除" autocomplete="off" :disabled="true" v-show="form.isDel == 0"></el-input>
        <el-input value="已删除" autocomplete="off" :disabled="true" v-show="form.isDel == 1"></el-input>
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
