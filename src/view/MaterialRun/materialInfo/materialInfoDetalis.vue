<template>
  <div>
    <el-page-header @back="goBack" content="详情"> </el-page-header>
    <div class="resulting">
      <div class="resulting_list_xd">
        <label>物料编号:</label><span>{{code}}</span>
      </div>
      <div class="resulting_list_xd">
        <label>物料名称:</label><span>{{name}}</span>
      </div>
      <div class="resulting_list_xd">
        <label>成品克重:</label><span>{{productWeight}}/m²</span>
      </div>
      <div class="resulting_list_xd"><label>盘数:</label><span>{{spellNum}}</span></div>
      <div class="resulting_list_xd">
        <label>原纸长度:</label><span>{{basePaperLength}}mm</span>
      </div>
       <div class="resulting_list_xd">
        <label>原纸宽度:</label><span>{{basePaperThickness}}mm</span>
      </div>
      <div class="resulting_list_xd"><label>规格:</label><span>{{specs}}</span></div>
      <div class="resulting_list_xd">
        <label>操作实际消耗:</label><span>{{consume}}%</span>
      </div>
      <div class="resulting_list_xd">
        <label>原纸克重:</label><span>{{basePaperGram}}/m²</span>
      </div>
      <!-- <div class="resulting_list">
          <label>原料照片:</label><span>123456</span>
     </div> -->
    </div>
  </div>
</template>

<script>
import { infoEdit } from "../../../api";
export default {
  data() {
    return {
         code:'',
         name:'',
         productWeight:'',
         spellNum:'',
         basePaperLength:'',
         basePaperThickness:'',
         basePaperGram:'',
         specs:'',
         consume:'',
    };
  },
  created(){
       this.getIdData()
  },
  methods: {
    getIdData() {
      infoEdit(this.$route.query.id).then((res) => {
        this.code = res.data.data.code,
        this.name = res.data.data.name
        this.productWeight = res.data.data.productWeight
        this.spellNum = res.data.data.spellNum
        this.basePaperLength = res.data.data.basePaperLength
        this.basePaperThickness = res.data.data.basePaperThickness
        this.basePaperGram = res.data.data.basePaperGram
        this.specs = res.data.data.specs
        this.consume = res.data.data.consume
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {},
  },
};
</script>

<style>
.resulting_list_xd {
  width: 33%;
  float: left;
  /* text-align: center; */
  margin-top: 15px;
}
.resulting_list_xd label {
  display: inline-block;
  width: 100px;
  text-align: right;
  font-size: 14px;
}
.resulting_list_xd span{
     display: inline-block;
     margin-left: 10px;
     /* width: 100px; */
     text-align: left;
     font-size: 14px;
}
</style>