<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
<el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="账单号" prop="sn">
        <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="转换金额" prop="money">
        <el-input v-model.trim="form.money" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="转换金币" prop="gold">
        <el-input v-model.trim="form.gold" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="提交时间" prop="addTime">
        <el-input v-model.trim="form.addTime" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="type">
        <el-input value="金币转余额" autocomplete="off" :disabled="true" v-show="form.type == 0"></el-input>
        <el-input value="余额转金币" autocomplete="off" :disabled="true" v-show="form.type == 1"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input value="审核成功" autocomplete="off" v-if="form.state != 0" :disabled="true"></el-input>
        <el-select v-model="form.state" placeholder="审核状态" v-if="form.state == 0">
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
      <el-form-item label="审核人" prop="admin">
        <el-input v-model.trim="form.admin" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="审核时间" prop="updTime">
        <el-input v-model.trim="form.updTime" autocomplete="off" :disabled="true"></el-input>
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
      state: [{
        state: [{
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
      stateValue: '',      //审核状态
      form: {
        id: '',
        state: null,
        desc: '',
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
    submitUpd(){
      this.form.admin = "admin2";
      api.updMoneyDraw(this.form, (res)=>{
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
