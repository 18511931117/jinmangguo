<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('production:scrap:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>报废编号：</label>
        <el-input
          v-model="code"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>
      <!-- <div class="addbtn">
        <label>产品编号：</label>
        <el-input
          v-model="code"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div> -->

      <div class="addbtn">
        <el-button type="primary" @click="onSearch" size="small"
          >查询</el-button
        >
      </div>
    </div>
    <div class="xd_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="code" label="报废编号"> </el-table-column>
        <el-table-column prop="userId" label="下单人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="下单时间"
          show-overflow-tooltip
        >


        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('production:scrap:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
               v-if="hasPerm('production:scrap:delete')"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { scrapgetPage, scrapDel,scrapgetAll } from "../../api";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      code:"",
      tableData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      scrapgetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {

        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    onExport() {
      // 导出

    },
    onSearch() {
      scrapgetPage({
        code:this.code,
        page: this.currentPage,
        limit: this.pageSize,
      }).then(res => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      })
    },
    handleEdit(index,row) {
      // 编辑
      this.$router.push({
        name: "scrappedRunedit",
        query:{
          id:row.id
        }
      });
    },
    handleDel(index, row) {
      // 删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          scrapDel({
            id: row.id,
          }).then((res) => {
            this.init();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!",
          });
        });
    },
    handleChange() {},
    addData() {
      // 新增
      this.$router.push({
        name: "scrappedRunadd",
      });
    },
    handleSelectionChange(val) {

      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
  },
};
</script>

<style>
.xd_top {
  display: flex;
}
.addbtn {
  margin-right: 20px;
}
.xd_table {
  margin-top: 15px;
}
.block {
  width: 100%;
  margin-top: 15px;
  text-align: right;
}
.lable_input {
  display: flex;
  margin-right: 15px;
}
/* .lable_input label {
  display: inline-block;
  width:100px;
  line-height: 3;
} */
.search {
  display: flex;
}
</style>
