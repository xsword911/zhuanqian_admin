<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="110px" :rules="rules">
    <el-form-item label="排序" prop="order">
        <el-input v-model="form.order" placeholder="排序"/>
     </el-form-item>

     <el-form-item label="奖励标题" prop="title">
         <el-input v-model="form.title" placeholder="奖励标题"/>
      </el-form-item>

      <el-form-item label="奖励金额" prop="award">
         <el-input v-model.trim="form.award" autocomplete="off" type="number"></el-input>
       </el-form-item>

    <el-form-item label="图片url" prop="imgUrl">
      <div style="display: flex;">
        <div class="block" style="width: 80px; height: 80px;">
             <el-image
               :src="form.imgUrl"
             ></el-image>
         </div>

         <el-upload
           class="avatar-uploader"
           :action= "getPostFileUrl()"
           :show-file-list="false"
           :on-success="handleAvatarSuccess">
           <img v-if="imgUrlNew" :src="imgUrlNew"  class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>
      </div>
	    <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议100*100</div>
     </el-form-item>

      <el-form-item label="奖励类型" prop="type">
        <el-select v-model="form.type" placeholder="奖励类型" clearable filterable allow-create>
          <el-option-group
            v-for="group in awardType"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.awardType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
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

      <el-form-item label="抽中权重" prop="weight">
         <el-input v-model.trim="form.weight" autocomplete="off"
         onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
         </el-input>
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
    awardType: [{
        awardType: [{
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
      awardTypeValue: '',      //选中的任务类型

      limitSum: [{
          limitSum: [{
            value: -1,
            label: '不限制'
          }]
        }],
        limitSumValue: '',      //选中的任务类型

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
        id: null,
        order: "",
        title: "",
        imgUrl: '',
        type: null,
        award: '',
        limitSum: null,
        weight: null,
        state: null,
        desc: "",
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        title: [
          { required: true, trigger: "blur", message: "请输入奖励标题" },
          { max: 6, message: "奖励标题最多6个字符", trigger: "blur" },
        ],
        imgUrl: [{ required: true, trigger: "blur", message: "请输入奖励图片" }],
        type: [{ required: true, trigger: "blur", message: "请输入奖励类型" }],
        award: [{ required: true, trigger: "blur", message: "请输入奖励金额" }],
        limitSum: [{ required: true, trigger: "blur", message: "请输入剩余奖品数量" }],
        weight: [{ required: true, trigger: "blur", message: "请输入抽中权重" }],
        state: [{ required: true, trigger: "blur", message: "请输入状态" }],
      },
      imgUrlNew: ''  ,//选择的图片
    };
  },
  created() {},
  methods: {
    //获取文件上传地址
    getPostFileUrl(){
      return api.getPostFileUrl();
    },
          //文件上传成功
          handleAvatarSuccess(res, file) {
            console.log(res);
            // this.imgUrlNew = URL.createObjectURL(file.raw);
            this.form.imgUrl = res.data.url;
          },
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
          api.updLucky(this.form, (res)=>{
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
    //获取当前月份一共有几天
    mGetDate(){
         var date = new Date();
         var year = date.getFullYear();
         var month = date.getMonth()+1;
         var d = new Date(year, month, 0);
         return d.getDate();
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
