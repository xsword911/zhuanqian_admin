<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="排序" prop="order">
       <el-input v-model.trim="form.order" autocomplete="off"></el-input>
     </el-form-item>
     <el-form-item label="大类id" prop="bigClassifyId">
        <el-input v-model.trim="form.bigClassifyId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="大类名称" prop="name">
         <el-input v-model.trim="form.name" autocomplete="off"></el-input>
       </el-form-item>

       <el-form-item label="图片url">
          <el-upload
            class="avatar-uploader"
            :action= "getPostFileUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imgUrl" :src="form.imgUrl"  class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议200*200</div> -->
        </el-form-item>

      <el-form-item label="任务状态" prop="state">
        <el-select v-model="form.state" placeholder="任务状态">
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
      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        },{
          value: 2,
          label: '开发中'
        }]
      }],
      stateValue: '',      //选中的任务状态

      form: {
        imgUrl: '',
        state: null,
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        name: [{ required: true, trigger: "blur", message: "请输入任务大类名称" }],
        bigClassifyId: [{ required: true, trigger: "blur", message: "请输入任务大类id" }],
        state: [{ required: true, trigger: "blur", message: "请输入状态" }],
      }
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
            // this.imgUrlNew = URL.createObjectURL(file.raw);
            this.form.imgUrl = res.data.url;
          },
          //上传文件之前的钩子，参数为上传的文件
          beforeAvatarUpload(file) {
            return;
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
    showEdit(row) {
      this.title = "添加";
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      this.form.bigClassifyId = parseInt(this.form.bigClassifyId);
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          api.addTaskBigClassify(this.form, (res)=>{
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
