<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px" style="display: flex; justify-content: space-between;">
      <div>
        <el-form-item label="任务分类" prop="classify">
          <el-input value="抖音" autocomplete="off" :disabled="true" v-show="form.classify == 1"></el-input>
          <el-input value="快手" autocomplete="off" :disabled="true" v-show="form.classify == 2"></el-input>
          <el-input value="微视" autocomplete="off" :disabled="true" v-show="form.classify == 3"></el-input>
          <el-input value="火山小视频" autocomplete="off" :disabled="true" v-show="form.classify == 4"></el-input>
          <el-input value="今日头条" autocomplete="off" :disabled="true" v-show="form.classify == 5"></el-input>
          <el-input value="微信" autocomplete="off" :disabled="true" v-show="form.classify == 6"></el-input>
        </el-form-item>

        <el-form-item label="奖励标题" prop="title">
           <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="任务说明" prop="explain">
            <el-input v-model.trim="form.explain" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
         <el-form-item label="任务规则" prop="rule">
            <el-input v-model.trim="form.rule" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="任务等级" prop="level">
            <el-input value="全部" autocomplete="off" :disabled="true" v-show="form.level == 0"></el-input>
            <el-input value="新人" autocomplete="off" :disabled="true" v-show="form.level == 1"></el-input>
            <el-input value="白银会员" autocomplete="off" :disabled="true" v-show="form.level == 2"></el-input>
            <el-input value="黄金会员" autocomplete="off" :disabled="true" v-show="form.level == 3"></el-input>
            <el-input value="铂金会员" autocomplete="off" :disabled="true" v-show="form.level == 4"></el-input>
            <el-input value="钻石会员" autocomplete="off" :disabled="true" v-show="form.level == 5"></el-input>
            <el-input value="至尊会员" autocomplete="off" :disabled="true" v-show="form.level == 6"></el-input>
          </el-form-item>

          <el-form-item label="刷新周期" prop="cycle">
            <el-input value="只能完成一次" autocomplete="off" :disabled="true" v-show="form.cycle == 0"></el-input>
            <el-input value="每天可完成一次" autocomplete="off" :disabled="true" v-show="form.cycle == 1"></el-input>
            <el-input :value="form.cycle + '天可做一次'" autocomplete="off" :disabled="true" v-show="form.cycle != 0 && form.cycle != 1"></el-input>
          </el-form-item>

           <el-form-item label="图片url" prop="imgUrl">
             <div class="block" style="width: 80px; height: 80px;">
                  <el-image
                    :preview-src-list="[form.imgUrl]"
                    :src="form.imgUrl"
                  ></el-image>
              </div>
           </el-form-item>

           <el-form-item label="宣传文本" prop="taskTxt">
              <el-input v-model.trim="form.taskTxt" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="宣传图片" prop="taskImg">
              <div class="block" style="width: 80px; height: 80px;">
                   <el-image
                     :preview-src-list="[form.taskImg]"
                     :src="form.taskImg"
                   ></el-image>
               </div>
            </el-form-item>

            <el-form-item label="打开链接" prop="taskUrl">
               <el-input v-model.trim="form.taskUrl" autocomplete="off" :disabled="true"></el-input>
             </el-form-item>

             <el-form-item label="打开app" prop="taskApp">
                <el-input value="不打开任何app" autocomplete="off" :disabled="true" v-show="form.taskApp == 0"></el-input>
                <el-input value="微信" autocomplete="off" :disabled="true" v-show="form.taskApp == 1"></el-input>
                <el-input value="抖音" autocomplete="off" :disabled="true" v-show="form.taskApp == 2"></el-input>
                <el-input value="快手" autocomplete="off" :disabled="true" v-show="form.taskApp == 3"></el-input>
              </el-form-item>
              
              <el-form-item label="奖励" prop="award">
                 <el-input v-model.trim="form.award" autocomplete="off" :disabled="true"></el-input>
               </el-form-item>
              
              <el-form-item label="奖励类型" prop="awardType">
                <el-input value="金币" autocomplete="off" :disabled="true" v-show="form.awardType == 0"></el-input>
                <el-input value="现金" autocomplete="off" :disabled="true" v-show="form.awardType == 1"></el-input>
              </el-form-item>
      </div>

      <div>
                 <el-form-item label="标记" prop="tip">
                   <el-input value="NEW" autocomplete="off" :disabled="true" v-show="form.tip == 0"></el-input>
                   <el-input value="HOT" autocomplete="off" :disabled="true" v-show="form.tip == 1"></el-input>
                 </el-form-item>

              <el-form-item label="任务类型" prop="type">
                <el-input value="邀请好友" autocomplete="off" :disabled="true" v-show="form.type == 0"></el-input>
                <el-input value="分享朋友圈" autocomplete="off" :disabled="true" v-show="form.type == 1"></el-input>
                <el-input value="加好友" autocomplete="off" :disabled="true" v-show="form.type == 2"></el-input>
                <el-input value="下载app" autocomplete="off" :disabled="true" v-show="form.type == 3"></el-input>
                <el-input value="点赞" autocomplete="off" :disabled="true" v-show="form.type == 4"></el-input>
              </el-form-item>

              <el-form-item label="发布开始时间" prop="begTime">
                 <el-input v-model.trim="form.begTime" autocomplete="off" :disabled="true"></el-input>
               </el-form-item>

               <el-form-item label="发布截止时间" prop="endTime">
                  <el-input v-model.trim="form.endTime" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

              <el-form-item label="任务状态" prop="state">
                <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
                <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
              </el-form-item>

              <el-form-item label="任务限时(分钟)" prop="doneLong">
                 <el-input v-model.trim="form.doneLong" autocomplete="off" :disabled="true"></el-input>
               </el-form-item>

               <el-form-item label="审核时长(分钟)" prop="auditLong">
                  <el-input v-model.trim="form.auditLong" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

              <el-form-item label="是否需要凭证" prop="isDoneProve">
                <el-input value="不需要凭证" autocomplete="off" :disabled="true" v-show="form.isDoneProve == 0"></el-input>
                <el-input value="需要凭证" autocomplete="off" :disabled="true" v-show="form.isDoneProve == 1"></el-input>
              </el-form-item>

              <el-form-item label="是否需要截图" prop="isDoneImg">
                <el-input value="不需要截图" autocomplete="off" :disabled="true" v-show="form.isDoneImg == 0"></el-input>
                <el-input value="需要截图" autocomplete="off" :disabled="true" v-show="form.isDoneImg == 1"></el-input>
              </el-form-item>

        <!--      <el-form-item label="任务分类" prop="sort">
                <el-input value="热门活动" autocomplete="off" :disabled="true" v-show="form.sort == 0"></el-input>
                <el-input value="限时推荐" autocomplete="off" :disabled="true" v-show="form.sort == 1"></el-input>
                <el-input value="赚赚" autocomplete="off" :disabled="true" v-show="form.sort == 2"></el-input>
              </el-form-item> -->

              <el-form-item label="更新时间" prop="updTime">
                <el-input v-model.trim="form.updTime" :disabled="true" autocomplete="off" clearable></el-input>
              </el-form-item>

              <el-form-item label="操作者" prop="admin">
                <el-input v-model.trim="form.admin" :disabled="true" autocomplete="off" clearable></el-input>
              </el-form-item>

              <el-form-item label="备注" prop="desc">
                <el-input v-model.trim="form.desc" :disabled="true" autocomplete="off" clearable></el-input>
              </el-form-item>
      </div>

    </el-form>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";

export default {
  // name: "TableEdit",
  data() {
    return {
      form: {
        day: null,
        awardType: null,
        award: '',
        state: null,
        stateTest: '',
        awardTypeTest: '',
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  mounted() {},
  methods: {
    showEdit(row) {
        this.title = "查看";
        this.form = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.form.doneLong = this.form.doneLong / 60;
        this.form.auditLong = this.form.auditLong / 60;
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
          const { msg } = await doEdit(this.form);
          this.$baseMessage(msg, "success");
          this.$refs["form"].resetFields();
          this.dialogFormVisible = false;
          this.$emit("fetchData");
          this.form = this.$options.data().form;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
