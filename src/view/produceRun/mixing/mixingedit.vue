<template>
  <div>
    <el-page-header @back="goBack" content="编辑"> </el-page-header>
    <div class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>油墨编号：</label
        ><el-input
          class="edit_input"
          v-model="code"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>油墨名称：</label
        ><el-input
          class="edit_input"
          v-model="name"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>生产时间：</label
        ><el-date-picker
          value-format="yyyy-MM-dd"
          v-model="productDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <div class="resulting_list">
        <label>生产人员：</label
        ><el-select v-model="userId" placeholder="请选择">
          <el-option
            v-for="item in userOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="resulting2">
      <div class="addTitle">
        <el-button size="mini" type="primary" @click="addTable">新增明细</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData2"

        style="width: 100%"
      >
        <!-- <el-table-column type="selection"> </el-table-column> -->
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="物料清单"
          show-overflow-tooltip
        >
        </el-table-column>
         <el-table-column
              prop="mainCompany"
              label="主单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
          prop="mainUnitNum"
          label="主单位数量"
          show-overflow-tooltip
        >
            </el-table-column>
            <el-table-column
              prop="viceCompany"
              label="副单位"
              show-overflow-tooltip
            >
        </el-table-column>

        <el-table-column
          prop="subUnitNum"
          label="副单位数量"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
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
    <div>
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
        <el-table-column
          prop="name"
          label="物料清单"
          show-overflow-tooltip
        >
        </el-table-column>
         <el-table-column
              prop="mainCompany"
              label="主单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
          prop="mainUnitNum"
          label="主单位数量"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
          <el-input v-model="scope.row.mainUnitNum" placeholder="请输入"></el-input>
        </template>
            </el-table-column>
            <el-table-column
              prop="viceCompany"
              label="副单位"
              show-overflow-tooltip
            >
        </el-table-column>
        <el-table-column
          prop="subUnitNum"
          label="副单位数量"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
          <el-input v-model="scope.row.subUnitNum" placeholder="请输入"></el-input>
        </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
          <el-input v-model="scope.row.remarks" placeholder="请输入"></el-input>
        </template>
        </el-table-column>
          </el-table>
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
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button type="primary" @click="onSubmit2" size="mini"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>
  import {prinkEdit, infogetAll, prinkEditUpdateDataSubmit, usergetAll, typegetAll,infogetPage} from "../../../api";
export default {
  data() {
    return {

      multipleSelection: [],
      code: "",
      name: "",
      productDate: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      userId: "",
      dialogVisible: false,
      tableData: [],
      tableData2: [],
      userOptions: [],
      options: [],
      value: "",
      value2: "",
      tableData2ID: "",
      details:[],
    };
  },
  created() {
    this.initUserSelect();
    this.getIdData();
  },

  methods: {
    getIdData(){
      prinkEdit(this.$route.query.id).then(res => {
        
        this.code = res.data.data.code,
        this.name = res.data.data.name
        this.productDate = res.data.data.productDate
        this.userId = String(res.data.data.userId)
        this.tableData2 = res.data.data.details;
      })
    },
    initUserSelect(){
      usergetAll({}).then(res => {
        this.userOptions = res.data.data
      })
    },
    init() {
      infogetPage({
        page: this.currentPage,
          limit: this.pageSize,
      }).then((res) => {
        this.total = res.data.data.total
       this.tableData = res.data.data.rows;
      });
    },
    handleSelectionChange(val) {
      
      this.multipleSelection = val;
    },
    goBack() {
      this.$router.go(-1);
    },
    addTable() {
      this.dialogVisible = true;
      this.init();
    },
     handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
    handleDel(index,row){
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData2.splice(index,1)
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
      // for (var i = 0; i < this.tableData2.length; i++) {
      //   this.tableData2ID += this.tableData2[i].id;
      //   if (i != this.tableData2.length - 1) {
      //     this.tableData2ID += ",";
      //   }
      // }
      console.log(this.tableData2)
      for(var i = 0;i<this.tableData2.length;i++){
        this.details.push({
          materielInfoId:this.tableData2[i].materielInfoId,
          mainUnitNum:this.tableData2[i].mainUnitNum,
          subUnitNum:this.tableData2[i].subUnitNum,
          remarks:this.tableData2[i].remarks
        })
      }
      prinkEditUpdateDataSubmit({
        id:this.$route.query.id,
        code: this.code,
        name: this.name,
        userId: this.userId,
        productDate: this.productDate,
        details:this.details
      },{
        headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.$router.go(-1);
      });
    },

    onSubmit2() {
       this.tableData2 = this.tableData2.concat(this.multipleSelection);
      this.dialogVisible = false;
      this.tableId()
    },
  },
};
</script>

<style>
.resulting,
.resulting2 {
  overflow: hidden;
}
.resulting2 {
  margin-top: 15px;
}

.addTitle {
  display: flex;
}
.resulting_list {
  width: 33%;
  float: left;
  margin-bottom: 15px;
}
.resulting_list2 {
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
</style>
