<template>
  <div class="warp">
    <!--<div class="xd_top">

       <div class="addbtn">
        <label>用户姓名：</label>
            <el-input
            v-model="name"
            label="用户姓名"
            placeholder="请输入"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
         <label>日志类型：</label
          ><el-select v-model="typeId" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
      </div>
      <div class="addbtn">
         <el-button
          type="primary"
          @click="onSearch"
          size="small"
          >查询</el-button
        >
      </div>
    </div>-->
    <div class="xd_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="userName" label="用户姓名"> </el-table-column>
        <el-table-column prop="respMsg" label="响应信息" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="respData" label="响应数据" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="url" label="请求链接" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" prop="createDate" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleLook(scope.$index, scope.row)"
              >编辑</el-button
            >
              <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
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
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {loggetPage,loggetAll} from "../../api"
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      search: "",
      options: [{
          value: 1,
          label: '正确'
        }, {
          value: 2,
          label: '错误'
        }, ],
        typeId: '',
        name:'',
      tableData: [],
    };
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      loggetPage({
        page:this.currentPage,
        limit:this.pageSize
      }).then(res => {
        this.tableData = res.data.data.rows
        this.total =res.data.data.total
      })
    },
    onSearch() {
      //搜索
      loggetAll({
        type:this.typeId,
        createBy:this.name,
      }).then(res => {
        this.tableData = res.data.data
      })
     
    },
    handleLook() {
      //编辑
      this.$router.push({
        name:'logRunlook'
      })
    },
    handleDel(){

    },
    handleSelectionChange(val) {
     
      this.multipleSelection = val;
    },
    handleSizeChange (val) {

       this.pageSize = val;
        this.init()
    },
    handleCurrentChange (val) {
       this.currentPage = val;
        this.init()

    }
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
</style>
