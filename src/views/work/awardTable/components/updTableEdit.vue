<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
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
        </el-form-item>

        <el-form-item label="奖励" prop="award">
           <el-input v-model.trim="form.award" autocomplete="off" ></el-input>
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

      <el-form-item label="更新时间" prop="updTime">
        <el-input v-model.trim="form.updTime"  autocomplete="off" clearable :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="操作者" prop="admin">
        <el-input v-model.trim="form.admin"  autocomplete="off" clearable :disabled="true"></el-input>
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
          label: '每天可完成一次'
        }]
      }],
      cycleValue: '',      //任务刷新周期

      form: {
        id: null,
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
        admin: '',
        desc: '',
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
      if(util.isEmpty(this.form.title)){
        this.$message.error('任务标题不能为空');
        return;
      };
      if(util.isEmpty(this.form.explain)){
        this.$message.error('任务说明不能为空');
        return;
      };
        api.updTask(this.form, (res)=>{
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
