<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>报废单号：</label
        ><el-input
          class="edit_input"
          v-model="code"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="resulting2">
      <div class="addTitle">
        <!-- <h2>报废产品信息</h2> -->
         <el-button size="mini" type="primary" @click="addTable">新增报废产品信息</el-button>
      </div>
      <el-table ref="multipleTable" :data="tableData2" style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="productionCode" label="产品编号"> </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="specs" label="规格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="problemDescription" label="问题说明" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-button size="mini" @click="addTable">添加</el-button> -->
    </div>
    <div class="picklistbtn">
      <el-button type="primary" size="mini" @click="onSubmit">确认</el-button>
      <el-button size="mini" @click="goBack">取消</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <span>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="序号">
         <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="productionCode" label="产品编号"> </el-table-column>
        <!-- <el-table-column prop="semiProductId" label="物料类型及规格" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="productName"
          label="产品名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="specs" label="规格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="problemDescription" label="问题说明" show-overflow-tooltip>
           <template slot-scope="scope">
          <el-input v-model="scope.row.problemDescription" placeholder="请输入"></el-input>
        </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="请输入"></el-input>
        </template>
        </el-table-column>
        </el-table>
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
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit2" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { scrapgetAll, productioninfogetPage,scrapinsertScrap } from "../../../api";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      code: "",
      tableData: [],
      tableData2: [],
      dialogVisible: false,
      multipleSelection: [],
      details:[],
    };
  },
  methods: {
    init() {
      productioninfogetPage({
        page: this.currentPage,
        limit: this.pageSize,
        isFinish : 1,
      }).then((res) => {
       
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    addTable() {
      this.init();
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
     
      this.multipleSelection = val;
    },
    handleDel(index,row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData2.splice(index, 1);
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
    onSubmit() {
      if(this.code != ''){
        scrapinsertScrap({
        code: this.code,
        details:this.details
      },{
        headers: {
        'Content-Type': 'application/json'
    }
      }).then((res) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$router.go(-1);
      });
      }else{
         this.$message({
              message: "报废单号不能为空",
              type: "error",
            });
      }
      
    },
    onSubmit2() {
      this.tableData2 = this.tableData2.concat(this.multipleSelection);
      this.dialogVisible = false;
      for (var i = 0; i < this.tableData2.length; i++) {
        this.details.push({
          problemDescription:this.tableData2[i].problemDescription,
          remarks:this.tableData2[i].remark,
          productionInfoId:this.tableData2[i].id
        })
      }
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
.resulting,
.resulting2 {
  overflow: hidden;
}
.resulting_list {
  width: 33%;
  float: left;
  margin-bottom: 15px;
}
.resulting_list2 {
  width: 665px;
  margin-top: 15px;
}
.resulting_list label {
  display: inline-block;
  /* width: 100px;
  text-align: right; */
}
.resulting_list2 label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.picklistbtn {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}
.block {
  width: 100%;
  margin-top: 15px;
  text-align: right;
}
</style>
