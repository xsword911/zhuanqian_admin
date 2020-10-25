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
     <el-form-item label="奖励标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

       <el-form-item label="图片url" prop="imgUrl">
          <div class="block" style="width: 80px; height: 80px;">
               <el-image
                 :preview-src-list="[form.imgUrl]"
                 :src="form.imgUrl"
               ></el-image>
           </div>
        </el-form-item>

      <el-form-item label="奖励类型" prop="type">
        <el-input v-model.trim="form.awardTypeTest" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

     <el-form-item label="道具类型" prop="award" v-if="form.type == 2">
       <el-input v-model.trim="form.propName" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>

     <el-form-item label="奖励数量" prop="award">
       <el-input v-model.trim="form.award" autocomplete="off" :disabled="true"></el-input>
     </el-form-item>

      <el-form-item label="剩余数量" prop="limitSum">
        <el-input v-model.trim="form.limitSumTest" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="抽中权重" prop="weight">
        <el-input v-model.trim="form.weight" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" :disabled="true" autocomplete="off" clearable></el-input>
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
