<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('production:prink:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>油墨名称：</label>
        <el-input
          v-model="name"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="addbtn">
        <label>生产日期：</label>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="code" label="油墨编号"  show-overflow-tooltip> </el-table-column>
        <el-table-column prop="name" label="油墨名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="productDate"
          label="生产时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="productionUserName"
          label="生产人员"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="openCode(scope.$index, scope.row)"
              >打印二维码</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('production:prink:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >

            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('production:prink:delete')"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
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
    <el-dialog title="打印二维码" :visible.sync="dialogVisible" width="30%">
      <span>
        <div class="codecount">
          <el-input v-model="count" placeholder="请输入数量"></el-input>
          <el-button size="mini" type="primary" @click="codeQr">确定</el-button>
        </div>
        <div class="code2" id="printMe" v-show="printCode">
          <div class="code-warp" v-for="(item,index) in codeArr" :key="index">
            <h2 class="com">河南省新郑金芒果实业总公司</h2>
          <h3 class="com">油墨</h3>
          <div class="code_content2">
            <div class="left_user_info">
              <ul>
                <li>
                  <label>油墨编码：</label><span>{{ item.qrCode }}</span>
                </li>
                <li>
                  <label>油墨名称：</label><span>{{ item.qrName }}</span>
                </li>
                <li>
                  <label>生产时间：</label><span>{{ item.qrproductDate }}</span>
                </li>
              </ul>
            </div>
            <div class="QRcode">
              <vue-qr
                class="qrcode-pic"
                :text="item.qrcodeText"
                :margin="Margin"
                :size="60"
                :correctLevel="correCt"
              ></vue-qr>
            </div>
          </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" v-print="'#printMe'"
          >打 印</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { prinkgetPage, prinkDel, prinkgetAll } from "../../api";
import vueQr from "vue-qr";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      name: "",
      productDate: "",
      tableData: [],
      dialogVisible: false,
      Margin: 0,
      correCt: 0,
      qrcodeText: "",
      qrName: "",
      qrCode: "",
      qrproductDate: "",
      printCode: false,
      count: "",
      codeArr : [],
      rowData:{}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      prinkgetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    codeQr() {
      this.printCode = true
      for (var i = 0; i < this.count; i++) {
        var id = "B-"+this.rowData.id+"-"+parseInt(Math.random()*10000)
        let obj = {}
        obj.qrName = this.rowData.name;
        obj.qrCode = this.rowData.code;
        obj.qrproductDate = this.rowData.productDate;
        obj.qrcodeText = id;
        this.codeArr.push(obj)
      }
     
    },
    onExport() {
      // 导出
    },
    openCode(index, row) {
     
      this.dialogVisible = true;
      this.rowData = row
      // this.qrName = row.name;
      // this.qrCode = row.code;
      // this.qrproductDate = row.productDate;
      // this.qrcodeText = String(row.id);
    },
    onSearch() {
      prinkgetPage({
        name: this.name,
        productDate: this.productDate,
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "mixingedit",
        query: {
          id: row.id,
        },
      });
    },
    handleDetails(index, row) {
      // 详情
      this.$router.push({
        name: "mixingdetails",
        query: {
          id: row.id,
        },
      });
    },
    handleDel(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          prinkDel({
            id: row.id,
          }).then((res) => {
            this.init();
          });
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
    addData() {
      // 新增
      this.$router.push({
        name: "mixingadd",
      });
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
.codecount {
  display: flex;
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
/* .code {
  padding: 5px;
} */
/* .code-warp{
  margin-top: 15px;
} */
.com {
  width: 100%;
  text-align: center;
  font-size: 16px;
}

.code_content2 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.left_user_info {
  width: 200px;
}
.code_content2 ul {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.code_content2 ul li label {
  display: inline-block;
  text-align: left;
}
</style>
