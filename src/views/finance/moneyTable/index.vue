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
            <el-input v-model="queryForm.uid" placeholder="uid" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.sn" placeholder="账单号" clearable
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
            maxlength="24"/>
          </el-form-item>
<!--          <el-form-item>
            <el-input v-model="queryForm.code" placeholder="邀请码" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.upper" placeholder="直属上级" />
          </el-form-item> -->
          <el-form-item>
              <el-select v-model="value" placeholder="交易类型" clearable>
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
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
                    :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </div>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
              >查询
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
      :summary-method="getSummaries"
      border
      stripe
    >
     <!-- <el-table-column type="selection" width="55"></el-table-column> -->
     <!-- <el-table-column label="序号" width="95"> -->
<!--        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column prop="uid" label="uid" sortable></el-table-column>
      <el-table-column label="交易订单号" prop="sn" sortable></el-table-column>
      <el-table-column label="关联订单号" prop="snExt" sortable></el-table-column>
      <el-table-column label="交易金额" prop="money" sortable></el-table-column>
<!--      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="scope.row.img"
          ></el-image>
        </template>
      </el-table-column> -->
      <el-table-column label="交易类型" prop="type" sortable></el-table-column>


      <el-table-column
        label="交易时间"
        prop="addTime"
        sortable
      ></el-table-column>
    <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
<!--          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.count"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <upd-table-edit ref="updEdit" @refreshList="fetchData"></upd-table-edit>
    <check-table-edit ref="checkEdit"></check-table-edit>
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
        },{
          value: 4,
          label: '充值'
        },{
          value: 5,
          label: '利息宝取出'
        },{
          value: 10,
          label: '加款'
        },{
          value: 50,
          label: '代理佣金'
        }]
      },{
        label: '支出',
        options: [{
          value: 100,
          label: '提现'
        },{
          value: 101,
          label: '余额转金币'
        },{
          value: 102,
          label: '升级'
        },{
          value: 103,
          label: '利息宝转入'
        },{
          value: 104,
          label: '扣款'
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
        account: '',
        sn: '',  //账单号
      },
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //列表合计设置
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

        } else {
          sums[index] = '';
        }

        if(index != 3) sums[index] = '';

      });
      return sums;
    },

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
      //时间筛选不为空时添加时间属性
      if(!util.isEmpty(this.searchTime)){
        this.queryForm.begAddTime = this.searchTime[0];
        this.queryForm.endAddTime = this.searchTime[1];
      }else{   //时间筛选为空时删除时间属性
        delete this.queryForm.begAddTime;
        delete this.queryForm.endAddTime;
      };
      //交易类型筛选不为空时添加交易类型属性
      if(!util.isEmpty(this.value)){
        this.queryForm.type = this.value;
      }else{   //交易类型筛选为空时删除交易类型属性
        delete this.queryForm.type;
      };
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
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
           });
           this.total = api.getTotal(res);
           this.list = data;
         }
      });
      // const { data, totalCount } = await getList(this.queryForm);
      // this.list = data;
      // const imageList = [];
      // data.forEach((item, index) => {
      //   imageList.push(item.img);
      // });
      // this.imageList = imageList;
      // this.total = totalCount;
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
