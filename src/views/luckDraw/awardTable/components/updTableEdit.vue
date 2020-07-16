<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="奖励标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="奖励内容" prop="award">
        <el-input v-model.trim="form.award" autocomplete="off" clearable></el-input>
      </el-form-item>

      <el-form-item label="剩余奖品数量" prop="limitSum">
           <el-select v-model="form.limitSum" placeholder="剩余奖品数量" clearable filterable allow-create>
             <el-option-group
               v-for="group in limitSum"
               :key="group.label"
               :label="group.label">
               <el-option
                 v-for="item in group.limitSum"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-option-group>
           </el-select>
      </el-form-item>

      <el-form-item label="奖励类型" prop="awardType">
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

      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state" placeholder="状态">
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
          label: '金币'
        },{
          value: 1,
          label: '现金'
        },{
          value: 10,
          label: '其他'
        }]
      }],
      typeValue: '',      //选中的奖励类型

      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],
      stateValue: '',      //交易类型

      limitSum: [{
        limitSum: [{
          value: -1,
          label: '不限制'
        }]
      }],
      limitSumValue: '',    //剩余奖励数量
      form: {
        day: null,
        type: null,
        award: '',
        state: null,
        stateTest: '',
        awardTypeTest: '',
        limitSum: '',
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
      this.close();
    },
    submitUpd(){

    },
  },
};
</script>
