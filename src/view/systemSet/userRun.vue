<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('user:add')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <label>登录账号：</label>
        <el-input
          v-model="loginname"
          label="登录账号"
          placeholder="请输入登录账号"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="addbtn">
        <label>用户姓名：</label>
        <el-input
          v-model="name"
          label="用户姓名"
          placeholder="请输入用户姓名"
          style="width: 200px"
        ></el-input>
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
          <template slot-scope="scope"
            ><span>{{ scope.$index + 1 }}</span></template
          >
        </el-table-column>
        <el-table-column prop="loginname" label="登录账号"> </el-table-column>
        <el-table-column prop="name" label="用户姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="orgName" label="部门" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="roleName" label="角色" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" prop="createDate" show-overflow-tooltip>
         
        </el-table-column>

        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('user:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('user:delete')"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleQRcode(scope.$index, scope.row)"
              >打印二维码</el-button
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
    <div class="QRcode_warp">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>
          <div class="code" id="printMe">
            <h2 class="com">河南省新郑金芒果实业总公司</h2>
            <h3 class="com">员工卡</h3>
            <div class="code_content">
              <div class="left_user_info">
                <ul>
                  <li>
                    <label>姓名：</label><span>{{ username }}</span>
                  </li>
                  <li>
                    <label>部门：</label><span>{{ org }}</span>
                  </li>
                </ul>
              </div>
              <div class="QRcode">
                <vue-qr
                  class="qrcode-pic"
                  :text="qrcodeText"
                  :margin="Margin"
                  :size="60"
                  :correctLevel="correCt"
                ></vue-qr>
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
import vueQr from "vue-qr";
import { usergetPage, userDel, usergetAll } from "../../api";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      search: "",
      tableData: [],
      Margin: 0,
      correCt: 0,
      qrcodeText: "",
      dialogVisible: false,
      loginname: "",
      name: "",
      btnAddStatus: "",
      username: "",
      org: "",
    };
  },
  created() {
    this.init();
    // this.getBtn()
    // console.log()
  },
  methods: {
    init() {
      usergetPage({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },

    // getBtn(){
    //   usergetPowerUrl({
    //     parentId:36
    //   }).then(res =>{
    //     console.log(res)
    //     this.btnAddStatus = res.data.data.indexOf("add");
    //     this.btnEditStatus = res.data.data.indexOf("edit");
    //     this.btnDelStatus = res.data.data.indexOf("del");
    //   })
    // },
    handleQRcode(index, row) {
      this.qrcodeText = "U-";
      this.dialogVisible = true;
      this.qrcodeText += row.id;
      this.username = row.name;
      this.org = row.orgName;
    },
    onQRcode() {},
    onSearch() {
      //搜索
      usergetPage({
        loginname: this.loginname,
        name: this.name,
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      });
    },
    handleEdit(idnex, row) {
      //编辑
      this.$router.push({
        name: "userRunedit",
        query: {
          id: row.id,
        },
      });
    },
    handleDel(index, row) {
      //删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userDel({
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
      //新增
      this.$router.push({
        name: "userRunadd",
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
.code {
  padding: 5px;
}
.com {
  width: 100%;
  text-align: center;
  font-size: 16px;
}

.code_content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.left_user_info {
  width: 200px;
}
.code_content ul {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.code_content ul li label {
  display: inline-block;
  width: 50px;
  text-align: right;
}
</style>
