<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('monthPlan:insert')"
          >新增</el-button
        >
      </div>
      <!-- <div class="addbtn">
        <el-button size="small">导出</el-button>
      </div> -->
      <div class="addbtn">
        <label>计划时间：</label>
        <el-date-picker
          v-model="time"
          type="monthrange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
      </div>
      <div class="addbtn">
        <label>计划名称：</label>
        <el-input
          v-model="inputName"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
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
        <el-table-column prop="name" label="计划名称" show-overflow-tooltip> </el-table-column>
        <!--<el-table-column prop="productionNum" label="产品数量" show-overflow-tooltip>
        </el-table-column>-->
        <el-table-column prop="startDate" label="开始时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="dayNum" label="生产周期" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="unit" label="生产单位" show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column prop="farmName" label="生产车间" show-overflow-tooltip>
        </el-table-column>-->
        <!--<el-table-column prop="dutyUserName" label="负责人" show-overflow-tooltip>
        </el-table-column>-->
        <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('monthPlan:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑计划</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('monthPlan:delete')"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleExport(scope.$index, scope.row)"
              >导出</el-button
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
  import {monthgetPage, monthPlanexportData, delMonthPlaninsertMonthPlan} from "../../api";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      search: "",
      inputName: "",
      time: "",
      activeName: "first",
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  created() {
    this.init();
  },
  methods: {

    init() {
      monthgetPage({
        page: this.currentPage,
        limit: this.pageSize,

      }).then((res) => {

        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    onSearch() {
      var queryStartDate = "";
      var queryEndDate = "";
      if(null != this.time && this.time.length > 1){
        queryStartDate = this.time[0];
        queryEndDate = this.time[1];
      }
      monthgetPage({
        page: this.currentPage,
        limit: this.pageSize,
        name: this.inputName,
        queryStartDate: queryStartDate,
        queryEndDate: queryEndDate,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    handleEdit(index,row) {
      // 编辑
      this.$router.push({
        name: "ProductionMonthedit",
        query:{
          id: row.id
        },
      });
    },

    addData() {
      // 新增
      this.$router.push({
        name: "ProductionMonthadd",
      });
    },
    handleDel(index, row){
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMonthPlaninsertMonthPlan({
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
    handleExport(index,row){
      location.href = `http://192.168.1.36:8000/api/production/monthPlan/exportData?monthId=${row.id}`
    },
    outTab() {

    },
    //格式转换,不需要改动
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]))
    // },
    handleClick(tab) {
      // console.log(tab.paneName)
      // if(tab.paneName = first){
      //   this.activeName = 'first';
      // }else{
      //    this.activeName = 'second';
      // }
    },
    // updateType(){
    //   let type = this.$route.query.type;
    //   console.log(type)
    //   if(type === '1') {
    //             this.activeName = 'first';
    //         }else if(type === '2') {
    //             this.activeName = 'second';
    //         }
    // },
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
