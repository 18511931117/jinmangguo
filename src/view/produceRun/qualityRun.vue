<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <label>产品名称：</label>
       <el-input
          v-model="productName"
          placeholder="请输入"
          style="width:200px"
        ></el-input>
      </div>
      <div class="addbtn">
        <label>产品编号：</label>
        <el-input
          v-model="productionCode"
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
        <el-table-column label="序号" width="60">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"  show-overflow-tooltip> </el-table-column>
        <el-table-column prop="productionCode" label="产品编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="teamName" label="班组" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.qualityDate | dateFmt('YYYY-MM-DD') }}</template>

        </el-table-column>
        <el-table-column prop="processName" label="工序" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createDate" label="完成时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('production:qualityOnlineDetails:update')"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.$index, scope.row)"
            >详情</el-button
            >
            <!-- <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
              -->
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {qualityOnlinegetPage,qualityOnlinegetAll} from "../../api"
  export default {
    data () {
      return {
        currentPage: 1,//当前页
        pageSize: 10, //每页显示条数
        pageCount: 0, //总数
        productName:"",
        productionCode:"",
        tableData: [],

      }
    },
    created(){
      this.init()
    },
    methods: {
      onExport () {
        // 导出
    
      },
      init(){
        qualityOnlinegetPage({
          page:this.currentPage,
          limit:this.pageSize
        }).then(res => {
         
          this.tableData =res.data.data.rows
          this.pageCount = res.data.data.total
        })
      },
      onSearch () {
        qualityOnlinegetPage({
          page:this.currentPage,
          limit:this.pageSize,
          productionCode:this.productionCode,
          productName:this.productName
        }).then(res => {
            this.tableData =res.data.data.rows
          this.pageCount = res.data.data.total
        })
      },
      handleDetails (index,row) {
        // 编辑
        this.$router.push({
          name:"qualityRundetails",
          query:{
            id:row.id,
            processId:row.processId
          }
        })
      },
      handleEdit (index,row) {
        // 新增
        this.$router.push({
          name:'qualityRunadd',
          query:{
            id:row.id,
            processId:row.processId
          }
        })
      },
      handleDel(index,row){
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            qualityDel({
              id:row.id
            }).then((res) => {
              this.init()
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
      handleSelectionChange (val) {
        
        this.multipleSelection = val
      },
      handleSizeChange (val) {

        this.pageSize = val;
        this.init()
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.init()

      }
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
