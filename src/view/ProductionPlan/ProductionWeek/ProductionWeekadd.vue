<template>
  <div>
    <el-page-header @back="goBack" content="周计划新增"> </el-page-header>
    <div class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>周计划名称：</label>
        <el-input
          class="edit_input"
          v-model="monthname"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list" style="width: 50%">
        <label>时间范围：</label>
        <el-date-picker
          v-model="data"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="addbtn">
      <el-button size="mini" type="primary" @click="openAddDialog"
        >新增明细</el-button
      >
    </div>
    <div class="vex_table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号">
          <template slot-scope="scope"
            ><span>{{ scope.$index + 1 }}</span></template
          >
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="num" label="生产数量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleDetails(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="picklisttable">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="印刷工序" name="first" :key="'first'">
               <ProductionWeekTabsfirst :data="data" :monthname="monthname"></ProductionWeekTabsfirst>
            </el-tab-pane>

            <el-tab-pane label="烫金工序" name="second" :key="'second'">
                    <ProductionWeekTabssecond></ProductionWeekTabssecond>
            </el-tab-pane>
            <el-tab-pane label="分切工序" name="third" :key="'third'">
                <ProductionWeekTabsthird></ProductionWeekTabsthird>
            </el-tab-pane>
             <el-tab-pane label="打孔工序" name="fourth" :key="'fourth'">
                <ProductionWeekTabsfourth></ProductionWeekTabsfourth>
            </el-tab-pane>
              <el-tab-pane label="复卷工序" name="five" :key="'five'">
                <ProductionWeekTabsfive></ProductionWeekTabsfive>
            </el-tab-pane>
      </el-tabs>
    </div> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item label="产品名称">
            <el-select v-model="form.productId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id +'-'+ item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="生产数量">
            <el-input v-model="form.num"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="outerVisible">
      <span>
        <el-button type="primary" size="mini" @click="openDedailsDialog"
          >新增</el-button
        >
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column prop="id" label="序号">
            <template slot-scope="scope"
              ><span>{{ scope.$index + 1 }}</span></template
            >
          </el-table-column>
          <el-table-column prop="processName" label="工序名称"> </el-table-column>
          <el-table-column prop="deviceName" label="设备编号"> </el-table-column>
          <el-table-column prop="productDate" label="日期"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleDel2(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </span>
      <el-dialog
        width="30%"
        title="新增"
        :visible.sync="innerVisible"
        append-to-body
      >
        <span>
          <el-form ref="form" :model="process" label-width="80px">
            <el-form-item label="工序名称">
              <el-select
                v-model="process.processId"
                placeholder="请选择"
                @change="selectId"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id +'-'+ item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <el-select v-model="process.deviceId" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id +'-'+ item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-input
                  class="edit_input"
                  v-model="process.productDate"
                  placeholder="请输入内容"
                ></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="onSaveDetails" size="mini"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addDedails" size="mini"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <el-row class="row">
      <el-button size="mini" @click="goBack">取消</el-button>
      <el-button type="primary" size="mini" @click="onSumbit">确定</el-button>
    </el-row>
    </div>
  </div>
</template>

<script>
// import ProductionWeekTabsfirst from "./ProductionWeekadd/ProductionWeekTabsfirst";
// import ProductionWeekTabssecond from "./ProductionWeekadd/ProductionWeekTabssecond";
// import ProductionWeekTabsthird from "./ProductionWeekadd/ProductionWeekTabsthird";
// import ProductionWeekTabsfourth from "./ProductionWeekadd/ProductionWeekTabsfourth";
// import ProductionWeekTabsfive from "./ProductionWeekadd/ProductionWeekTabsfive";
import {
  insertWeekPlan,
  productinfogetAll,
  processgetPage,
  devicegetAll,
} from "../../../api";
export default {
  // components: {
  //   ProductionWeekTabsfirst,
  //   ProductionWeekTabssecond,
  //   ProductionWeekTabsthird,
  //   ProductionWeekTabsfourth,
  //   ProductionWeekTabsfive,
  // },
  data() {
    return {
      data: "",
      startDate: "",
      endDate: "",
      productId: "",
      num: "",
      weekDataList: [],
      monthname: "",
      activeName: "first",
      tableData: [],
      tableData2: [],
      dialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      options: [],
      options2: [],
      options3: [],
      processId: "",
      form: {
        productId: "",
        num: "",
      },
      process: {
        processId: "",
        deviceId: "",
        productDate: "",
      },
      rowData: {},
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {},
    selectId(val) {

      this.getSelectCode(val);
    },
    getSelectData() {
      productinfogetAll().then((res) => {
        this.options = res.data.data;
      });
    },
    addDedails() {
      this.outerVisible = false;
      this.rowData.dataSource = this.tableData2;
    },
    onSave() {
      if(this.form.num == null || this.form.num == '' || this.form.num <= 0 || this.form.productId.split("-").length < 2){
        this.$message({
          message: "请补全输入信息",
          type: "error",
        });
        return false;
      }

      var productid = this.form.productId.split("-")[0];
      var productName = this.form.productId.split("-")[1];

      this.tableData.push({
        productId: productid,
        productName: productName,
        num: this.form.num,
      });
      this.dialogVisible = false;
    },
    onSaveDetails() {
      if(this.process.processId.split("-").length < 2 || this.process.deviceId.split("-").length < 2){
        this.$message({
          message: "请补全输入信息",
          type: "error",
        });
        return false;
      }


      var processid =  this.process.processId.split("-")[0];
      var processName =  this.process.processId.split("-")[1];

      var deviceid =  this.process.deviceId.split("-")[0];
      var deviceName =  this.process.deviceId.split("-")[1];


      this.tableData2.push({
        processId: processid,
        processName: processName,
        deviceName: deviceName,
        deviceId: deviceid,
        productDate: this.process.productDate,
      });
      this.innerVisible = false;
    },
    openAddDialog() {
      this.getSelectData();
      this.dialogVisible = true;
    },
    openDedailsDialog() {
      processgetPage().then((res) => {

        this.options2 = res.data.data;
        // this.processId = res.data.data.id
      });

      this.innerVisible = true;
    },
    getSelectCode(id) {
      devicegetAll({
        processId: id.split("-")[0],
      }).then((res) => {
        this.options3 = res.data.data;
      });
    },
    onSumbit() {
      if(this.monthname != "" && this.data != ""){
        for (var i = 0; i < this.data.length; i++) {
        this.startDate = this.data[0];
        this.endDate = this.data[1];
      }

      insertWeekPlan({
        productionPlanWeek: {
          name: this.monthname,
          startDate: this.startDate,
          endDate: this.endDate,
        },
        weekDataList:this.tableData
      },{
        headers: {
        'Content-Type': 'application/json'
      }
      }).then(res => {
        this.$message({
              message: "添加成功",
              type: "success",
            });
        this.$router.go(-1);
      })
      }else{
        this.$message({
              message: "周计划名称和时间范围不能为空",
              type: "error",
            });
      }

    },
    handleDetails(index, row) {
      this.rowData = row;
      if (row.dataSource) {
        this.tableData2 = row.dataSource;
      } else {
        this.tableData2 = [];
      }
      this.outerVisible = true;
    },
    handleDel(index,row){
      this.tableData.splice(index,1)
    },
    handleDel2(index,row){
      this.tableData2.splice(index,1)
    },
    handleClick() {},
  },
  mounted() {},
};
</script>

<style>
/* .warp {
  position: relative;
  padding: 5px;
} */
.row {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.resulting,
.resulting2 {
  overflow: hidden;
  margin-bottom: 15px;
  /* margin-top: 15px; */
}
/* .picklisttable {
  margin-top: 20px;
} */
.resulting_list {
  width: 33%;
  float: left;
margin-bottom: 15px;
}

.resulting_list label {
  display: inline-block;
  /* width: 100px;
  text-align: right; */
}

.picklistbtn {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}

.btnSave {
  position: absolute;
  top: 0px;
  right: 38px;
}
.picklisttable h2 {
  text-align: center;
}
table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  width: 100%;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #e6e6e6;
}
table.gridtable td {
  border-width: 1px;
  padding: 8px;
  width: 8%;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}
</style>
