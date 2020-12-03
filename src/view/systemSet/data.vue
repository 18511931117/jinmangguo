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
        <el-button size="small">批量删除</el-button>
      </div>
      <div class="addbtn">
        <el-input
          placeholder="请输入搜索的关键词"
          v-model="search"
          size="medium"
          class="input-with-select"
        >
          <el-button slot="append" @click="onSearch">搜索</el-button>
        </el-input>
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
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
        </el-table-column>
        <el-table-column prop="name" label="显示文字"> </el-table-column>
        <el-table-column prop="address" label="链接" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="描述" show-overflow-tooltip>
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
              @click="handleDisable(scope.$index, scope.row)"
              >禁用</el-button
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
export default {
  data () {
    return {
      currentPage: 10,
      pageSize: 10,
      total: 500,
      search: '',
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
      ]
    }
  },
  methods: {
    onSearch () {
      // 搜索
   
    },
    handleEdit () {
      // 编辑
      this.$router.push({
        name:'dataedit'
      })
    },
    handleDisable () {
      // 禁用
    },
    addData () {
      // 新增
      this.$router.push({
        name:'dataadd'
      })
    },
    handleSelectionChange (val) {
     
      this.multipleSelection = val
    },
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

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
