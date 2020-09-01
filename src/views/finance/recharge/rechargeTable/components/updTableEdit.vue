<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-input v-model.trim="form.id" autocomplete="off" :disabled="true" v-if="false"></el-input> -->
    <el-form-item label="uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="账单号" prop="sn">
        <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="money">
        <el-input v-model.trim="form.money" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="提交时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state" placeholder="状态">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
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
      options: [{
        options: [{
          value: -1,
          label: '未提交'
        },{
          value: 0,
          label: '未审核'
        },{
          value: 1,
          label: '审核通过'
        },{
          value: 2,
          label: '审核未通过'
        }]
      }],
      value: '',      //交易类型
      form: {
        id: '',
        state: null,
        desc: '',
      },
      form2: {
        id: '',
        state: null,
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
        this.title = "审核";
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
      this.form2.admin = "admin1";
      this.form2.id = this.form.id;
      this.form2.state = this.form.state;
      if(!util.isEmpty(this.form.desc)) this.form2.desc = this.form.desc;
      api.updMoneyRecharge(this.form2, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          this.$baseMessage("审核成功", "success");
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
