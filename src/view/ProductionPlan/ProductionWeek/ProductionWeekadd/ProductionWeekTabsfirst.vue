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
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号">
          <template slot-scope="scope"
            ><span>{{ scope.$index + 1 }}</span></template
          >
        </el-table-column>
        <el-table-column prop="name" label="产品名称"> </el-table-column>
        <el-table-column prop="productNum" label="生产数量"> </el-table-column>
        <!-- <el-table-column prop="productNum" label="生产单位"> </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <div class="addbtn"></div>
      <div class="addbtn">
        <el-button type="primary" @click="Oncancel" size="small"
          >取消</el-button
        >
        <el-button type="primary" @click="Onconfirm" size="small"
          >确定</el-button
        >
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-form ref="createFrom" :model="createFrom" label-width="100px">
          <el-form-item label="产品名称：">
            <el-select v-model="name" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产数量：">
            <el-input v-model="createFrom.productNum"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="pushTableData"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { productinfogetAll, weekinsert } from "../../../../api";

export default {
  props: ["data", "monthname"],
  data() {
    return {
      name: "",
      createFrom: {
        productNum: "",
      },
      dialogVisible: false,
      tableData: [],
      options: [],
      startDate: "",
      endDate: "",
      dataList:[],
      deviceId:"",
    };
  },
  created() {
    this.getSelectData();
  },
  methods: {
    addData() {
      this.dialogVisible = true;
    },
    getSelectData() {
      productinfogetAll().then((res) => {
        this.options = res.data.data;
      });
    },
    pushTableData() {
      if(this.name == '' || this.createFrom.productNum == null || this.createFrom.productNum == ''|| this.createFrom.productNum <= 0) {
        this.$message({
          message: "请补全输入信息",
          type: "error",
        });
        return false;
      }

      this.tableData.push({
        name: this.name,
        productNum: this.createFrom.productNum,
      });
      this.dialogVisible = false;
    },
    handleDel(index, row) {
      this.tableData.splice(index, 1);
    },
    Onconfirm() {

      for (var j = 0; j < this.tableData.length; j++) {
        this.dataList.push({
          processId: 1,
          productionNum: this.tableData[j].productNum,
          productName: this.tableData[j].name,
        });
      }
      for (var i = 0; i < this.data.length; i++) {
        this.startDate = this.data[0];
        this.endDate = this.data[1];
      }
      weekinsert({
        productionPlanMonth: {
          startDate: this.startDate,
          endDate: this.endDate,
          name: this.monthname,
        },
        dataList: this.dataList,
      },{ headers: {
        'Content-Type': 'application/json'
    }}).then((res) => {

      });
    },
    Oncancel() {},
  },
};
</script>

<style>
.btn {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 40px;
}
.addbtn {
  margin-right: 30px;
}
</style>
