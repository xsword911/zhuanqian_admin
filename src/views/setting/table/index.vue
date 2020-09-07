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
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.key" placeholder="配置名" clearable />
          </el-form-item>

<!--          <el-form-item>
               <el-select v-model="typeValue" placeholder="配置类型" clearable filterable allow-create>
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
          </el-form-item> -->

<!--          <el-form-item>
              <el-date-picker
                v-model="queryForm.addTime"
                type="datetime"
                placeholder="添加时间"
                align="right"
              >
              </el-date-picker>
           </el-form-item> -->

<!--           <el-form-item>
              <el-date-picker
                v-model="queryForm.updTime"
                type="datetime"
                placeholder="修改时间"
                align="right"
              >
              </el-date-picker>
            </el-form-item> -->
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
      <el-table-column prop="key" label="配置名"></el-table-column>
      <el-table-column prop="value" label="配置值"></el-table-column>
      <el-table-column prop="typeTest" label="类型"></el-table-column>
      <el-table-column prop="addTime" label="添加时间"></el-table-column>



      <el-table-column prop="updTime" label="修改时间"></el-table-column>
      <el-table-column prop="desc" label="备注"></el-table-column>

      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
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
      type: [{
        type: [{
          value: 0,
          label: '登录配置'
        },{
          value: 1,
          label: '客服'
        },{
          value: 2,
          label: '幸运大转盘配置'
        },{
          value: 3,
          label: '代理'
        },{
          value: 4,
          label: '注册配置'
        },{
          value: 5,
          label: '平台配置'
        },{
          value: 6,
          label: '资金配置'
        }]
      }],
      typeValue: '',      //选中的配置类型
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: null,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        type: null,
        id: null,
        key: '',
        value: '',
        addTime: '',
        updTime: '',
        desc: '',
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
    //删除配置
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
            api.delConfigArr(delArr, (res)=>{
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
      // if (row.id) {
      //   this.$baseConfirm("你确定要删除当前项吗", null, async () => {

      //     api.delConfigArr({"arr": [{"id": row.id}]}, (res)=>{
      //       let code = api.getCode(res);
      //       let msg = api.getMsg(res);
      //       if(code == 0){
      //         this.$message({ message: '删除成功', type: 'success'});
      //         this.fetchData();
      //       }
      //       else this.$message.error(msg);
      //     });

      //   });
      // }
      //else {
      //   if (this.selectRows.length > 0) {
      //     const ids = this.selectRows.map((item) => item.id).join();
      //     this.$baseConfirm("你确定要删除选中项吗", null, async () => {
      //       const { msg } = await doDelete({ ids: ids });
      //       this.$baseMessage(msg, "success");
      //       this.fetchData();
      //     });
      //   } else {
      //     this.$baseMessage("未选中任何行", "error");
      //     return false;
      //   }
      // }
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
      this.fetchData();
    },
    async fetchData() {

      this.listLoading = true;
      api.getConfig(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.type){
                case 0:
                item.typeTest = '登录配置'
                  break;
                case 1:
                item.typeTest = '客服'
                  break;
                case 2:
                item.typeTest = '幸运大转盘配置'
                  break;
                case 3:
                item.typeTest = '代理'
                  break;
                case 4:
                item.typeTest = '注册配置'
                  break;
                case 5:
                item.typeTest = '平台配置'
                  break;
                case 6:
                item.typeTest = '资金配置'
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
