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

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column prop="uid" label="用户id"></el-table-column>
      <el-table-column label="增加金额" prop="moneyAdd"></el-table-column>
      <el-table-column label="减少金额" prop="moneyLose"></el-table-column>
      <el-table-column label="提现次数" prop="drawSum"></el-table-column>

      <el-table-column label="得到金币" prop="goldAdd"></el-table-column>
      <el-table-column label="消耗金币" prop="goldLose"></el-table-column>
      <el-table-column label="任务次数" prop="taskSum"></el-table-column>

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






    <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          @selection-change="setSelectRows"
          @sort-change="tableSortChange"
        >
          <el-table-column prop="uid" label="用户id"></el-table-column>
          <el-table-column label="增加金额" prop="moneyAdd"></el-table-column>
          <el-table-column label="减少金额" prop="moneyLose"></el-table-column>
          <el-table-column label="提现次数" prop="drawSum"></el-table-column>

          <el-table-column label="得到金币" prop="goldAdd"></el-table-column>
          <el-table-column label="消耗金币" prop="goldLose"></el-table-column>
          <el-table-column label="任务次数" prop="taskSum"></el-table-column>

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
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 20,
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
      api.getStatisticsMonth(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
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
