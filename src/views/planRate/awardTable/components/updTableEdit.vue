<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
 <el-form-item label="排序" prop="order">
   <el-input v-model="form.order" clearable></el-input>
 </el-form-item>
 <el-form-item label="存款计划名称" prop="planName">
   <el-input v-model="form.planName" clearable></el-input>
 </el-form-item>

 <el-form-item label="存款天数" prop="planDays">
   <el-input v-model="form.planDays" clearable></el-input>
 </el-form-item>
 <el-form-item label="存款利率" prop="planRate">
   <el-input v-model="form.planRate" clearable></el-input>
 </el-form-item>
 <el-form-item label="服务费" prop="planServe">
   <el-input v-model="form.planServe" clearable></el-input>
 </el-form-item>

 <el-form-item label="状态" prop="state">
   <el-select v-model="form.state" placeholder="状态" clearable>
     <el-option-group
       v-for="group in state"
       :key="group.label"
       :label="group.label">
       <el-option
         v-for="item in group.state"
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
      <el-form-item label="" prop="">
        注: 存款利率和服务费请按照正确格式填写
        如：1% 填写100
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
      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],
      stateValue: '',      //选中的配置类型
      rules: {
        order: [{ required: true, message: "请输入排序", trigger: "blur"}],
        planName: [{ required: true, message: "请输入存款计划名称", trigger: "blur"}],
        planDays: [{ required: true, message: "请输入存款天数", trigger: "blur"}],
        planRate: [{ required: true, message: "请输入存款利率", trigger: "blur"}],
        planServe: [{ required: true, message: "请输入服务费", trigger: "blur"}],
        state: [{ required: true, message: "请输入状态", trigger: "blur"}],
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
      api.updPlanRate(this.form, (res)=>{
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
