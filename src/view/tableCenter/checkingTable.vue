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
      </div>
       <div class="addbtn">
        <label>物料名称：</label>
            <el-input
            v-model="inputName"
            label="物料名称"
            placeholder="请输入物料名称"
            style="width:200px"
          ></el-input>
      </div>
       <div class="addbtn">
         <label>物料类型：</label
          ><el-select v-model="value" placeholder="请选择">
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
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="物料名称"> </el-table-column>
        <el-table-column prop="address" label="物料分类" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="物料规格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="物料颜色" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="主单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="主单位比例" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="副单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="副单位比例" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">
           
            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.$index, scope.row)"
              >详情</el-button
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
    handleDetails () {
      // 详情
      this.$router.push({
        name:'checkingTabledetalis'
      })
    },
    handleEdit () { // 编辑

    },
    handleDel () {

    },
    addData () {
      // 新增
      this.$router.push({
        name:'checkingTableadd'
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
