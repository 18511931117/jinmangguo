<template>
  <div class="warp">
    <el-page-header @back="goBack" content="变更通知单"> </el-page-header>
    <div class="resulting">
      <div class="resulting_list">
        <label>变更通知单名称：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>生产时间：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>生产车间：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>选择需要变更的通知单：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="xd_tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="印刷工序" name="first">
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="设备编号">
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="产品名称"
        >
         <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="生产数量">
        <template slot-scope="scope">
           <el-input v-model="scope.row.value2" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="生产单位"
        >
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
           <el-button
         type="text"
          size="mini"
          @click="handleDetalis(scope.$index, scope.row)">清单详情</el-button>
        <el-button
         type="text"
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-button
          size="mini"
          @click="addTable">添加</el-button>
    </el-tab-pane>
    <el-tab-pane label="烫金工序" name="second">
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="设备编号">
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="产品名称"
        >
         <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="生产数量">
        <template slot-scope="scope">
           <el-input v-model="scope.row.value2" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="生产单位"
        >
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
           <el-button
         type="text"
          size="mini"
          @click="handleDetalis(scope.$index, scope.row)">清单详情</el-button>
        <el-button
         type="text"
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-button
          size="mini"
          @click="addTable">添加</el-button>
    </el-tab-pane>
    <el-tab-pane label="分切工序" name="third">
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="设备编号">
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="产品名称"
        >
         <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="生产数量">
        <template slot-scope="scope">
           <el-input v-model="scope.row.value2" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="生产单位"
        >
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
           <el-button
         type="text"
          size="mini"
          @click="handleDetalis(scope.$index, scope.row)">清单详情</el-button>
        <el-button
         type="text"
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-button
          size="mini"
          @click="addTable">添加</el-button>
    </el-tab-pane>
    <el-tab-pane label="打孔工序" name="fourth">
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="设备编号">
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="产品名称"
        >
         <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="生产数量">
        <template slot-scope="scope">
           <el-input v-model="scope.row.value2" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="生产单位"
        >
        <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
           <el-button
         type="text"
          size="mini"
          @click="handleDetalis(scope.$index, scope.row)">清单详情</el-button>
        <el-button
         type="text"
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-button
          size="mini"
          @click="addTable">添加</el-button>
    </el-tab-pane>
  </el-tabs>
    </div>
    <div class="picklistbtn">
        <el-button type="primary" size="mini">确认</el-button>
        <el-button   size="mini">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      textarea:'',
      activeName:'first',
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
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
        value: '',
        value2:''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addTable(){
      this.tableData.push({
        date:'',
        name:'',
        address:''

      })
    },
    onSubmit() {},
  },
};
</script>

<style>
.resulting,.resulting2 {
  overflow: hidden;
}
.resulting_list {
  width: 33%;
  float: left;
  margin-bottom: 15px;
/*   
  margin-top: 15px; */
}
.resulting_list2 {
  margin-top: 15px;

}
.resulting_list label {
  display: inline-block;
  /* width: 150px;
  text-align: right; */
}
.resulting_list2 label {
  display: inline-block;
  width: 100px;
  text-align: right;
  
}
.picklistbtn{
    margin-top: 40px;
    width: 100%;
    text-align: center;
}
.xd_tab{
    margin-top: 15px;
}
</style>