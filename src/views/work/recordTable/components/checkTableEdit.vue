<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="1050px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px" style="display: flex; justify-content: space-between;">
      <div>
          <el-form-item label="发布者" prop="uid">
            <el-input v-model.trim="form.uid" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="完成者" prop="doneUid">
             <el-input v-model.trim="form.doneUid" autocomplete="off" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="订单号" prop="sn">
              <el-input v-model.trim="form.sn" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>

          <el-form-item label="任务标题" prop="title">
             <el-input v-model.trim="form.title" autocomplete="off" :disabled="true"></el-input>
           </el-form-item>
          <el-form-item label="任务说明" prop="explain">
              <el-input v-model.trim="form.explain" autocomplete="off" :disabled="true" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="任务规则" prop="rule">
             <el-input v-model.trim="form.rule" autocomplete="off" :disabled="true" type="textarea"></el-input>
          </el-form-item>
          
          <el-form-item label="任务等级" prop="taskLv">
            <el-input value="全部" autocomplete="off" :disabled="true" v-show="form.taskLv == 0"></el-input>
            <el-input value="新人" autocomplete="off" :disabled="true" v-show="form.taskLv == 1"></el-input>
            <el-input value="白银会员" autocomplete="off" :disabled="true" v-show="form.taskLv == 2"></el-input>
            <el-input value="黄金会员" autocomplete="off" :disabled="true" v-show="form.taskLv == 3"></el-input>
            <el-input value="铂金会员" autocomplete="off" :disabled="true" v-show="form.taskLv == 4"></el-input>
            <el-input value="钻石会员" autocomplete="off" :disabled="true" v-show="form.taskLv == 5"></el-input>
            <el-input value="至尊会员" autocomplete="off" :disabled="true" v-show="form.taskLv == 6"></el-input>
          </el-form-item>

            <el-form-item label="任务分类" prop="classify">
              <el-input value="抖音" autocomplete="off" :disabled="true" v-show="form.classify == 1"></el-input>
              <el-input value="快手" autocomplete="off" :disabled="true" v-show="form.classify == 2"></el-input>
              <el-input value="微视" autocomplete="off" :disabled="true" v-show="form.classify == 3"></el-input>
              <el-input value="火山小视频" autocomplete="off" :disabled="true" v-show="form.classify == 4"></el-input>
              <el-input value="今日头条" autocomplete="off" :disabled="true" v-show="form.classify == 5"></el-input>
              <el-input value="微信" autocomplete="off" :disabled="true" v-show="form.classify == 6"></el-input>
            </el-form-item>

            <el-form-item label="任务类型" prop="type">
              <el-input value="邀请好友" autocomplete="off" :disabled="true" v-show="form.type == 0"></el-input>
              <el-input value="分享朋友圈" autocomplete="off" :disabled="true" v-show="form.type == 1"></el-input>
              <el-input value="加好友" autocomplete="off" :disabled="true" v-show="form.type == 2"></el-input>
              <el-input value="下载app" autocomplete="off" :disabled="true" v-show="form.type == 3"></el-input>
              <el-input value="点赞" autocomplete="off" :disabled="true" v-show="form.type == 4"></el-input>
            </el-form-item>

          <el-form-item label="任务状态" prop="state">
            <el-input value="进行中" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
            <el-input value="未审核" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
            <el-input value="已完成" autocomplete="off" :disabled="true" v-show="form.state == 2"></el-input>
            <el-input value="任务失败" autocomplete="off" :disabled="true" v-show="form.state == 3"></el-input>
            <el-input value="任务取消" autocomplete="off" :disabled="true" v-show="form.state == 10"></el-input>
          </el-form-item>

          <el-form-item label="刷新周期" prop="cycle">
            <el-input value="只能完成一次" autocomplete="off" :disabled="true" v-show="form.cycle == 0"></el-input>
            <el-input value="每天可完成一次" autocomplete="off" :disabled="true" v-show="form.cycle == 1"></el-input>
            <el-input :value="form.cycle + '天可做一次'" autocomplete="off" :disabled="true" v-show="form.cycle != 0 && form.cycle != 1"></el-input>
          </el-form-item>

          <el-form-item label="任务数量" prop="sum">
              <el-input v-model.trim="form.sum" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
      </div>

      <div>
        <el-form-item label="任务图片" prop="imgUrl">
           <div class="block" style="width: 80px; height: 80px;">
                <el-image
                  :preview-src-list="[form.imgUrl]"
                  :src="form.imgUrl"
                ></el-image>
            </div>
         </el-form-item>
        <el-form-item label="宣传文本" prop="taskTxt">
            <el-input v-model.trim="form.taskTxt" autocomplete="off" :disabled="true" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="宣传图片" prop="taskImg">
            <div class="block" style="width: 80px; height: 80px;">
                 <el-image
                   :preview-src-list="[form.taskImg]"
                   :src="form.taskImg"
                 ></el-image>
             </div>
          </el-form-item>

        <el-form-item label="任务凭证" prop="doneProve">
            <el-input v-model.trim="form.doneProve" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>

        <el-form-item label="任务截图" prop="doneImg">
          <div class="block" style="width: 80px; height: 80px;">
               <el-image
                 :preview-src-list="[form.doneImg]"
                 :src="form.doneImg"
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

          <el-form-item label="接受时间" prop="receiveTime">
             <el-input v-model.trim="form.receiveTime" autocomplete="off" :disabled="true"></el-input>
           </el-form-item>
          <el-form-item label="完成时间" prop="finishTime">
             <el-input v-model.trim="form.finishTime" autocomplete="off" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="审核时间" prop="auditTime">
              <el-input v-model.trim="form.auditTime" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="审核人" prop="auditName">
               <el-input v-model.trim="form.auditName" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input v-model.trim="form.desc" autocomplete="off" :disabled="true"></el-input>
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
        account: '',
        sn: '',
        day: null,
        finishTime: '',
        awardType: null,
        award: '',
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
        this.form.doneLong = (this.form.doneLong / 60).toFixed(2);
        this.form.auditLong = (this.form.auditLong / 60).toFixed(2);
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
