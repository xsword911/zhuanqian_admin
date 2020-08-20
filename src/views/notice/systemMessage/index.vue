<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">

      <vab-query-form-left-panel style="max-width:168px;">
       <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
          >发信</el-button
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
            <el-input v-model="queryForm.uid" placeholder="uid"  clearable/>
        </el-form-item>

        <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题"  clearable/>
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
    >
      <el-table-column type="selection" width="55"></el-table-column>
<!--      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column prop="uid" label="用户id"></el-table-column>
      <el-table-column prop="to" label="收件人"></el-table-column>
      <el-table-column prop="from" label="发件人"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>

      <el-table-column prop="addTime" label="发送时间"></el-table-column>

      <el-table-column label="是否已读">
         <template slot-scope="scope">
           <el-tooltip
             :content="scope.row.isReadTest"
             class="item"
             effect="dark"
             placement="top-start"
           >
             <el-tag :type="scope.row.state | statusFilter"
               >{{ scope.row.isReadTest }}
             </el-tag>
           </el-tooltip>
         </template>
      </el-table-column>

      <el-table-column label="是否删除">
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.isDelTest"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag :type="scope.row.state | isDelFilter"
                >{{ scope.row.isDelTest }}
              </el-tag>
            </el-tooltip>
          </template>
      </el-table-column>

      <el-table-column prop="desc" label="备注"></el-table-column>

      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button> -->
<!--          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
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
      if(status == 0) return "gray";
    },
    isDelFilter(isDel) {
      if(isDel == 1) return "success";
      if(isDel == 0) return "danger";
    }
  },
  data() {
    return {
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
      timer: '',
      queryForm: {
        page: 1,
        count: 10,
        type: 0,
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
            api.delMsgArr(delArr, (res)=>{
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
      //时间筛选不为空时添加时间属性
      if(!util.isEmpty(this.searchTime)){
        this.queryForm.begAddTime = this.searchTime[0];
        this.queryForm.endAddTime = this.searchTime[1];
      }else{   //时间筛选为空时删除时间属性
        delete this.queryForm.begAddTime;
        delete this.queryForm.endAddTime;
      };
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      api.getMssage(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.isRead){
                case 0:
                  item.isReadTest = "未读";
                  break;
                case 1:
                  item.isReadTest = "已读";
                  break;
                default:
                  break;
              };
              switch (item.isRead){
                case 0:
                  item.isDelTest = "未删除";
                  break;
                case 1:
                  item.isDelTest = "已删除";
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
  },
};
</script>
