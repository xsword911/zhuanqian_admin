<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="130px" :rules="rules">
    <el-form-item label="排序" prop="order">
        <el-input v-model="form.order" placeholder="排序"/>
     </el-form-item>

     <el-form-item label="标题" prop="title">
         <el-input v-model="form.title" placeholder="标题"/>
      </el-form-item>

      <el-form-item label="奖励类型" prop="type">
        <el-select v-model="form.type" placeholder="奖励类型" clearable filterable allow-create>
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

    <el-form-item label="随机金额最小值" prop="randomMin">
      <el-input v-model="form.randomMin" placeholder="随机金额最小值"/>
    </el-form-item>

    <el-form-item label="随机金额最大值" prop="randomMax">
      <el-input v-model="form.randomMax" placeholder="随机金额最大值"/>
    </el-form-item>

    <el-form-item label="需要抽奖次数" prop="num">
      <el-input v-model="form.num" placeholder="需要抽奖次数"/>
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
         <el-input v-model.trim="form.desc" autocomplete="off"></el-input>
       </el-form-item>

    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
    type: [{
        type: [{
          value: 0,
          label: '随机'
        },{
          value: 1,
          label: '固定'
        }]
      }],

      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],

      form: {
        id: null,
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],

        type: [{ required: true, trigger: "blur", message: "请输入奖励类型" }],
        randomMin: [{ required: true, trigger: "blur", message: "请输入随机金额最小值" }],
        randomMax: [{ required: true, trigger: "blur", message: "请输入随机金额最大值" }],
        num: [{ required: true, trigger: "blur", message: "请输入需要抽奖次数" }],

        state: [{ required: true, trigger: "blur", message: "请输入状态" }],
      },
    };
  },
  created() {},
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
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          api.updLuckRed(this.form, (res)=>{
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
