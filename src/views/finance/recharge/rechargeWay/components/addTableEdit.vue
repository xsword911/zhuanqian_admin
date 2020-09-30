<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="96px"
      :rules="rules"
    >
      <el-form-item
        label="排序"
        prop="order"
      >
        <el-input
          v-model.trim="form.order"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="渠道大类"
        prop="typeId"
      >
        <el-select
          v-model="form.typeId"
          placeholder="渠道大类"
        >
          <el-option-group
            v-for="group in rechargeType"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.rechargeType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item
        label="渠道名"
        prop="wayName"
      >
        <el-input
          v-model.trim="form.wayName"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="渠道id"
        prop="wayId"
      >
        <el-input
          v-model.trim="form.wayId"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="充值最大值"
        prop="rechargeMax"
      >
        <el-input v-model.trim="form.rechargeMax" />
      </el-form-item>
      <el-form-item
        label="充值最小值"
        prop="rechargeMin"
      >
        <el-input v-model.trim="form.rechargeMin" />
      </el-form-item>

      <el-form-item
        label="状态"
        prop="state"
      >
        <el-select
          v-model="form.state"
          placeholder="状态"
        >
          <el-option-group
            v-for="group in state"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item
        label="备注"
        prop="desc"
      >
        <el-input
          v-model.trim="form.desc"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label=""
        prop=""
      >
        <div style="color: #ff0000;">
          *充值金额范围受到：等级设置、充值渠道设置、系统设置中资金配置，3者共同影响。3种设置中，值最大者生效。
        </div>
      </el-form-item>
    </el-form>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="save"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  name: "TableEdit",
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
      stateValue: '',      //选中的任务状态

      form: {
        type: 2,
        typeId: null,
        order: null,
        wayId: null,
        state: null,
        wayName: "",
      },
      title: "",
      dialogFormVisible: false,
      rechargeType: [{
        rechargeType: []
      }],

      rules: {
        typeId: [{ required: true, trigger: "blur", message: "请输入类型id" }],
        order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        wayId: [{ required: true, trigger: "blur", message: "请输入渠道id" }],
        state: [{ required: true, trigger: "blur", message: "请选择状态" }],
        wayName: [{ required: true, trigger: "blur", message: "请输入渠道名" }],
        rechargeMax: [{ required: true, trigger: "blur", message: "请输入充值最大值" }],
        rechargeMin: [{ required: true, trigger: "blur", message: "请输入充值小值" }],
      }
    };
  },
  created() {},
  methods: {
    showEdit(row) {
      console.log(row);
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.rechargeType[0].rechargeType = row;
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
          api.addRechargeWay(this.form, (res)=>{
            let code = api.getCode(res);
            if(code == 0){
              this.$baseMessage("添加成功", "success");
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
        } else {
          this.$message.error("填写信息不完整");
          return false;
        }
      });
    },
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left:30rpx;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
