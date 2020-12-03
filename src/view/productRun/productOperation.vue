<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addData"
          size="small"
          v-if="hasPerm('product:info:insert')"
          >新增</el-button
        >
      </div>
      <div class="addbtn">
         <label>产品名称：</label
          > <el-input
            v-model="name"
            placeholder="请输入产品名称"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
        <label>产品类型：</label>
         <el-select v-model="value" placeholder="请选择">
           <el-option
             v-for="item in options"
             :key="item.id"
             :label="item.name"
             :value="item.id"
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
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="typeName" label="产品类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="code" label="产品编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="specs" label="规格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mainUnit" label="主单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mainUnitRatio" label="主单位比例" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="viceUnit" label="副单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="viceUnitRatio" label="副单位比例" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productWeight" label="成品克重" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">

            <el-button
              size="mini"
              type="text"
               v-if="hasPerm('product:info:update')"
              @click="handleDetails(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
               v-if="hasPerm('product:info:delete')"
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
        :total="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {infogetPageApi, infoDelApi, typegetAllApi} from "../../api"
export default {
  data () {
    return {
       currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
      name:'',
      tableData: [],
      options: [{id:'',name:'全部'}],
      value: ''
    }
  },
  created(){
    this.init();
    this.createProductTypeSelect();
  },
  methods: {
     init() {
      infogetPageApi({
        page: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        
        this.tableData = res.data.data.rows;
       this.pageCount = res.data.data.total;
      });
    },
    createProductTypeSelect(){
      typegetAllApi({}).then((res) => {
       
        for (var i = 0;i<res.data.data.length;i++){
          this.options.push(res.data.data[i]);
        }
      });
    },
    onSearch () {
      // 搜索
      infogetPageApi({
        name:this.name,
        typeId:this.value,
        page: this.currentPage,
        limit: this.pageSize,
      }).then(res => {
        this.tableData = res.data.data.rows;
        this.pageCount = res.data.data.total;
      })
    },
    handleDetails (index,row) {
      // 详情
      this.$router.push({
        name:'productOperationdetails',
        query:{
          id:row.id
        }
      })
    },
    handleEdit () { // 编辑

    },
    handleDel (index,row) {
       this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          infoDelApi({
            id:row.id,
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
    addData () {
      // 新增
      this.$router.push({
        name:'productOperationadd'
      })
    },
    handleSelectionChange (val) {
   
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
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
