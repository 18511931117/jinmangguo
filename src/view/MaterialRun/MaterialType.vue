<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('materiel:type:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>物料类型名称：</label>
             <el-input
            v-model="name"
            placeholder="请输入"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
        <label>物料类型编号：</label>
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
        <el-table-column prop="name" label="物料类型名称"> </el-table-column>
        <el-table-column prop="code" label="物料类型编号" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="mainCompany" label="主单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mainCompanyRatio" label="主单位比例" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="viceCompany" label="副单位" show-overflow-tooltip>
        </el-table-column>
         <el-table-column prop="viceCompanyRatio" label="副单位比例" show-overflow-tooltip>
        </el-table-column> -->
        <!-- <el-table-column label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.$index, scope.row)"
              >详情</el-button
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
import {typegetPage,typegetAll} from "../../api"
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      name:"",
      code:'',
      tableData: [

      ],

    }
  },
  created(){
    this.init()
  },
  methods: {
    init() {
      typegetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
      
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    onExport () {
      // 导出
    },
    onSearch() {
      typegetPage({
        name:this.name,
        code:this.code,
        page: this.currentPage,
        limit: this.pageSize,
      }).then(res => {
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      })
    },
    handleDetails () {
      // 编辑
      this.$router.push({
         name:'materialTypeDetalis'
      })
    },
    addData () {
      // 新增
      this.$router.push({
        name:'materialTypeadd'
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
