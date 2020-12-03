<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div  class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>Bom编码：</label
        ><el-input
          class="edit_input"
          v-model="code"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>产品名称：</label>
        <el-select v-model="productId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="resulting2">
      <!-- <h2>新增物料明细</h2> -->
      <el-button size="mini" type="primary" @click="addTable">新增物料明细</el-button>
      <el-table ref="multipleTable" :data="tableData2" style="width: 100%">
      
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="code" label="物料类型编号"> </el-table-column>
        <!-- <el-table-column prop="semiProductId" label="物料类型及规格" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="物料类型"
          show-overflow-tooltip
        >
        </el-table-column>
        <!--<el-table-column
          prop="basicUnitNum"
          label="物料类型及规格"
          show-overflow-tooltip
        >
        </el-table-column>-->
        <el-table-column prop="mainCompany" label="主单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mainNum"
          label="主单位数量"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="viceCompany" label="副单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="viceNum"
          label="副单位数量"
          show-overflow-tooltip
        ></el-table-column>
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
      
    </div>
    <div></div>
    <div class="picklistbtn">
      <el-button type="primary" size="mini" @click="onSubmit">确认</el-button>
      <el-button size="mini" @click="goBack">取消</el-button>
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
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
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="code" label="材料编号"> </el-table-column>
            <el-table-column
              prop="name"
              label="物料类型"
              show-overflow-tooltip
            >
            </el-table-column>
           <!-- <el-table-column
              prop="basicUnitNum"
              label="物料类型及规格"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>-->
            <el-table-column
              prop="mainCompany"
              label="主单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="viceUnitNum"
              label="主单位数量"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.mainNum"
                  placeholder="请输入数量"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="viceCompany"
              label="副单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="viceUnit"
              label="副单位数量"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.viceNum"
                  placeholder="请输入数量"
                ></el-input>
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
import {
  bominsertBom,
  bomDetailedgetAll,
  productinfogetAll,
  typegetAll,
  infogetPage
} from "../../../api";
export default {
  data() {
    return {
      code: "",
      date: "",
      input: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogVisible: false,
      tableData2: [],
      multipleSelection: [],
      options: [],
      productId: "",
      tableData2ID: "",
      materiels: [],
    };
  },
  created() {
    this.getSelectData();
  },
  methods: {
    init() {
      infogetPage({
        page: this.currentPage,
          limit: this.pageSize,
      }).then((res) => {
       
        this.total = res.data.data.total
       this.tableData = res.data.data.rows;
      });
    },
    getSelectData() {
      productinfogetAll().then((res) => {
        this.options = res.data.data;

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
    onSubmit() {
      bominsertBom(
        {
          code: this.code,
          // createDate:this.date,
          materiels: this.materiels,
          productId: this.productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$router.go(-1);
      });
    },
      handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
    onSubmit2() {
      this.tableData2 = this.tableData2.concat(this.multipleSelection);
      this.dialogVisible = false;
      for (var i = 0; i < this.tableData2.length; i++) {
        this.materiels.push({
          materielId: this.tableData2[i].id,
          mainNum: this.tableData2[i].mainNum,
          viceNum: this.tableData2[i].viceNum,
        });
      }
      // for (var i = 0; i < this.tableData2.length; i++) {
      //   this.tableData2ID += this.tableData2[i].id;
      //   if (i != this.tableData2.length - 1) {
      //     this.tableData2ID += ",";
      //   }
      // }
    },
  },
};
</script>

<style>
.resulting,
.resulting2 {
  overflow: hidden;
}
.resulting2{
 
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
  /* width: 100px;
  text-align: right; */
}
.picklistbtn {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}
</style>
