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
          <el-input v-model.trim="form.imgUrl" autocomplete="off" ></el-input>
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
            placeholder="选择日期时间"
            align="right"
            >
          </el-date-picker>
       </el-form-item>

       <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
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
        }]
      }],
      sortValue: '',      //任务分类

      cycle: [{
        cycle: [{
          value: 0,
          label: '只能完成一次'
        }]
      }],
      cycleValue: '',      //任务刷新周期

      form: {
        day: null,
        type: null,
        award: '',
        state: null,
        stateTest: '',
        awardTypeTest: '',
        limitSum: '',
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  mounted() {

  },
  methods: {
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
      this.close();
    },
    submitUpd(){

    },
  },
};
</script>
