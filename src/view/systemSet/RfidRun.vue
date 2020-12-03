<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
           v-if="hasPerm('rfid:insert')"
          >新增</el-button
        >
      </div>
       <div class="addbtn">
        <label>RFID编码：</label>
            <el-input
            v-model="code"
            label="RFID编码"
            placeholder="请输入RFID编码"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
         <label>状态：</label
          ><el-select v-model="state" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
        <el-table-column prop="rfid" label="rfid编码" show-overflow-tooltip> </el-table-column>
        <!-- <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope" prop="state">
            <span>{{scope.row.state == 0?"未使用":"已使用"}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="epc" label="epc" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" prop="createDate" show-overflow-tooltip>
          
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('rfid:update')"
              @click="handleDetails(scope.$index, scope.row)"
              >编辑</el-button
            >
             <el-button
              size="mini"
              type="text"
              v-if="hasPerm('rfid:delete')"
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
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {rfidGetPage,rfidDel,rfidgetAll} from "../../api"
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      search: '',

      tableData: [],
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '未使用'
        }, {
          value: 1,
          label: '已使用'
        }],
        state: '',
      code: '',
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      rfidGetPage({
        page:this.currentPage,
        limit:this.pageSize
      }).then(res =>{
        this.tableData = res.data.data.rows
         this.total = res.data.data.total
      })
    },
    onSearch () {
      // 搜索
      rfidGetPage({
          rfid:this.code,
          state:this.state,
          page:this.currentPage,
          limit:this.pageSize
      }).then(res => {
          this.tableData = res.data.data.rows
          this.pageCount = res.data.data.total
      })
    },
    handleDetails (index,row) {
      // 编辑
      this.$router.push({
        name:'RfidRundetalis',
        query:{
          id:row.id
        }
      })
    },
    
    addData () {
      // 新增
      this.$router.push({
        name:'RfidRunadd'
      })
    },
    handleDel(index,row){
       this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rfidDel({
            id:row.id
          }).then((res) => {
            this.init()
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
</style>
