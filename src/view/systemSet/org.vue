<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
           v-if="hasPerm('org:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
        <el-input
          placeholder="请输入机构名称"
          v-model="name"
          size="medium"
          class="input-with-select"
        >
         
        </el-input>
      </div>
      <div class="addbtn">
         <el-button slot="append" size="mini" type="primary" @click="onSearch">搜索</el-button>
      </div>
    </div>
    <div class="xd_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
       
        style="width: 100%"
         row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="name" label="机构名称"> </el-table-column>
        <el-table-column label="创建时间" prop="createDate" show-overflow-tooltip>
           
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('org:update')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('org:delete')"
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {orggetPage,orgDel,orggetAll} from "../../api"
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      name: '',
      tableData: [{
          id: 1,
          date: '',
          name: '',
          address: ''
        }, {
          id: 2,
          date: '',
          name: '',
          address: ''
        }, {
          id: 3,
          date: '',
          name: '',
          address: '',
          children: [{
              id: 31,
              date: '',
              name: '',
              address: ''
            }, {
              id: 32,
              date: '',
              name: '',
              address: ''
          }]
        }, {
          id: 4,
          date: '',
          name: '',
          address: ''
        }],
    }
  },
  created(){
   this.init()
  },
  methods: {
    init(){
      orggetPage({
         page:this.currentPage,
        limit:this.pageSize
      }).then(res => {
      
        this.tableData = res.data.data.rows
        this.total = res.data.data.total
      })
    },
    onSearch () {
      // 搜索
      orggetPage({
        name:this.name,
        page:this.currentPage,
        limit:this.pageSize
      }).then(res => {
        this.tableData = res.data.data.rows,
        this.total = res.data.data.total
      })
    },
    handleEdit (index,row) {
    
      // 编辑
      this.$router.push({
        name:'orgedit',
        query:{
          id:row.id
        }
      })
    },
    handleDel (index,row) {
      // 删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          orgDel({
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
    addData () {
      // 新增
      this.$router.push({
        name:'orgadd'
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
.xd_table{
  margin-top: 15px;
}
.block{
  width: 100%;
  margin-top: 15px;
  text-align: right;
}
</style>
