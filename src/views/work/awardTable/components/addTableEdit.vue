<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
     <el-form-item label="奖励标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="任务说明" prop="explain">
         <el-input v-model.trim="form.explain" autocomplete="off"></el-input>
       </el-form-item>
      <el-form-item label="任务规则" prop="rule">
         <el-input v-model.trim="form.rule" autocomplete="off"></el-input>
       </el-form-item>

         <el-form-item label="任务等级" prop="level">
           <el-select v-model="form.level" placeholder="任务等级" clearable filterable allow-create>
             <el-option-group
               v-for="group in level"
               :key="group.label"
               :label="group.label">
               <el-option
                 v-for="item in group.level"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-option-group>
           </el-select>
         </el-form-item>

       <el-form-item label="刷新周期" prop="cycle">
         <el-select v-model="form.cycle" placeholder="刷新周期" clearable filterable allow-create>
           <el-option-group
             v-for="group in cycle"
             :key="group.label"
             :label="group.label">
             <el-option
               v-for="item in group.cycle"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-option-group>
         </el-select>
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
        </el-form-item>

        <el-form-item label="奖励" prop="award">
           <el-input v-model.trim="form.award" autocomplete="off" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
         </el-form-item>

         <el-form-item label="任务标记" prop="tip">
           <el-select v-model="form.tip" placeholder="任务状态" clearable filterable allow-create>
             <el-option-group
               v-for="group in tip"
               :key="group.label"
               :label="group.label">
               <el-option
                 v-for="item in group.tip"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-option-group>
           </el-select>
         </el-form-item>

      <el-form-item label="任务类型" prop="type">
        <el-select v-model="form.type" placeholder="任务状态" clearable filterable allow-create>
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

      <el-form-item label="开始时间" prop="begTime">
          <el-date-picker
            v-model="form.begTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            align="right"
            >
          </el-date-picker>
       </el-form-item>

       <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            align="right"
            >
          </el-date-picker>
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

      <el-form-item label="任务分类" prop="sort">
        <el-select v-model="form.sort" placeholder="任务分类">
          <el-option-group
            v-for="group in sort"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.sort"
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
          label: '邀请好友'
        },{
          value: 1,
          label: '分享朋友圈'
        },{
          value: 2,
          label: '加好友'
        },{
          value: 3,
          label: '下载app'
        },{
          value: 4,
          label: '签到奖励'
        }]
      }],
      typeValue: '',      //选中的任务类型

      level: [{
        level: [{
          value: 0,
          label: '新人'
        },{
          value: 1,
          label: '白银会员'
        },{
          value: 2,
          label: '黄金会员'
        },{
          value: 3,
          label: '铂金会员'
        },{
          value: 4,
          label: '钻石会员'
        },{
          value: 5,
          label: '至尊会员'
        }]
      }],
      levelValue: '',      //选中的任务状态

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

      tip: [{
        tip: [{
          value: 0,
          label: '最新'
        },{
          value: 1,
          label: '热门'
        }]
      }],
      tipValue: '',      //标记类型

      sort: [{
        sort: [{
          value: 0,
          label: '热门活动'
        },{
          value: 1,
          label: '限时推荐'
        },{
          value: 2,
          label: '赚赚'
        }]
      }],
      sortValue: '',      //任务分类

      cycle: [{
        cycle: [{
          value: 0,
          label: '只能完成一次'
        },{
          value: 1,
          label: '一天完成一次'
        }]
      }],
      cycleValue: '',      //任务刷新周期

      form: {
        title: '',
        explain: '',
        rule: '',
        cycle: null,
        imgUrl: '',
        award: null,
        tip: null,
        type: null,
        begTime: "",
        endTime: "",
        state: null,
        level: null,
        sort: null,
        admin: 'admin1',
        desc: '',
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入活动标题" }],
        explain: [{ required: true, trigger: "blur", message: "请输入活动说明" }],
        level: [{ required: true, trigger: "blur", message: "请输入活动等级" }],
        rule: [{ required: true, trigger: "blur", message: "请输入活动规则" }],
        cycle: [{ required: true, trigger: "blur", message: "请输入任务刷新周期" }],
        imgUrl: [{ required: true, trigger: "blur", message: "请输入活动图片url" }],
        award: [{ required: true, trigger: "blur", message: "请输入活动奖励金币" }],
        tip: [{ required: true, trigger: "blur", message: "请输入活动标记" }],
        type: [{ required: true, trigger: "blur", message: "请输入活动类型" }],
        begTime: [{ required: true, trigger: "blur", message: "请输入活动开始时间" }],
        endTime: [{ required: true, trigger: "blur", message: "请输入活动结束时间" }],
        state: [{ required: true, trigger: "blur", message: "请输入活动状态" }],
        sort: [{ required: true, trigger: "blur", message: "请输入活动分类" }],
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
      if(util.isEmpty(this.form.imgUrl))
      {
        this.$message.error("填写信息不完整");
        return;
      };
      if(!util.isEmpty(this.form.award)) this.form.award = parseInt(this.form.award);
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          api.addTask(this.form, (res)=>{
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
