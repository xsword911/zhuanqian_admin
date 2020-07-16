<template>
  <div class="table-container">
    <vab-query-form>
     <vab-query-form-right-panel>
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
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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
         <el-button type="text" @click="handleDelete(scope.row)"
            >删除
          </el-button>
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
      type: [{
        type: [{
          value: 0,
          label: '登录配置'
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
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {

          api.delConfigArr({"arr": [{"id": row.id}]}, (res)=>{
            let code = api.getCode(res);
            let msg = api.getMsg(res);
            if(code == 0){
              this.$message({ message: '删除成功', type: 'success'});
              this.fetchData();
            }
            else this.$message.error(msg);
          });

        });
      } //else {
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
             if(item.type == 0) item.typeTest = '登录配置';
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
