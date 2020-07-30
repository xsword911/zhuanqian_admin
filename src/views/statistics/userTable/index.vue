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
            <el-input v-model="queryForm.uid" placeholder="用户id" clearable />
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

    <div class="table_title"><div>账变明细<text class="title_tips">(显示最近十条记录)</text></div></div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column prop="uid" label="用户id"></el-table-column>
      <el-table-column label="交易订单号" prop="sn"></el-table-column>
      <el-table-column label="关联订单号" prop="snExt"></el-table-column>
      <el-table-column label="交易时间" prop="addTime"></el-table-column>
      <el-table-column label="交易金额" prop="money"></el-table-column>

      <el-table-column label="交易类别" prop="sort"></el-table-column>
      <el-table-column label="交易类型" prop="type"></el-table-column>
      <el-table-column label="备注" prop="desc"></el-table-column>

    <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button> -->
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <upd-table-edit ref="updEdit" @refreshList="fetchData"></upd-table-edit>
    <check-table-edit ref="checkEdit"></check-table-edit>





    <div class="table_title"><div>提现记录<text class="title_tips">(显示最近十条记录)</text></div></div>
    <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="goldList"
          :element-loading-text="elementLoadingText"
          @selection-change="setSelectRows"
          @sort-change="tableSortChange"
        >
        <el-table-column prop="uid" label="uid"></el-table-column>
        <el-table-column prop="sn" label="账单号"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="addTime" label="申请时间"></el-table-column>

       <el-table-column label="申请状态">
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.status"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag :type="scope.row.status | statusFilter"
                >{{ scope.row.stateTest }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="admin" label="审核人"></el-table-column>
        <el-table-column prop="updTime" label="审核时间"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>

        <el-table-column label="操作" width="180px" fixed="right">
            <template slot-scope="scope">
    <!--          <el-button type="text" @click="handleEdit(scope.row)"
                >编辑
              </el-button> -->
              <el-button type="text" @click="handleCheckEdit(scope.row)"
                >查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      list: [],
      goldList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        uid: '155f1a8817377e8',
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
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
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
              case 100:
                item.type = "提现";
                break;
              case 101:
                item.type = "余额转金币";
                break;
               default:
                 break;
             }
             if(item.sort == 0) item.sort = "收入"
             else if(item.sort == 1) item.sort = "支出"
           });
           this.list = data;
         }
      });
      //获取提现列表
      api.getMoneyDraw(this.queryForm, (res)=>{
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
  .table_title{
    width:100%;
    height:40px;
    background-color: #D3DCE6;
    display: flex;
    align-items: center;
    padding-left:20px;
    box-sizing:border-box;
    margin:50px 0 10px;
    font-weight:bold;
    font-size: 17px;
  }
</style>
