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
      <el-form-item label="配置名" prop="key">
        <el-input v-model.trim="form.key" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="配置值" prop="value">
        <el-input v-model.trim="form.value" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="配置类型" prop="type">
        <el-select v-model="form.type" placeholder="奖励类型">
          <el-option-group
            v-for="group in type"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
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
      type: [{
        type: [{
          value: 0,
          label: '登录配置'
        },{
          value: 1,
          label: '客服'
        }]
      }],
      typeValue: '',      //选中的配置类型
      rules: {
        key: [{ required: true, trigger: "blur", message: "请输入配置名" }],
        value: [{ required: true, trigger: "blur", message: "请输入配置值" }],
      },
      form: {
        id: '',
        key: "",
        value: "",
        type: "",
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
      if(util.isEmpty(this.form.key)){
        this.$message.error("配置名不能为空");
        return;
      }
      if(util.isEmpty(this.form.value)){
        this.$message.error("配置值不能为空");
        return;
      }
      this.submitUpd();
    },
    submitUpd(){
      api.updConfig(this.form, (res)=>{
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
