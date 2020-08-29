<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="排序" prop="order">
        <el-input v-model.trim="form.order" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
     <el-form-item label="大类id" prop="bigClassifyId">
        <el-input v-model.trim="form.bigClassifyId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="大类名称" prop="name">
         <el-input v-model.trim="form.name" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>

       <el-form-item label="图片url" prop="imgUrl">
          <div class="block" style="width: 80px; height: 80px;">
               <el-image
                 :preview-src-list="[form.imgUrl]"
                 :src="form.imgUrl"
               ></el-image>
           </div>
        </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
        <el-input value="开发中" autocomplete="off" :disabled="true" v-show="form.state == 2"></el-input>
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
