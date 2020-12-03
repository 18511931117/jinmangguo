<template>
  <div class="warp">
    <div class="xd_top">
      <!-- <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          >新增</el-button
        >
      </div> -->
      <div class="addbtn">
        <label>半成品编号：</label>
         <el-input
          v-model="value"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.ID"
          >
          </el-option>
        </el-select> -->
      </div>
      <div class="addbtn">
        <label>半成品名称：</label>
        <el-input
          v-model="productName"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="addbtn">
        <label>生产日期：</label>
        <el-date-picker v-model="createDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
      </div>
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
        <el-table-column prop="productionCode" label="半成品编号"> </el-table-column>
        <el-table-column
          prop="productName"
          label="半成品名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="createDate" label="生产时间" show-overflow-tooltip>

        </el-table-column>
        <el-table-column prop="productionUserName" label="生产人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productionCode" label="产品编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mainUnit" label="主单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="viceUnit" label="副单位" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.$index, scope.row)"
              >查看</el-button
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
import { infoBangetPage,typegetAllApi } from "../../api";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      productName:'',
      createDate:'',
      tableData: [],
      options: [],
      value: "", //半成品类型
    };
  },
  created() {
    this.init();
    this.createProductTypeSelect();
  },
  methods: {
    onExport() {
      // 导出

    },
    createProductTypeSelect(){
      typegetAllApi({}).then((res) => {
     
        this.options = res.data.data;
      });
    },
    onSearch() {
      infoBangetPage({
        productName:this.productName,
        productionCode:this.value,
        createDate:this.createDate,
        page: this.currentPage,
        limit: this.pageSize,
      }).then(res => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      })
    },
    init() {
      infoBangetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
      
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    handleDetails() {
      // 编辑
      this.$router.push({
        name: "halfChecklistlook",
      });
    },
    addData() {
      // 新增
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
