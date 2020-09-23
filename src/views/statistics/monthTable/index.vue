<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">
      <!--    <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
          >添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
        </el-button>
        <el-button type="primary" @click="testMessage">baseMessage</el-button>
        <el-button type="primary" @click="testALert">baseAlert</el-button>
        <el-button type="primary" @click="testConfirm">baseConfirm</el-button>
        <el-button type="primary" @click="testNotify">baseNotify</el-button>
      </vab-query-form-left-panel> -->
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
               <el-select v-model="branchValue" placeholder="下级" clearable>
                 <el-option-group
                   v-for="group in branch"
                   :key="group.label"
                   :label="group.label">
                   <el-option
                     v-for="item in group.branch"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-option-group>
               </el-select>
           </el-form-item>
          <!--          <el-form-item>
            <el-input v-model="queryForm.code" placeholder="邀请码" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.upper" placeholder="直属上级" />
          </el-form-item> -->
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

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
      show-summary
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <!-- <el-table-column label="序号" width="95"> -->
      <!--        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column
        prop="uid"
        label="用户id"
        width="120"
      />

      <el-table-column
        label="盈利"
        prop="money"
        width="130"
      />

      <el-table-column
        label="任务收入"
        prop="moneyTaskAdd"
        width="130"
      />
      <el-table-column
        label="发布支出"
        prop="moneyTaskLose"
        width="130"
      />
      <el-table-column
        label="任务次数"
        prop="taskSum"
      />

      <el-table-column
        label="活动收入"
        prop="moneyActiveAdd"
        width="130"
      />
      <el-table-column
        label="活动支出"
        prop="moneyActiveLose"
        width="130"
      />

      <el-table-column
        label="充值次数"
        prop="rechargeSum"
      />
      <el-table-column
        label="充值金额"
        prop="rechargeMoney"
        width="130"
      />

      <el-table-column
        label="首充金额"
        prop="firstRechargeMoney"
        width="130"
      />

      <el-table-column
        label="首充人数"
        prop="firstRechargeMoneyNum"
      />

      <el-table-column
        label="提现次数"
        prop="drawSum"
      />
      <el-table-column
        label="提现金额"
        prop="drawMoney"
        width="130"
      />

      <el-table-column
        label="加款"
        prop="moneyIns"
        width="130"
      />
      <el-table-column
        label="扣款"
        prop="moneySubtract"
        width="130"
      />

      <el-table-column
        label="代理佣金"
        prop="moneyAgency"
        width="130"
      />

      <el-table-column
        label="当天注册"
        prop="isRegisterTodayTip"
      />

      <!-- <el-table-column
        label="前一天金币"
        prop="goldOld"
      />
      <el-table-column
        label="得到金币"
        prop="goldAdd"
      />
      <el-table-column
        label="消耗金币"
        prop="goldLose"
      /> -->

<!--      <el-table-column
        label="备注"
        prop="desc"
      /> -->

      <el-table-column
        label="操作"
        width="100px"
        fixed="right"
      >
        <template slot-scope="scope">
          <!--          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button> -->
          <el-button
            type="text"
            @click="handleCheckEdit(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="color: #ff0000; text-align:center;">
        盈利金额 = （任务收入 + 代理佣金 + 活动收入 + 加款）- （任务发布支出 + 活动支出 + 扣款）
    </div>
    <el-pagination
      :background="background"
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.count"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <upd-table-edit
      ref="updEdit"
      @refreshList="fetchData"
    />
    <check-table-edit ref="checkEdit" />
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  //name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit
  },
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
          label: "自己",
          value: 0
        },{
          label: "直系下属",
          value: 1
        },{
          label: "所有下属",
          value: 2
        },]
      }],
      branchValue: null,


      options: [{
        label: '收入',
        options: [{
          value: 0,
          label: '金币转余额'
        },{
          value: 1,
          label: '提现审核失败'
        },{
          value: 2,
          label: '签到奖励'
        },{
          value: 3,
          label: '幸运抽奖获奖'
        }]
      },{
        label: '支出',
        options: [{
          value: 100,
          label: '提现'
        },{
          value: 101,
          label: '余额转金币'
        }]
      }],
      value: '',      //交易类型
      searchTime: '', //筛选的时间范围
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
      },
    };
  },
  created() {
    this.fetchData();
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
    handleEdit(row) {
      this.$refs["updEdit"].showEdit(row);
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
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
    handleSizeChange(val) {
      this.queryForm.count = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.page = 1;
      //查询下级
      if(this.branchValue == 0) this.queryForm.isSubAll = null;
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
    },
    async fetchData() {
      this.listLoading = true;
      api.getStatisticsMonth(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              //保留二位小数处理
              item.moneyOld = parseFloat(item.moneyOld).toFixed(2);  //前一天余额

              item.moneyAgency = parseFloat(item.moneyAgency).toFixed(2);  //代理佣金
              item.moneyIns = parseFloat(item.moneyIns).toFixed(2);  //加款
              item.moneyActiveAdd = parseFloat(item.moneyActiveAdd).toFixed(2);  //活动收入
              item.moneyTaskAdd = parseFloat(item.moneyTaskAdd).toFixed(2);  //任务收入
              item.rechargeMoney = parseFloat(item.rechargeMoney).toFixed(2);  //充值

              item.moneyActiveLose = parseFloat(item.moneyActiveLose).toFixed(2);  //活动支出
              item.moneyTaskLose = parseFloat(item.moneyTaskLose).toFixed(2);  //任务支出
              item.moneySubtract = parseFloat(item.moneySubtract).toFixed(2);  //扣款

              //计算盈利金额
              item.money = parseFloat(item.moneyTaskAdd) + parseFloat(item.moneyAgency)
               + parseFloat(item.moneyActiveAdd) + parseFloat(item.moneyIns)
               + parseFloat(item.moneyTaskLose) + parseFloat(item.moneyActiveLose)
               + parseFloat(item.moneySubtract);
              item.money = item.money.toFixed(2);

              if(item.isRegisterToday == 0) item.isRegisterTodayTip = "否";
              if(item.isRegisterToday == 1) item.isRegisterTodayTip = "是";
           });
           this.total = api.getTotal(res);
           this.list = data;
         }
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
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
