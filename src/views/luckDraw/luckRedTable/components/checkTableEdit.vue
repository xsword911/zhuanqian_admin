<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="120px">
     <el-form-item label="排序" prop="order">
        <el-input v-model.trim="form.order" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
     <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="随机金额最小值" prop="randomMin">
         <el-input v-model.trim="form.randomMin" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>
     <el-form-item label="随机金额最大值" prop="randomMax">
       <el-input v-model.trim="form.randomMax" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>
     <el-form-item label="需要抽奖次数" prop="num">
       <el-input v-model.trim="form.num" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>

      <el-form-item label="奖励类型" prop="type">
        <el-input v-model.trim="form.typeTest" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-input v-model.trim="form.stateTest" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

     <el-form-item label="更新时间" prop="updTime">
       <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" :disabled="true" autocomplete="off" clearable></el-input>
      </el-form-item>

     <el-form-item>
       <div style="color: #ff0000;">
         红包最多只能同时开启5个!
       </div>
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
