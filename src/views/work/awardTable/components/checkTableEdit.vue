<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
   <el-form ref="form" :model="form" label-width="80px">
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
         <el-input value="新人" autocomplete="off" :disabled="true" v-show="form.level == 0"></el-input>
         <el-input value="白银会员" autocomplete="off" :disabled="true" v-show="form.level == 1"></el-input>
         <el-input value="黄金会员" autocomplete="off" :disabled="true" v-show="form.level == 2"></el-input>
         <el-input value="铂金会员" autocomplete="off" :disabled="true" v-show="form.level == 3"></el-input>
         <el-input value="钻石会员" autocomplete="off" :disabled="true" v-show="form.level == 4"></el-input>
         <el-input value="至尊会员" autocomplete="off" :disabled="true" v-show="form.level == 5"></el-input>
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

        <el-form-item label="奖励" prop="award">
           <el-input v-model.trim="form.award" autocomplete="off" :disabled="true"></el-input>
         </el-form-item>

         <el-form-item label="标记" prop="tip">
           <el-input value="NEW" autocomplete="off" :disabled="true" v-show="form.tip == 0"></el-input>
           <el-input value="HOT" autocomplete="off" :disabled="true" v-show="form.tip == 1"></el-input>
         </el-form-item>

      <el-form-item label="任务类型" prop="type">
        <el-input value="邀请好友" autocomplete="off" :disabled="true" v-show="form.type == 0"></el-input>
        <el-input value="分享朋友圈" autocomplete="off" :disabled="true" v-show="form.type == 1"></el-input>
        <el-input value="加好友" autocomplete="off" :disabled="true" v-show="form.type == 2"></el-input>
        <el-input value="下载app" autocomplete="off" :disabled="true" v-show="form.type == 3"></el-input>
        <el-input value="签到奖励" autocomplete="off" :disabled="true" v-show="form.type == 4"></el-input>
      </el-form-item>

      <el-form-item label="开始时间" prop="begTime">
         <el-input v-model.trim="form.begTime" autocomplete="off" :disabled="true"></el-input>
       </el-form-item>

       <el-form-item label="结束时间" prop="endTime">
          <el-input v-model.trim="form.endTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

      <el-form-item label="任务状态" prop="state">
        <el-input value="关闭" autocomplete="off" :disabled="true" v-show="form.state == 0"></el-input>
        <el-input value="开启" autocomplete="off" :disabled="true" v-show="form.state == 1"></el-input>
      </el-form-item>

      <el-form-item label="任务分类" prop="sort">
        <el-input value="热门活动" autocomplete="off" :disabled="true" v-show="form.sort == 0"></el-input>
        <el-input value="限时推荐" autocomplete="off" :disabled="true" v-show="form.sort == 1"></el-input>
        <el-input value="赚赚" autocomplete="off" :disabled="true" v-show="form.sort == 2"></el-input>
      </el-form-item>

      <el-form-item label="更新时间" prop="updTime">
        <el-input v-model.trim="form.updTime" :disabled="true" autocomplete="off" clearable></el-input>
      </el-form-item>

      <el-form-item label="操作者" prop="admin">
        <el-input v-model.trim="form.admin" :disabled="true" autocomplete="off" clearable></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input v-model.trim="form.desc" :disabled="true" autocomplete="off" clearable></el-input>
      </el-form-item>

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
