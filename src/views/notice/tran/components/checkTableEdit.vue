<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model.trim="form.content" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="图片url" prop="imgUrl">
         <div class="block" style="width: 80px; height: 80px;">
              <el-image
                :preview-src-list="[form.imgUrl]"
                :src="form.imgUrl"
              ></el-image>
          </div>
       </el-form-item>

      <el-form-item label="跳转地址" prop="toUrl">
         <el-input v-model.trim="form.toUrl" autocomplete="off" :disabled="true"  placeholder="跳转地址为空时不跳转"></el-input>
       </el-form-item>

      <el-form-item label="开始时间" prop="begTime">
        <el-input v-model.trim="form.begTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-input v-model.trim="form.endTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
      </el-form-item>
      <el-form-item label="操作者" prop="admin">
        <el-input v-model.trim="form.admin" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="添加时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updTime">
        <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
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
