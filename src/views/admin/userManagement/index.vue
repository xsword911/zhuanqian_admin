<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit"
          >添加</el-button
        >
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.account"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData"
              >查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection"></el-table-column>
      <!-- <el-table-column prop="id" label="id"></el-table-column> -->
      <el-table-column prop="account" label="用户名"></el-table-column>
      <el-table-column prop="nick" label="昵称"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="code" label="邀请码"></el-table-column>

<!--      <el-table-column label="权限">
        <template v-slot="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">{{
            item
          }}</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column prop="loginTime" label="最后一次登录时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page"
      :page-size="queryForm.count"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/userManagement";
import Edit from "./components/UserManagementEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  name: "UserManagement",
  components: { Edit },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        account: "",
        type: 1
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleEdit(row) {
      if (row.id) {
        this.$refs["edit"].showEdit(row);
      } else {
        this.$refs["edit"].showEdit();
      }
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
            const { msg } = await doDelete({ ids: row.id });
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
    queryData() {
      this.queryForm.page = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      api.getUser(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           this.list = data;
         }
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 300);

    },
  },
};
</script>
