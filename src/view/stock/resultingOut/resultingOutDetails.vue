<template>
  <div class="warp">
       <el-page-header @back="goBack" content="详情"> </el-page-header>
       <div>
           <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="入单编号"> </el-table-column>
        <el-table-column prop="address" label="产品名称" show-overflow-tooltip>
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
  </div>
</template>

<script>
export default {
    data(){
        return{
            tableData: [
        {
          id: '2016-05-03',
          text: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>