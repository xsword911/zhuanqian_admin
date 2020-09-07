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
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="getUserTable"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <div
      v-if="showData && userEn != null"
      class="userInfo"
    >
      <div class="info_left">
        <div class="">
          <div>用户头像：</div>
          <el-avatar
            :size="60"
            src=""
            @error="errorHandler"
          >
            <img :src="userEn.headUrl">
          </el-avatar>
        </div>

        <div class="">
          <div>用户id：</div>
          <div>{{ queryForm.uid }}</div>
        </div>

        <div class="">
          <div>用户名：</div>
          <div>{{ userEn.account }}</div>
        </div>

        <div class="">
          <div>手机号：</div>
          <div>{{ userEn.tel }}</div>
        </div>

        <div class="">
          <div>昵称：</div>
          <div>{{ userEn.nick }}</div>
        </div>

        <div class="">
          <div>邀请码：</div>
          <div>{{ userEn.code }}</div>
        </div>

        <div class="">
          <div>账户类型：</div>
          <div v-if="userEn.type == 0">
            普通用户
          </div>
          <div v-if="userEn.type == 1">
            管理员
          </div>
        </div>

        <div class="">
          <div>金币：</div>
          <div>{{ userEn.gold }}</div>
        </div>

        <div class="">
          <div>余额：</div>
          <div>{{ userEn.money }}</div>
        </div>
      </div>

      <div class="info_right">
        <div class="">
          <div>直属上级：</div>
          <div>{{ userEn.upper }}</div>
        </div>

        <div class="">
          <div>所有上级：</div>
          <div>{{ userEn.allUpper }}</div>
        </div>

        <div class="">
          <div>直属上级：</div>
          <div>{{ userEn.upper }}</div>
        </div>

        <div class="">
          <div>注册时间：</div>
          <div>{{ userEn.regTime }}</div>
        </div>

        <div class="">
          <div style="width:33%;">
            最后一次登录时间：
          </div>
          <div>{{ userEn.loginTime }}</div>
        </div>

        <div class="">
          <div style="width:33%;">
            最后一次登录时间ip：
          </div>
          <div>{{ userEn.ip }}</div>
        </div>

        <div class="">
          <div>密码错误次数：</div>
          <div>{{ userEn.pwdError }}</div>
        </div>

        <div class="">
          <div>账号冻结次数：</div>
          <div>{{ userEn.reezeNum }}</div>
        </div>

        <div class="">
          <div>账号状态：</div>
          <div v-if="userEn.state == 0">
            正常
          </div>
          <div v-if="userEn.state == 1">
            冻结
          </div>
          <div v-if="userEn.state == 2">
            管理员封号
          </div>
        </div>

        <div class="">
          <div>登录次数：</div>
          <div>{{ userEn.loginNum }}</div>
        </div>
      </div>
    </div>

    <div
      v-if="showData"
      class="table_title"
    >
      <div>账变明细</div>
      <div class="title_tips">
        (显示最近十条记录)
      </div>
    </div>
    <el-table
      v-if="showData"
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        prop="uid"
        label="用户id"
      />
      <el-table-column
        label="交易订单号"
        prop="sn"
      />
      <el-table-column
        label="关联订单号"
        prop="snExt"
      />
      <el-table-column
        label="交易时间"
        prop="addTime"
      />
      <el-table-column
        label="交易金额"
        prop="money"
      />

      <el-table-column
        label="交易类别"
        prop="sortType"
      />
      <el-table-column
        label="交易类型"
        prop="type"
      />
      <el-table-column
        label="备注"
        prop="desc"
      />

      <el-table-column
        label="操作"
        width="180px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleCheckEdit(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <check-table-edit ref="checkEdit" />





    <div
      v-if="showData"
      class="table_title"
    >
      <div>提现记录</div>
      <div class="title_tips">
        (显示最近十条记录)
      </div>
    </div>
    <el-table
      v-if="showData"
      ref="tableSort"
      v-loading="listLoading"
      :data="goldList"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        prop="uid"
        label="uid"
      />
      <el-table-column
        prop="sn"
        label="账单号"
      />
      <el-table-column
        prop="money"
        label="金额"
      />
      <el-table-column
        prop="addTime"
        label="申请时间"
      />

      <el-table-column label="申请状态">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag
              :type="scope.row.status | statusFilter"
            >
              {{ scope.row.stateTest }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="admin"
        label="审核人"
      />
      <el-table-column
        prop="updTime"
        label="审核时间"
      />
      <el-table-column
        prop="desc"
        label="备注"
      />

      <el-table-column
        label="操作"
        width="180px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleCheckMoneyEdit(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <check-money-table-edit ref="checkMoneyEdit" />
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
  components: {
    checkTableEdit,
    checkMoneyTableEdit
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
      imgShow: true,
      list: [],  //账变明细列表
      goldList: [],  //提现明细列表
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
    };
  },
  created() {
    // this.fetchData();
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
      this.fetchData();
    },
    //查询个人报表
    getUserTable(){
      this.listLoading = true;
      this.fetchData();
      this.getUserInfo();
      this.showData = true;
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
      //获取账变列表
      api.getMoney(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item,index) =>{
             switch (item.type){
              case 0:
                 item.type = "金币转余额";
                 break;
              case 1:
                item.type = "提现审核失败";
                break;
              case 2:
                item.type = "签到奖励";
                break;
              case 3:
                item.type = "幸运抽奖获奖";
                break;
              case 4:
                item.type = "充值";
                break;
              case 5:
                item.type = "利息宝取出";
                break;
              case 6:
                item.type = "任务奖励";
                break;
              case 7:
                item.type = "幸运抽奖支出";
                break;
              case 10:
                item.type = "加款";
                break;
              case 50:
                item.type = "代理佣金";
                break;
              case 100:
                item.type = "提现";
                break;
              case 101:
                item.type = "余额转金币";
                break;
              case 102:
                item.type = "升级";
                break;
              case 103:
                item.type = "利息宝转入";
                break;
              case 104:
                item.type = "扣款";
                break;
              case 105:
                item.type = "发布任务";
                break;
              case 106:
                item.type = "幸运抽奖支出";
                break;
               default:
                 break;
             }
             if(item.sort == 0) item.sortType = "收入"
             else if(item.sort == 1) item.sortType = "支出"
           });
           this.list = data;
         }
      });
      //获取提现列表
      api.getMoneyDraw(this.queryForm, (res)=>{
        //this.listLoading = false;
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.state){
                case 0:
                  item.status = 'frozen';
                  item.stateTest = "未审核";
                  break;
                case 1:
                  item.status = 'normal';
                  item.stateTest = "审核通过";
                  break;
                case 2:
                  item.status = 'ban';
                  item.stateTest = "审核未通过";
                  break;
                default:
                  break;
              }
           });
           this.goldList = data;
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

<style>
  .userInfo{
    width:100%;
    display: flex;
    flex-direction: row;
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
