<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="1050px"
    @close="close"
  >
  <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="display: flex; justify-content: space-between;">
        <div>
          <el-form-item label="任务分类" prop="classify">
            <el-select v-model="form.classify" placeholder="任务分类" clearable filterable allow-create>
              <el-option-group
                v-for="group in taskClassify"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.taskClassify"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>


           <el-form-item label="任务标题" prop="title">
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
                <div><div style="color:#FF3A00; display:inline-block;">*</div>注意：上传图片大小建议200*200</div>
              </el-form-item>

              <el-form-item label="宣传文本" prop="taskTxt">
                 <el-input v-model.trim="form.taskTxt" autocomplete="off" ></el-input>
               </el-form-item>

             <el-form-item label="宣传图片">
                <el-upload
                  class="avatar-uploader"
                  :action= "getPostFileUrl()"
                  :show-file-list="false"
                  :on-success="handleTaskImgSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.taskImg" :src="form.taskImg"  class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
        </div>

        <div>
          <el-form-item label="打开链接" prop="taskUrl">
               <el-input v-model.trim="form.taskUrl" autocomplete="off"></el-input>
            </el-form-item>

           <el-form-item label="打开app" prop="taskApp">
             <el-select v-model="form.taskApp" placeholder="打开app" clearable filterable allow-create>
               <el-option-group
                 v-for="group in taskApp"
                 :key="group.label"
                 :label="group.label">
                 <el-option
                   v-for="item in group.taskApp"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-option-group>
             </el-select>
           </el-form-item>

           <el-form-item label="奖励" prop="award">
             <el-input v-model.trim="form.award" autocomplete="off" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
           </el-form-item>

          <el-form-item label="奖励类型" prop="awardType">
            <el-select v-model="form.awardType" placeholder="奖励类型" clearable filterable allow-create>
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

          <el-form-item label="任务数量" prop="sum">
             <el-input v-model.trim="form.sum" autocomplete="off" type="number"></el-input>
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

                <el-form-item label="发布开始时间" prop="begTime">
                    <el-date-picker
                      v-model="form.begTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间"
                      align="right"
                      >
                    </el-date-picker>
                 </el-form-item>

                 <el-form-item label="发布截止时间" prop="endTime">
                    <el-date-picker
                      v-model="form.endTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间"
                      align="right"
                      >
                    </el-date-picker>
                  </el-form-item>
        </div>

        <div>
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


          <el-form-item label="任务审核(分钟)" prop="doneLong">
                    <el-input v-model.trim="form.doneLong" autocomplete="off" clearable type="number"></el-input>
                </el-form-item>

                <el-form-item label="任务审核(分钟)" prop="auditLong">
                    <el-input v-model.trim="form.auditLong" autocomplete="off" clearable type="number"></el-input>
                </el-form-item>

                  <el-form-item label="任务是否需要凭证" prop="isDoneProv">
                    <el-select v-model="form.isDoneProv" placeholder="是否需要凭证" clearable filterable allow-create>
                      <el-option-group
                        v-for="group in isDoneProv"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.isDoneProv"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="任务是否需要截图" prop="isDoneImg">
                    <el-select v-model="form.isDoneImg" placeholder="是否需要截图" clearable filterable allow-create>
                      <el-option-group
                        v-for="group in isDoneImg"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.isDoneImg"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-form-item>

          <!--      <el-form-item label="任务分类" prop="sort">
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
                </el-form-item> -->

                <el-form-item label="备注" prop="desc">
                  <el-input v-model.trim="form.desc" autocomplete="off" clearable></el-input>
                </el-form-item>
        </div>

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
import storage from "@/api/storage.js";
export default {
  name: "TableEdit",
  data() {
    return {
      type: [{
        type: []
      }],
      typeValue: '',      //选中的任务类型

      level: [],
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

      awardType: [{
        awardType: [{
          value: 0,
          label: '金币'
        },{
          value: 1,
          label: '现金'
        }]
      }],

      tip: [{
        tip: [{
          value: 0,
          label: 'NEW'
        },{
          value: 1,
          label: 'HOT'
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

      taskApp: [{
        taskApp: [{
          value: 0,
          label: '不打开任何app'
        },{
          value: 1,
          label: '微信'
        },{
          value: 2,
          label: '抖音'
        },{
          value: 3,
          label: '快手'
        }]
      }],

      isDoneProv: [{
        isDoneProv: [{
          value: 0,
          label: '不需要凭证'
        },{
          value: 1,
          label: '需要凭证'
        }]
      }],

      isDoneImg: [{
        isDoneImg: [{
          value: 0,
          label: '不需要截图'
        },{
          value: 1,
          label: '需要截图'
        }]
      }],

      taskClassify: [{
        taskClassify: []
      }],

      form: {
        title: '',
        explain: '',
        rule: '',
        cycle: null,
        imgUrl: '',
        taskImg: '',
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
        uid: '',
      },
      title: "",
      dialogFormVisible: false,

      rules: {
        classify: [{ required: true, trigger: "blur", message: "请选择任务分类" }],
        title: [{ required: true, trigger: "blur", message: "请输入活动标题" }],
        explain: [{ required: true, trigger: "blur", message: "请输入活动说明" }],
        level: [{ required: true, trigger: "blur", message: "请输入活动等级" }],
        // rule: [{ required: true, trigger: "blur", message: "请输入活动规则" }],
        cycle: [{ required: true, trigger: "blur", message: "请输入任务刷新周期" }],
        award: [{ required: true, trigger: "blur", message: "请输入活动奖励金币" }],
        sum: [{ required: true, trigger: "blur", message: "请输入活动数量" }],
        tip: [{ required: true, trigger: "blur", message: "请输入活动标记" }],
        type: [{ required: true, trigger: "blur", message: "请输入活动类型" }],
        isDoneProv: [{ required: true, trigger: "blur", message: "请选择是否需要凭证" }],
        isDoneImg: [{ required: true, trigger: "blur", message: "请选择是否需要截图" }],
        begTime: [{ required: true, trigger: "blur", message: "请输入活动开始时间" }],
        endTime: [{ required: true, trigger: "blur", message: "请输入活动结束时间" }],
        auditLong: [{ required: true, trigger: "blur", message: "请输入审核时长(分钟)" }],
        awardType: [{ required: true, trigger: "blur", message: "请选择奖励类型" }],
        doneLong: [{ required: true, trigger: "blur", message: "请输入任务限时(分钟)" }],
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

          //文件上传成功
          handleTaskImgSuccess(res, file) {
            // this.imgUrlNew = URL.createObjectURL(file.raw);
            this.form.taskImg = res.data.url;
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
    showEdit(row, taskClassifyList, level) {
      this.type = row;   //获取任务类型
      this.taskClassify[0].taskClassify = [];
      taskClassifyList.forEach((item,index) =>{
        let obj = {};
        obj.value = item.classifyId;
        obj.label = item.name;
        this.taskClassify[0].taskClassify.push(obj);
      });
      this.level = level;
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
      if(!util.isEmpty(this.form.award)) this.form.award = parseInt(this.form.award);
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.form.doneLong = parseInt(this.form.doneLong) * 60;   //任务限时分钟转为秒
          this.form.auditLong = parseInt(this.form.auditLong) * 60; //审核时长分钟转为秒
          this.form.uid = storage.getUid();
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
