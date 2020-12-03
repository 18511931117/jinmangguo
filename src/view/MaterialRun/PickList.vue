<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('materiel:picking:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>领料单编号：</label>
             <el-input
            v-model="code"
            placeholder="请输入"
            style="width:200px"
          ></el-input>
      </div>
      <div class="addbtn">
        <label>下单时间：</label>
             <el-date-picker
      v-model="createDate"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
      </div>
      <div class="addbtn">
         <el-button
          type="primary"
          @click="onSearch"
          size="small"
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
        <el-table-column prop="code" label="领料单编号"> </el-table-column>
        <el-table-column prop="createName" label="下单人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="下单时间" prop="createDate" show-overflow-tooltip>

        </el-table-column>
        <el-table-column prop="storageUserName" label="仓储人员" show-overflow-tooltip>
        </el-table-column>
            <el-table-column prop="userName" label="领料人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleQRcode(scope.$index, scope.row)"
              >打印二维码</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('materiel:picking:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount"
      >
      </el-pagination>
    </div>
    <div class="QRcode_warp1">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>
          <div id="printMe">
            <div class="code1" v-for="(item,index) in codeArr" :key="index">
            <h2 class="com1">河南省新郑金芒果实业总公司</h2>
            <h3 class="com1">物料卡</h3>
            <div class="code_content1">
              <div class="left_user_info1">
                <ul>
                  <li>
                    <label>物料名称</label><span>：{{item.name}}</span>
                  </li>
                  <li>
                    <label>物料分类</label><span>：{{item.typeName}}</span>
                  </li>
                  <li>
                    <label>规格</label><span>：{{item.specs}}</span>
                  </li>
                  <li>
                    <label>厂家</label><span>：{{item.manufactor}}</span>
                  </li>
                </ul>
              </div>
              <div class="QRcode1">
                <vue-qr
                  class="qrcode-pic"
                  :text="'M-'+item.id"
                  :margin="Margin"
                  :size="80"
                  :correctLevel="correCt"
                ></vue-qr>
              </div>
            </div>
          </div>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="onQRcode"
            size="mini"
            v-print="'#printMe'"
            >打 印</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {pickinggetPage,pickinggetAll,pickingDetailedgetPage} from "../../api"
import vueQr from "vue-qr";
export default {
  components: {
    vueQr,
  },
  data () {
    return {
      currentPage: 1,//当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      code:'',
      createDate:'',
      tableData: [],
      dialogVisible:false,
       Margin: 0,
      correCt: 0,
      qrcodeText: "",
      codeArr:[],
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      pickinggetPage({
       page:this.currentPage,
        limit:this.pageSize
      }).then(res => {
        this.tableData =res.data.data.rows
        this.pageCount = res.data.data.total
      })
    },
    onExport () {
      // 导出
    },
    handleQRcode(index,row){
      this.dialogVisible = true
      this.codeArr = []
      pickingDetailedgetPage({
        page:1,
        limit:1000,
        pickingId:row.id
      }).then(res => {
        this.codeArr = res.data.data.rows
      })
    },
    onSearch(){
      pickinggetPage({
        code:this.code,
        createDate:this.createDate,
        page:this.currentPage,
        limit:this.pageSize
      }).then(res => {
        this.tableData =res.data.data.rows
        this.pageCount = res.data.data.total
      })
    },
    handleDetails () {
      // 编辑
    },
    handleEdit(index,row){
      this.$router.push({
        name:"picklistedit",
        query:{
          id:row.id
        }
      })
    },
    onQRcode(){

    },
    addData () {
      // 新增
      this.$router.push({
        name:'picklistadd'
      })
    },
    handleSelectionChange (val) {

      this.multipleSelection = val
    },
    handleSizeChange (val) {

       this.pageSize = val;
        this.init()
    },
    handleCurrentChange (val) {
       this.currentPage = val;
        this.init()

    }
  }
}
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
.search{
  display: flex;
}
.code1 {
  padding: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.com1 {
  width: 100%;
  text-align: center;
  font-size: 16px;
}

.code_content1 {
  display: flex;
      justify-content: center;
    align-items: center;
}
.left_user_info1 {
  width: 260px;
}
.code_content1 ul {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.code_content1 ul li label {
  display: inline-block;
  text-align: justify;
  width: 60px;
      vertical-align: unset;
    line-height: 0px;
}
.code_content1 ul li label::after{
  display: inline-block;
    width: 100%;
    content: '';
}
</style>
