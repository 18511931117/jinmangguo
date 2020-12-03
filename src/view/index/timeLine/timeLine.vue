<template>
  <div>
    <el-page-header @back="goBack" content="生产流程"> </el-page-header>
    <div class="warp">
    <div class="timeline">
      <el-timeline>
        <el-timeline-item
        v-for="(item,index) in activities" :key="index"
          :timestamp="item.name"
          placement="top"
          type="primary"
          color="#1890FF"
          size="large"
        >
          <el-card>
            <div class="info_list">
              <div class="info_item" v-for="(list,index) in item.arr" :key="index">
                <label>{{list.name}}：</label
                ><el-input class="info_input" v-model="list.value" disabled></el-input>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
       
      </el-timeline>
    </div>
    </div>
  </div>
</template>

<script>
import { getProductWorkflow } from "../../../api";
export default {
  data() {
    return {
      value:'',
      activities: [
        // {
        //   name: "领料",
        //   placement:"top",
        //   arr:[
        //     {name:"领料人员",value:"wangxiaohu1"},
        //     {name:"领料日期",value:"wangxiaohu1"},
        //     {name:"物料名称",value:"wangxiaohu2"},
        //     {name:"状态",value:"wangxiaohu3"},
        //   ],
        // },
        // {
        //   name: "印刷",
        //   placement:"top",
        //   arr:[
        //     {name:"领料人员2",value:"wangxiaohu"},
        //     {name:"领料日期2",value:"wangxiaohu"},
        //     {name:"状态2",value:"wangxiaohu"},
        //   ],
        // },
      ],
    };
  },
  created() {
    this.getIdData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getIdData() {
      
      getProductWorkflow({
        code: this.$route.query.code,
      }).then((res) => {
      
        this.activities = res.data.data
      });
    },
    openDetalis() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.timeline {
  margin-top: 20px;
}
.info_item {
  width: 50%;
  float: left;
  margin-bottom: 15px;
}
.info_item label {
  display: inline-block;
  width: 120px;
  text-align: right;
}
.info_input {
  width: 70%;
}
</style>