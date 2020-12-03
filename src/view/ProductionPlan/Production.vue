<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="月计划" name="first" :key="'first'">
        <ProductionTabMonthChild
          v-if="isChildUpdate1"
        ></ProductionTabMonthChild>
      </el-tab-pane>
      <el-tab-pane label="周计划" name="second" :key="'second'">
        <ProductionTabWeekChild v-if="isChildUpdate2"></ProductionTabWeekChild>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProductionTabMonthChild from "./ProductionTabMonthChild";
import ProductionTabWeekChild from "./ProductionTabWeekChild";
export default {
  data() {
    return {
      activeName: "first",
      isChildUpdate1: true,
      isChildUpdate2: false,
    };
  },
  methods: {
    handleClick(tab) {
      
      if (tab.name == "first") {
        this.isChildUpdate1 = true;
        this.isChildUpdate2 = false;
      } else if (tab.name == "second") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = true;
      }
    },
  
  },
  mounted() {
  
  },
  components: {
    ProductionTabMonthChild,
    ProductionTabWeekChild,
  },
};
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
.search {
  display: flex;
}
</style>
