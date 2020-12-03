<template>
  <div class="warp">
    <div class="xd_top">
      
       <div class="addbtn">
        <label>入库单号：</label>
            <el-input
            v-model="code"
            placeholder="请输入入库单号"
            style="width:60%"
          ></el-input>
      </div>
       
      <div class="addbtn">
         <label>入库时间：</label
          ><el-date-picker
      v-model="inDate"
      style="width:60%"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
      </div>
      <div class="addbtn">
         <label>入库人员：</label
          > <el-input
            v-model="inUserName"
            placeholder="请输入入库人员"
            style="width:60%"
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
        <el-table-column prop="code" label="入库单号"> </el-table-column>
        <el-table-column prop="inDate" label="入库时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="inUserName" label="入库人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="inSum" label="数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">

            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.$index, scope.row)"
              >详情</el-button
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
import {ingetPage,ingetAll} from "../../api"
export default {
  data () {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      tableData: [],
      code:'',
      inDate:"",
      inUserName:"",
    }
  },
  created(){
    this.init()
  },
  methods: {
    init() {
      ingetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    onSearch () {
      // 搜索
      ingetPage({
        code:this.code,
        inDate:this.inDate,
        inUserName:this.inUserName,
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
        name:'resultingInDetails',
        query:{
          id:row.id
        }
      })
    },
    handleEdit () { // 编辑

    },
    handleDel () {

    },
    addData () {
      // 新增
      this.$router.push({
        name:'resultingInadd'
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
  margin-right: 15px;
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
