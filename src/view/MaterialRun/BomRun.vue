<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('materiel:bom:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>BOM编码：</label>
             <el-input
            v-model="code"
            placeholder="请输入"
            style="width:200px"
          ></el-input>
      </div>
      <div class="addbtn">
        <label>时间：</label>
             <el-date-picker
             value-format="yyyy-MM-dd"
      v-model="createDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
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
        <el-table-column label="序号" width="50">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="code" label="BOM编码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" prop="createDate" show-overflow-tooltip>
         
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人员" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('materiel:bom:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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
import {bomgetPage,bomgetAll} from "../../api"
export default {
  data () {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      code:"",
      createDate:'',
      tableData: [

      ],

    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      bomgetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
    
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    onExport () {
      // 导出
    },
    onSearch(){
      bomgetPage({
        code:this.code,
        createDate:this.createDate,
        page: this.currentPage,
        limit: this.pageSize,
      }).then(res => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      })
    },
    handleEdit (index,row) {
      // 编辑
      this.$router.push({
        name:"bomrunedit",
        query:{
          id:row.id
        }
      })
    },
    addData () {
      // 新增
      this.$router.push({
        name:'bomrunadd'
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
