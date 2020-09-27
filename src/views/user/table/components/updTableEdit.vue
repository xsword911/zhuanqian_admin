<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="uid" prop="uid">
        <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" :disabled="true" clearable></el-input>
      </el-form-item>
<!--      <el-form-item label="邀请码" prop="code">-->
<!--        <el-input v-model.trim="form.code" autocomplete="off" clearable></el-input>-->
<!--        <div><div style="color:#FF3A00; display:inline-block;">*</div>邀请码为六位数</div>-->
<!--      </el-form-item>-->
      <el-form-item label="手机号" prop="tel">
        <el-input v-model.trim="form.tel" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick">
        <el-input v-model.trim="form.nick" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="头像">
          <div style="display: flex;">
            <div class="block" style="width: 80px; height: 80px;">
                 <el-image
                   :src="form.headUrl"
                 ></el-image>
             </div>

             <el-upload
               class="avatar-uploader"
               :action= "getPostFileUrl()"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
               <img v-if="imgUrlNew" :src="imgUrlNew"  class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
          </div>
          <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议200*200</div>
      </el-form-item>
      <el-form-item label="直属上级" prop="upper">
        <el-input v-model.trim="form.upper" autocomplete="off" clearable :disabled="true"></el-input>
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
import storage from "@/api/storage.js";
export default {
  // name: "TableEdit",
  data() {
    return {
      postFileUrl: '',  //文件上传地址
      options: [{
        options: [{
          value: 0,
          label: '正常'
        },{
          value: 1,
          label: '冻结'
        },{
          value: 2,
          label: '管理员封号'
        }]
      }],
      value: '',      //交易类型
      form: {
        tel: "",
        nick: "",
        account: "",
        state: '',
        upper: '',
        headUrl: '',
        uid: "",
      },
      title: "",
      dialogFormVisible: false,
      imgUrlOld: "",
      imgUrlNew: ''  ,//选择的图片
      imgServeUrl: '',  //图片的服务器地址

      oldHeadImg: '',  //旧头像路径
    };
  },
  created() {
    this.form.uid = storage.getUid();
  },
  methods: {
    //获取文件上传地址
    getPostFileUrl(){
      return api.getPostFileUrl();
    },
          //文件上传成功
          handleAvatarSuccess(res, file) {
            // this.imgUrlNew = URL.createObjectURL(file.raw);
            this.form.headUrl = res.data.url;
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
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
      this.oldHeadImg = this.form.headUrl;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
        if(!util.isEmpty(this.form.nick)){
        		if(this.form.nick.length > 8){
              this.$message.error('昵称长度不能超过8位');
        			return;
        		}
        }
        if(!util.isEmpty(this.form.tel)){
        		var re = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        		if (!re.test(this.form.tel)) {
              this.$message.error('手机号格式错误');
        			return;
        		}
        }
        this.submitUpd();
    },
    submitUpd(){
      let data = {
        uid: this.form.uid,
        nick: this.form.nick,
        tel: this.form.tel,
      };
      if(this.oldHeadImg != this.form.headUrl) data.headUrl = this.form.headUrl;
      api.setUser(data, (res)=>{
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
