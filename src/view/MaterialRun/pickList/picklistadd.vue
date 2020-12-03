<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>领料单编号：</label
        ><el-input
          class="edit_input"
          v-model="code"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>领料人员：</label
        ><el-select v-model="pickingUserId" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
      </div>
      <div class="resulting_list">
        <label>仓储人员：</label
        > <el-select v-model="storageUserId" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
      </div>
    </div>
    <div class="resulting2">
      <!-- <h2>新增明细</h2> -->
       <el-button size="mini" type="primary" @click="addTable">新增明细</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData2"

        style="width: 100%"
      >

        <el-table-column label="序号">
           <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="code" label="材料编号"> </el-table-column>
        <el-table-column prop="name" label="物料名称"> </el-table-column>
        <!-- <el-table-column prop="semiProductId" label="物料类型及规格" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="typeName" label="物料类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="specs"
          label="物料类型及规格"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="unit" label="单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="planPrice" label="计划单价" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="金额" show-overflow-tooltip>
        </el-table-column>
         <el-table-column prop="explain" label="用途说明" show-overflow-tooltip>
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
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="code" label="材料编号">
        </el-table-column>
        <el-table-column prop="name" label="物料名称"> </el-table-column>
        <!-- <el-table-column prop="semiProductId" label="物料类型及规格" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="typeName" label="物料类型" show-overflow-tooltip>

        </el-table-column>
        <el-table-column
          prop="specs"
          label="物料类型及规格"
          width="150"
          show-overflow-tooltip
        >

        </el-table-column>
        <el-table-column prop="unit" label="单位" show-overflow-tooltip>
           <template slot-scope="scope">
                <el-input
                  v-model="scope.row.unit"
                  placeholder="请输入"
                ></el-input>
              </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          show-overflow-tooltip
        >
         <template slot-scope="scope">
                <el-input
                  v-model="scope.row.num"
                  placeholder="请输入"
                ></el-input>
              </template>
        </el-table-column>
        <el-table-column prop="planPrice" label="计划单价" show-overflow-tooltip>
           <template slot-scope="scope">
                <el-input
                  v-model="scope.row.planPrice"
                  placeholder="请输入"
                ></el-input>
              </template>
        </el-table-column>
        <el-table-column prop="price" label="金额" show-overflow-tooltip>
           <template slot-scope="scope">
                <el-input
                  v-model="scope.row.price"
                  placeholder="请输入"
                ></el-input>
              </template>
        </el-table-column>
         <el-table-column prop="explain" label="用途说明" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-input
                  v-model="scope.row.explain"
                  placeholder="请输入"
                ></el-input>
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
          <el-button @click="dialogVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button type="primary" @click="onSubmit2" size="mini"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="picklistbtn">
      <el-button type="primary" size="mini" @click="onSubmit">确认</el-button>
      <el-button size="mini" @click="goBack">取消</el-button>
    </div>
    </div>
  </div>
</template>

<script>
import { pickingInsert,infogetPage,usergetAll,pickinginsertPicking } from "../../../api";
export default {
  data() {
    return {
      input: "",
      data: "",
      code: "",
      processId: "",
      createBy: "",
      textarea: "",
      dialogVisible: false,
      tableData: [],
      tableData2:[],
      options: [],
      options2:[],
      pickingUserId: "",
      storageUserId: "",
      multipleSelection:[],
      tableData2ID:'',
      detaileds:[],

      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
    };
  },
  created(){
    this.getSelectData()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    init() {
      infogetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    getSelectData(){
      usergetAll().then(res => {
        this.options = res.data.data
        this.options2 = res.data.data
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDel(index,row){
       this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData2.splice(index,1);
          console.log(this.tableData2);
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
    addTable() {
      this.dialogVisible = true;
      this.init();
    },
    onSubmit2() {
      this.tableData2 = this.tableData2.concat(this.multipleSelection);
      this.dialogVisible = false;
    },
    onSubmit() {
      for (var i = 0; i < this.tableData2.length; i++) {
        this.detaileds.push({
          materielId:this.tableData2[i].id,
          num:this.tableData2[i].num,
          planPrice:this.tableData2[i].planPrice,
          price:this.tableData2[i].price,
          explain:this.tableData2[i].explain,
          unit:this.tableData[i].unit
        })
      }

      pickinginsertPicking({
        code: this.code,
        pickingUserId:this.pickingUserId,
        storageUserId:this.storageUserId,
        detaileds:this.detaileds
      },{
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$router.go(-1);
      });
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
</style>
