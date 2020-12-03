<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column label="设备编号" prop="name"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详情" :visible.sync="outerVisible">
      <span>
        <el-button type="primary" size="mini" @click="openadd"
        >新 增 +</el-button
        >
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column prop="id" label="序号">
            <template slot-scope="scope"
            ><span>{{ scope.$index + 1 }}</span></template
            >
          </el-table-column>
          <el-table-column prop="name" label="产品名称"> </el-table-column>
          <el-table-column prop="productNum" label="生产数量">
          </el-table-column>
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
      </span>
      <el-dialog
        width="30%"
        title="添加"
        :visible.sync="innerVisible"
        append-to-body
      >
        <span>
          <el-form ref="createFrom" :model="createFrom" label-width="100px">
            <el-form-item label="产品名称：">
              <el-select v-model="name" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name +'-'+ item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产数量：">
              <el-input v-model="createFrom.productNum"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" size="mini" @click="pushTableData"
          >确定</el-button
          >
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="addTableData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import {
    devicegetAll,
    productinfogetAll,
    monthPlaninsertMonthPlan, monthget,
  } from "../../../../api";
  export default {
    props: ["data","monthname"],
    data() {
      return {
        tableData: [],
        outerVisible: false,
        innerVisible: false,
        tableData2: [],
        options: [],
        name: "",
        createFrom: {
          productNum: "",
        },
        startDate: "",
        endDate: "",
        dataList:[],
        deviceId:'',
        deviceVal:{}
      };
    },
    created() {
      this.getIdTable();
      if(this.$route.query.id != null && this.$route.query != undefined){
        monthget(this.$route.query.id).then(res => {
          var deviceVal1 = {};
          var details = res.data.data.details;
          for (var i = 0;i<details.length;i++){
            if(details[i].processId == '2'){
              if(deviceVal1[details[i].deviceId] == null || deviceVal1[details[i].deviceId] == undefined){
                deviceVal1[details[i].deviceId] = [];
              }
              deviceVal1[details[i].deviceId].push({'id':details[i].productId,'name':details[i].productName,'productNum':details[i].productionNum});
            }
          }
          this.deviceVal = deviceVal1;
        })
      }
    },
    methods: {
      getIdTable() {
        devicegetAll({
          processId: 2,
        }).then((res) => {

          this.tableData = res.data.data;
        });
      },
      getSelectData() {
        productinfogetAll().then((res) => {
          this.options = res.data.data;
        });
      },
      openadd() {
        this.innerVisible = true;
      },
      pushTableData() {
        var names = this.name.split("-");
        if(names.length < 2 || this.createFrom.productNum == null || this.createFrom.productNum == ''|| this.createFrom.productNum <= 0){
          this.$message({
            message: "请补全输入信息",
            type: "error",
          });
          return false;
        }

        this.tableData2.push({
          id: names[1],
          name: names[0],
          productNum: this.createFrom.productNum,
        });
        if(this.tableData2.length != this.deviceVal[this.deviceId].length){
          this.deviceVal[this.deviceId].push({
            id: names[1],
            name: names[0],
            productNum: this.createFrom.productNum,
          });
        }
        console.log(this.deviceVal[this.deviceId]);
        this.innerVisible = false;
      },
      addTableData() {

        this.outerVisible = false;
      },
      handleDel(index, row) {
        this.tableData2.splice(index, 1);
        this.deviceVal[this.deviceId].splice(index, 1);
      },
      handleEdit(index, row) {
        this.deviceId = row.id
        if(this.deviceVal[this.deviceId] == undefined || this.deviceVal[this.deviceId] == null || this.deviceVal[this.deviceId].length == 0){
          this.deviceVal[this.deviceId] = [];
          this.tableData2 = [];
        }else{
          this.tableData2 = this.deviceVal[this.deviceId];
        }
        this.outerVisible = true;
        this.getSelectData();
      },
    },
  };
</script>

<style>
</style>
