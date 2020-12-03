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
        <!-- <el-button size="small">批量删除</el-button> -->
      </div>
       <div class="addbtn">
        <label>权限名称：</label>
            <el-input
            v-model="name"
            label="权限名称"
            placeholder="请输入权限名称"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
         <label>权限类型：</label
          ><el-select v-model="type" placeholder="请选择">
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
         row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column label="权限名称">
          <template slot-scope="scope"><span>{{scope.row.label == null ||scope.row.label == '' ? scope.row.name : scope.row.label}}</span></template>
        </el-table-column>
        <el-table-column prop="code" label="权限标识" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="url" label="权限链接" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type" label="权限类型" show-overflow-tooltip>
           <template slot-scope="scope"><span>{{scope.row.type == 0?"菜单":"按钮"}}</span></template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
         
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
             <el-button
              size="mini"
              type="text"
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
import {accountgetPage,accountDel,accountgetAll} from "../../api"
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      name: '',
      inputName: '',
      tableData: [

      ],
      options: [{
        value: '',
        label: '全部'
      },{
        value: 0,
        label: '菜单'
      }, {
        value: 1,
        label: '按钮'
      },],
      type: ''
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      accountgetPage({
         page:this.currentPage,
          limit:this.pageSize
      }).then(res => {
       
        this.tableData = res.data.data.rows
        this.total = res.data.data.total
      })
    },
    onSearch () {
      // 搜索
      accountgetPage({
        label:this.name,
        type:this.type,
        page:this.currentPage,
        limit:this.pageSize
      }).then(res => {
        this.tableData = res.data.data.rows
        this.total = res.data.data.total
      })
    },
    handleDetails () {
      // 详情
      this.$router.push({
        name:"accountRundetails"
      })
    },
    handleEdit (index,row) { // 编辑
      this.$router.push({
        name:'accountRunedit',
        query:{
          id:row.id
        }
      })
    },
    handleDel (index,row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          accountDel({
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
        name:'accountRunadd'
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
</style>
