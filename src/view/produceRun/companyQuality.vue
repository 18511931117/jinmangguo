
<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>质检单名称：</label>
        <el-input
          v-model="code"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="addbtn">
        <label>创建时间：</label>
        <el-date-picker
          v-model="productDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
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
      >
        <el-table-column label="序号">
          <template slot-scope="scope"
            ><span>{{ scope.$index + 1 }}</span></template
          >
        </el-table-column>
        <el-table-column prop="name" label="质检单名称"> </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleOnlod(scope.$index, scope.row)"
              >上传附件</el-button
            > -->
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
    <div>
      <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
        <span>
          <el-form
            ref="comform"
            :rules="rules"
            :model="comform"
            label-width="140px"
          >
            <el-form-item label="质检单名称：" prop="name">
              <el-input v-model="comform.name" style="width:80%"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button type="primary" @click="addTableData('comform')" size="mini"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  qualityCompanyFinishgetPage,
  qualityCompanyFinishinsert,
} from "../../api";
export default {
  data() {
    return {
      code: "",
      productDate: "",
      tableData: [{ name: "王小虎", driverNames: "2019-2-5" }],
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      dialogVisible: false,
      comform: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入质检单名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      qualityCompanyFinishgetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    addData() {
      this.dialogVisible = true;
    },
    handleEdit(index,row){
       this.$router.push({
        name: "companyQualityedit",
        query:{
          id:row.id
        }
      });
    },
    addTableData(comform) {

      this.$refs[comform].validate((valid) => {
        if (valid) {
          qualityCompanyFinishinsert({
            name: this.comform.name,
          },{
        headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.dialogVisible = false
            this.init()
          });
        } else {
          return false;
        }
      });
    },
    onSearch() {
      qualityCompanyFinishgetPage({
        name: this.code,
        createDate: this.productDate,
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
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
