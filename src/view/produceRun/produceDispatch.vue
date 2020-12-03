<template>
  <div class="warp">
    <div class="xd_top">
      <div class="addbtn">
        <p style="line-height:3">当日生产排序</p>
      </div>
      <div class="addbtn">
        <label>通知单名称：</label>
            <el-input
            v-model="inputName"
            placeholder="请输入车间名称"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
        <label>生产日期：</label>
            <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
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
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="通知单名称"> </el-table-column>
        <el-table-column prop="address" label="生产日期" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="生产车间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="生产车间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="负责人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="text"
              @click="handleStop(scope.$index, scope.row)"
              >暂停</el-button
            >
             <el-button
              size="mini"
              type="text"
              @click="handleStart(scope.$index, scope.row)"
              >开始</el-button
            > -->
            <el-button
              size="mini"
              type="text"
              @click="handleChange(scope.$index, scope.row)"
              >变更</el-button
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
      inputName: '',
      time:'',
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    onSearch () {
      // 搜索
    },
    handleStart () {
      // 详情
    },
    handleStop () { // 编辑

    },
    handleChange () {
      this.$router.push({
        name:'produceDispatchchange'
      })
    },
    addData () {
      // 新增
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
