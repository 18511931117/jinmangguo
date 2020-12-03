<template>
  <div class="warp">
    <el-page-header @back="goBack" content="详情"> </el-page-header>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称"> </el-table-column>
        <el-table-column prop="address" label="入库时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="入库人员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="库房名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="主单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="副单位" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { roomEdit } from "../../../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getIdData();
  },
  methods: {
    getIdData() {
      roomEdit(this.$route.query.id).then((res) => {
    
        this.tableData = res.data.data.rows;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>