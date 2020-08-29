<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">
      <vab-query-form-left-panel style="max-width:168px;">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd(bigClassifyList)"
          >添加</el-button
        >
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
        </el-button>
      </vab-query-form-left-panel>

     <vab-query-form-right-panel style="flex: 1; position: relative">
<!--        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
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
           <el-input v-model="queryForm.name" placeholder="子类名称"  clearable/>
         </el-form-item>

          <el-form-item>
               <el-select v-model="stateValue" placeholder="状态" clearable>
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
     <!-- <el-table-column label="序号" width="95" prop="id"> -->
<!--        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column prop="order" label="排序"></el-table-column>
      <el-table-column prop="bigClassifyId" label="大类id"></el-table-column>
      <el-table-column prop="bigName" label="大类名称"></el-table-column>
      <el-table-column prop="classifyId" label="子类id"></el-table-column>
      <el-table-column prop="name" label="子类名称"></el-table-column>

     <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.stateTest"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.state | statusFilter"
              >{{ scope.row.stateTest }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row, bigClassifyList)"
            >编辑
          </el-button>
<!--         <el-button type="text" @click="handleDelete(scope.row)"
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
      if(status == 0) return "danger";
      if(status == 1) return "success";
      if(status == 2) return "gray";
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
        },{
          value: 2,
          label: '开发中'
        }]
      }],
      stateValue: '',      //选中的任务状态
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",   //删除选中的任务id
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10
      },
      bigClassifyList: [], //大类列表
    };
  },
  created() {
    this.fetchData();
    this.getTaskBigClassify();  //查询任务大类
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //查询任务大类
    getTaskBigClassify(){
      api.getTaskBigClassify({page: 1, count: 10}, (res)=>{
         let data = api.getData(res);
         data.forEach((item,index) =>{
           let obj = {};
           obj.value = item.bigClassifyId;
           obj.label = item.name;
           this.bigClassifyList.push(obj);
         });
      });
    },
    handleAdd(bigClassifyList) {
      this.$refs["edit"].showEdit(bigClassifyList);
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
    handleEdit(row, bigClassifyList) {
      this.$refs["updEdit"].showEdit(row, bigClassifyList);
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleDelete() {
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
            api.delTaskClassifyArr(delArr, (res)=>{
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
      //状态类型筛选不为空时添加状态类型属性
      if(!util.isEmpty(this.stateValue)){
        this.queryForm.state = this.stateValue;
      }else{   //状态类型筛选为空时删除状态类型属性
        delete this.queryForm.state;
      };
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      api.getTaskClassify(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           // console.log(data);
           data.forEach((item, index) =>{
              switch (item.state){
                case 0:
                  item.stateTest = "关闭";
                  break;
                case 1:
                  item.stateTest = "开启";
                  break;
                case 2:
                  item.stateTest = "开发中"
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
