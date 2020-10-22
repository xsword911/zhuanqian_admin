<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">

      <vab-query-form-left-panel style="max-width:168px;">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
          >添加</el-button
        >
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
        </el-button>
      </vab-query-form-left-panel>

     <vab-query-form-right-panel style="flex: 1;">
<!--       <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
       style="position: absolute; left: 0; top:34%;display:block; transform: translateY(-50%);"
          >添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
        style="position: absolute; left: 80px; top:34%;display:block; transform: translateY(-50%);"
          >删除
        </el-button> -->
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
        <el-form-item>
            <el-input v-model="queryForm.propType" placeholder="道具类型"  clearable/>
        </el-form-item>

        <el-form-item>
            <el-input v-model="queryForm.propName" placeholder="道具名称"  clearable/>
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
      border
      stripe
    >
      <el-table-column type="selection" width="55"></el-table-column>
<!--      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column prop="propType" label="道具类型" sortable></el-table-column>
      <el-table-column prop="propName" label="道具名称" sortable></el-table-column>

      <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button>
<!--          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
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
    <add-table-edit ref="edit" @refreshList="fetchData"></add-table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
import addTableEdit from "./components/addTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit,
    addTableEdit
  },
  filters: {
    statusFilter(status) {
      if(status == 1) return "success";
      if(status == 0) return "danger";
    }
  },
  data() {
    return {
      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],
      stateValue: '',      //选中的状态类型

      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      searchTime: '', //筛选的时间范围
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
    handleAdd() {
      this.$refs["edit"].showEdit();
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
    handleEdit(row) {
      this.$refs["updEdit"].showEdit(row);
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleDelete(row) {
      if(util.isEmpty(this.selectRows)){
        this.$baseMessage("未选中任何行", "error");
        return false;
      }else {
        this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            let delById = [];
            this.selectRows.forEach((item, index) =>{
              let obj = {};
              obj.id = item.id;
              delById.push(obj);
            });
            let delArr = {
              arr: delById
            };
            api.delGamePropTypeArr(delArr, (res)=>{
              let code = api.getCode(res);
              if(code == 0){
                this.$baseMessage("删除成功", "success");
                this.$refs["form"].resetFields();
                this.dialogFormVisible = false;
                this.form = this.$options.data().form;
                this.fetchData();
              }else{
                let msg = api.getMsg(res);
                this.$message.error(msg);
              }
            });
        });
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

      if(util.isEmpty(this.queryForm.propType)) delete this.queryForm.propType;
      if(util.isEmpty(this.queryForm.propName)) delete this.queryForm.propName;

      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      api.getGamePropType(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.state){
                case 0:
                  item.stateTest = "关闭";
                  break;
                case 1:
                  item.stateTest = "开启";
                  break;
                default:
                  break;
              };
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
    //获取当前月份一共有几天
    mGetDate(){
         var date = new Date();
         var year = date.getFullYear();
         var month = date.getMonth()+1;
         var d = new Date(year, month, 0);
         return d.getDate();
    }
  },
};
</script>
