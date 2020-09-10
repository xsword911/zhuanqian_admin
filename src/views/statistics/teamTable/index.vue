<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">
      <vab-query-form-right-panel style="flex: 1;">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input
              v-model="queryForm.uid"
              placeholder="用户id"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="queryForm.account"
              placeholder="用户名"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="branchValue"
              placeholder="下级"
              clearable
            >
              <el-option-group
                v-for="group in branch"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.branch"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="searchTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <div
      v-if="userEn != null && list != null"
      class="userInfo"
    >
      <div class="info_left">
        <!--        <div class="">
          <div>用户头像：</div>
          <el-avatar
            :size="60"
            src=""
            @error="errorHandler"
          >
            <img :src="userEn.headUrl">
          </el-avatar>
        </div> -->

        <div class="">
          <div>用户id：</div>
          <div>{{ userEn.uid }}</div>
        </div>

        <div class="">
          <div>用户名：</div>
          <div>{{ userEn.account }}</div>
        </div>

        <div class="">
          <div>昵称：</div>
          <div>{{ userEn.nick }}</div>
        </div>

        <div class="">
          <div>手机号：</div>
          <div>{{ userEn.tel }}</div>
        </div>

        <div class="">
          <div>任务收入：</div>
          <div>￥{{ list.moneyTaskAdd }}</div>
        </div>

        <div class="">
          <div>发布支出：</div>
          <div>￥{{ list.moneyTaskLose }}</div>
        </div>

        <div class="">
          <div>任务次数：</div>
          <div>{{ list.taskSum }}</div>
        </div>

        <div class="">
          <div>活动收入：</div>
          <div>￥{{ list.moneyActiveAdd }}</div>
        </div>

        <div class="">
          <div>活动支出：</div>
          <div>￥{{ list.moneyActiveLose }}</div>
        </div>

        <div class="">
          <div>充值次数：</div>
          <div>{{ list.rechargeSum }}</div>
        </div>

        <div class="">
          <div>充值金额：</div>
          <div>￥{{ list.rechargeMoney }}</div>
        </div>
      </div>

      <div class="info_right">
        <div class="">
          <div>首充金额：</div>
          <div>￥{{ list.firstRechargeMoney }}</div>
        </div>

        <div class="">
          <div>首充人数：</div>
          <div>{{ list.firstRechargeMoneyNum }}</div>
        </div>

        <div class="">
          <div>提现次数：</div>
          <div>{{ list.drawSum }}</div>
        </div>

        <div class="">
          <div>提现金额：</div>
          <div>￥{{ list.drawMoney }}</div>
        </div>

        <div class="">
          <div>加款：</div>
          <div>￥{{ list.moneyIns }}</div>
        </div>

        <div class="">
          <div>
            扣款：
          </div>
          <div>￥{{ list.moneySubtract }}</div>
        </div>

        <div class="">
          <div>
            代理佣金：
          </div>
          <div>￥{{ list.moneyAgency }}</div>
        </div>

        <div class="">
          <div>盈利：</div>
          <div>￥{{ list.money }}</div>
        </div>

        <div class="">
          <div>子属下级：</div>
          <div>{{ userEn.subSum }}</div>
        </div>

        <div class="">
          <div>所有下级：</div>
          <div>{{ userEn.allSubSum }}</div>
        </div>

        <div class="">
          <div>注册人数：</div>
          <div>{{ list.isRegisterToday }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import checkTableEdit from "./components/checkTableEdit";
import checkMoneyTableEdit from "./components/checkTableEdit1.vue";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  //name: "ComprehensiveTable",
  // components: {
  //   checkTableEdit,
  //   checkMoneyTableEdit
  // },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      branch:[{
        branch:[{
          label: "直系下属",
          value: 1
        },{
          label: "所有下属",
          value: 2
        },]
      }],
      branchValue: 1,

      imgShow: true,
      list: null, //团队总览
      userEn: null,  //用户信息
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        uid: '',
      },
      showData: false,  //数据是否显示

      searchTime: '', //筛选的时间范围
    };
  },
  created() {
    //this.fetchData();
    // this.getUserInfo();
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    tableSortChange() {
      // const imageList = [];
      // this.$refs.tableSort.tableData.forEach((item, index) => {
      //   imageList.push(item.img);
      // });
      // this.imageList = imageList;
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    // handleAdd() {
    //   this.$refs["edit"].showEdit();
    // },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleCheckMoneyEdit(row){
      this.$refs["checkMoneyEdit"].showEdit(row);
    },
    // handleDelete(row) {
    //   if (row.id) {
    //     this.$baseConfirm("你确定要删除当前项吗", null, async () => {
    //       const { msg } = await doDelete({ ids: row.id });
    //       this.$baseMessage(msg, "success");
    //       this.fetchData();
    //     });
    //   } else {
    //     if (this.selectRows.length > 0) {
    //       const ids = this.selectRows.map((item) => item.id).join();
    //       this.$baseConfirm("你确定要删除选中项吗", null, async () => {
    //         const { msg } = await doDelete({ ids: ids });
    //         this.$baseMessage(msg, "success");
    //         this.fetchData();
    //       });
    //     } else {
    //       this.$baseMessage("未选中任何行", "error");
    //       return false;
    //     }
    //   }
    // },
    errorHandler() {
      return true
    },
    handleSizeChange(val) {
      this.queryForm.count = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.fetchData();
    },
    handleQuery() {
      this.listLoading = true;
      this.queryForm.page = 1;
      //查询下级
      if(this.branchValue == 1) this.queryForm.isSubAll = false;
      if(this.branchValue == 2) this.queryForm.isSubAll = true;

      //时间筛选不为空时添加时间属性
      if(!util.isEmpty(this.searchTime)){
        this.queryForm.begFinishTime = this.searchTime[0];
        this.queryForm.endFinishTime = this.searchTime[1];
      }else{   //时间筛选为空时删除时间属性
        delete this.queryForm.begFinishTime;
        delete this.queryForm.endFinishTime;
      };

      this.fetchData();
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
    //查
    getUserTable(){


    },
    //获取用户信息
    getUserInfo(){
      api.getUserByUid(this.queryForm, (res)=>{
        let code = api.getCode(res);
        if(code == 0){
          let data = res.data;
          this.userEn = data;
        }
      });
    },

    async fetchData() {
      //获取个人信息
      api.getUserByUid({uid: this.queryForm.uid, account: this.queryForm.account}, (res)=>{
        this.userEn = res.data;
        //console.log(this.userEn);
      });

      //获取团队总览
      api.getStatisticsMonthGroup(this.queryForm, (res)=>{
        //this.listLoading = false;
         let code = api.getCode(res);
         if(code == 0){
          let data = api.getData(res)[0];
          this.list = data;
          if(data == null) return;
          //计算盈利金额
          data.money = parseFloat(data.moneyTaskAdd) + parseFloat(data.moneyAgency)
           + parseFloat(data.moneyActiveAdd) + parseFloat(data.moneyIns)
           + parseFloat(data.moneyTaskLose) + parseFloat(data.moneyActiveLose)
           + parseFloat(data.moneySubtract);
          data.money = data.money.toFixed(2);

           this.list = data;
           this.showData = true;
         }
      });
    },
    testMessage() {
      this.$baseMessage("test1", "success");
    },
    testALert() {
      this.$baseAlert("11");
      this.$baseAlert("11", "自定义标题", () => {
        /* 可以写回调; */
      });
      this.$baseAlert("11", null, () => {
        /* 可以写回调; */
      });
    },
    testConfirm() {
      this.$baseConfirm(
        "你确定要执行该操作?",
        null,
        () => {
          /* 可以写回调; */
        },
        () => {
          /* 可以写回调; */
        }
      );
    },
    testNotify() {
      this.$baseNotify("测试消息提示", "test", "success", "bottom-right");
    },
  },
};
</script>

<style>
  .userInfo{
    width:90%;
    display: flex;
    flex-direction: row;
    margin:auto;
  }
  .info_left, .info_right{
    width:50%;
    padding:20px;
    box-sizing:border-box;
  }
  .info_left>div, .info_right>div{
    padding:10px;
    box-sizing:border-box;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    align-items: center;
  }
  .info_left>div>div:nth-child(1), .info_right>div>div:nth-child(1){
    width:18%;
  }
  .table_title{
    width:100%;
    height:40px;
    background-color: #D3DCE6;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding-left:20px;
    box-sizing:border-box;
    margin:50px 0 10px;
    font-weight:bold;
    font-size: 17px;
  }
  .title_tips{
    font-size:14px;
    font-weight: normal;
  }
</style>
