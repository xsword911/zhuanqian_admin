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
            <el-input v-model="queryForm.uid" placeholder="uid"  clearable/>
          </el-form-item>
       <el-form-item>
            <el-input v-model="queryForm.sn" placeholder="订单号"  clearable/>
          </el-form-item>
          <el-form-item>
              <el-select v-model="stateValue" placeholder="审核状态" clearable>
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

          <el-form-item>
              <el-select v-model="typeValue" placeholder="审核类型" clearable>
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
<!--      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column prop="uid" label="uid" sortable></el-table-column>
      <el-table-column prop="sn" label="账单号" sortable></el-table-column>
      <el-table-column prop="money" label="金额" sortable></el-table-column>
      <el-table-column prop="gold" label="金币" sortable></el-table-column>
      <el-table-column prop="addTime" label="转换时间" sortable></el-table-column>

     <el-table-column label="申请状态" sortable>
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
      <el-table-column prop="admin" label="审核人" sortable></el-table-column>
      <el-table-column prop="updTime" label="审核时间" sortable></el-table-column>
      <el-table-column prop="desc" label="备注" sortable></el-table-column>
      <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
          </el-button> -->
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
import checkTableEdit from "./components/checkTableEdit";
import updTableEdit from "./components/updTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: "success",
        frozen: "gray",
        ban: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      state: [{
        state: [{
          value: 0,
          label: '未审核'
        },{
          value: 1,
          label: '审核通过'
        },{
          value: 2,
          label: '审核未通过'
        }]
      }],
      stateValue: '',      //审核状态

      type: [{
        type: [{
          value: 0,
          label: '金币转余额'
        },{
          value: 1,
          label: '余额转金币'
        }]
      }],
      typeValue: '', //审核类型
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
        account: "",
        sn: "",
        admin: "",
        stateTest: "",
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

        if(index != 2 && index != 3) sums[index] = '';

      });
      return sums;
    },
    tableSortChange() {
      const imageList = [];
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img);
      });
      this.imageList = imageList;
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleEdit(row) {
      this.$refs["updEdit"].showEdit(row);
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await doDelete({ ids: row.id });
          this.$baseMessage(msg, "success");
          this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join();
          this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            const { msg } = await doDelete({ ids: ids });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          this.$baseMessage("未选中任何行", "error");
          return false;
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.count = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.fetchData();
    },
    //搜索关键字
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
      //状态筛选不为空时添加状态属性
      if(!util.isEmpty(this.stateValue)){
        this.queryForm.state = this.stateValue;
      }else{   //状态筛选为空时删除状态属性
        delete this.queryForm.state;
      };
      //类型筛选不为空时添加类型属性
      if(!util.isEmpty(this.typeValue)){
        this.queryForm.type = this.typeValue;
      }else{   //类型筛选为空时删除类型属性
        delete this.queryForm.type;
      };
      this.fetchData();
    },
    async fetchData() {

      this.listLoading = true;
      api.getMoneyTran(this.queryForm, (res)=>{
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
           this.total = api.getTotal(res);
           this.list = data;
         }
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 300);

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
