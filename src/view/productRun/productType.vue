<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('product:type:insert')"
          >新增</el-button
        >
      </div>
       <div class="addbtn">
        <label>产品类型：</label>
            <el-input
            v-model="name"
            placeholder="请输入"
            style="width:200px"
          ></el-input>
      </div>
      <div class="addbtn">
        <label>类型编号：</label>
            <el-input
            v-model="code"
            placeholder="请输入"
            style="width:200px"
          ></el-input>
      </div>
      <div class="addbtn">
         <el-button
          type="primary"
          @click="onSearch"
          size="small"
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
        <el-table-column prop="name" label="产品类型"> </el-table-column>
        <el-table-column prop="code" label="类型编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">

            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('productl:type:update')"
              @click="handleDetails(scope.$index, scope.row)"
              >编辑</el-button
            >
             <el-button
              size="mini"
              type="text"
              v-if="hasPerm('product:type:delete')"
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
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {typegetPageApi,typeDelApi,typegetAllApi} from "../../api"
export default {
  data () {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      code:"",
      name:'',
      tableData: [],

    }
  },
  created(){
    this.init()
  },
  methods: {
    init() {
      typegetPageApi({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
       this.pageCount = res.data.data.total;
      });
    },
    onSearch () {
      // 搜索
      typegetPageApi({
        code:this.code,
        name:this.name,
        page: this.currentPage,
        limit: this.pageSize,
      }).then(res => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      })
    },
    handleDetails (index,row) {
      // 详情
      this.$router.push({
        name:'productTypedetails',
        query:{
          id:row.id
        }
      })
    },
    handleEdit () { // 编辑

    },
    handleDel (index,row) {
       this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          typeDelApi({
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
    addData () {
      // 新增
      this.$router.push({
        name:'productTypeadd'
      })
    },
    handleSelectionChange (val) {
  
      this.multipleSelection = val
    },
     handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
  }
}
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
.search{
  display: flex;
}
</style>
