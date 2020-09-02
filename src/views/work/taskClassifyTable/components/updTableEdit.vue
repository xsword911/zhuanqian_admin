<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="排序" prop="order">
        <el-input v-model.trim="form.order" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="大类" prop="bigClassifyId">
        <el-select v-model="form.bigClassifyId" placeholder="大类">
          <el-option-group
            v-for="group in bigClassify"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.bigClassify"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>


      <el-form-item label="子类名称" prop="name">
         <el-input v-model.trim="form.name" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="子类id" prop="classifyId">
          <el-input v-model.trim="form.classifyId" autocomplete="off"></el-input>
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
          <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议200*200</div>
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
        },{
          value: 2,
          label: '开发中'
        }]
      }],
      stateValue: '',      //选中的任务状态

      bigClassify: [{
        bigClassify: []
      }],

      form: {
        id: null,
        imgUrl: ''
      },
      title: "",
      dialogFormVisible: false,
      imgUrlOld: "",
      imgUrlNew: ''  ,//选择的图片
      imgServeUrl: '',  //图片的服务器地址
    };
  },
  mounted() {

  },
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
    showEdit(row, bigClassifyList) {
      this.bigClassify[0].bigClassify = bigClassifyList;
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
      if(util.isEmpty(this.form.bigClassifyId)){
        this.$message.error('大类id不能为空');
        return;
      };
      if(util.isEmpty(this.form.name)){
        this.$message.error('大类名称不能为空');
        return;
      };
      if(util.isEmpty(this.form.classifyId)){
        this.$message.error('子类id不能为空');
        return;
      };
      if(util.isEmpty(this.form.order)){
        this.$message.error('排序不能为空');
        return;
      };
        api.updTaskClassify(this.form, (res)=>{
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
    submitUpd(){

    },
  },
};
</script>
