<template>
  <div class="warp">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column label="设备编号" prop="name"> </el-table-column>
      <!-- <el-table-column label="生产数量" prop="name"> </el-table-column>
      <el-table-column label="生产单位" prop="name"> </el-table-column> -->
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" size="mini" @click="pushTableData"
            >确定</el-button
          >
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="addTableData"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {
  devicegetAll,
  productinfogetAll,
  monthPlaninsertMonthPlan,
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
    };
  },
  created() {
    this.getIdTable();
  },
  methods: {
    getIdTable() {
      devicegetAll({
        processId: 3,
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
      if(this.name == '' || this.createFrom.productNum == null || this.createFrom.productNum == ''|| this.createFrom.productNum <= 0) {
        this.$message({
          message: "请补全输入信息",
          type: "error",
        });
        return false;
      }

      this.tableData2.push({
        name: this.name,
        productNum: this.createFrom.productNum,
      });
      this.innerVisible = false;
    },
    addTableData() {

      // for(var i = 0;i<this.tableData.length;i++){
      //   this.dataList.push({
      //     deviceId:this.tableData[i].name,
      //     processId:1
      //   })
      // }

      for(var j = 0;j<this.tableData2.length;j++){
        this.dataList.push({
          deviceId:Number(this.deviceId),
          processId:3,
          productionNum:this.tableData2[j].productNum,
          productName:this.tableData2[j].name
        })
      }

      for (var i = 0; i < this.data.length; i++) {
        this.startDate = this.data[0];
        this.endDate = this.data[1];
      }

      monthPlaninsertMonthPlan({
          productionPlanMonth:{
          startDate: this.startDate,
          endDate: this.endDate,
          name:this.monthname,
        },
        dataList: this.dataList,
        // productionPlanMonth:{
        //   startDate:"2019-10-07",
        //   endDate:"2019-10-17",
        //   name:"水松纸工段11月ds56789"
        // },
        // dataList:[
        //   {processId:1,deviceId:1,productName:"黄金叶",productionNum:2}
        //   ]
      },{
        headers: {
        'Content-Type': 'application/json'
    }
      }).then(res => {
         this.$message({
          message: '添加成功',
          type: 'success'
        })
      })
      this.outerVisible = false;
    },
    handleDel(index, row) {
      this.tableData2.splice(index, 1);
    },
    handleEdit(index, row) {
      this.deviceId = row.id
      // this.$router.push({
      //   name: "ProductionMonthTabsDetails",
      // });

      this.outerVisible = true;
      this.getSelectData();
    },
  },
};
</script>

<style>
</style>
