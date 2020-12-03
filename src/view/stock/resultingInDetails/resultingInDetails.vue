<template>
  <div>
       <el-page-header @back="goBack" content="详情"> </el-page-header>
       <div  class="warp">
           <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{ scope.$index +1}}</span></template>
        </el-table-column>
        <el-table-column prop="productionCode" label="入单编号"> </el-table-column>
        <el-table-column prop="productName" label="产品名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="产品编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="入库时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="入库人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="库房" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="入库数量" show-overflow-tooltip>
        </el-table-column>
  <el-table-column prop="address" label="二维编码" show-overflow-tooltip>
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
        :total="pageCount"
      >
      </el-pagination>
       </div>
  </div>
</template>

<script>
import {inEdit,productioninfogetPage} from "../../../api"
export default {
    data(){
        return{
            tableData: [],
            currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      pageCount: 0, //总数
        }
    },
    created(){
      this.getIdData()
    },
    methods:{
      getIdData(){
        productioninfogetPage({
          id:this.$route.query.id,
          page: this.currentPage,
        limit: this.pageSize,
        isFinish:1
        }).then(res =>{
      
          this.tableData = res.data.data.rows //需要改表格形式
        })
      },
        goBack(){
            this.$router.go(-1)
        },
        handleSelectionChange (val) {
     
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getIdData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getIdData();
    },
    }
}
</script>

<style>

</style>