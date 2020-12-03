<template>
  <div :class="{ 'min-widht': isCollapse, 'max-widht': !isCollapse }">
    <div class="aside-top">
      <i class="logo"></i>
      <p><span>金芒果后台</span>管理系统</p>
    </div>
    <div class="menu">
      <el-menu
        :default-active="onRoutes"
        unique-opened
        router
        class="el-menu-vertical-demo"
        background-color="#323C51"
        active-text-color="#fff"
        :collapse="isCollapse"
        text-color="#fff"
      >
        <el-menu-item
          v-for="item in noChildren"
          :key="item.id"
          :index="item.path"
          @click="clickMenu(item)"
        >
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu
          v-for="item in hasChildren"
          :key="item.id"
          :index="item.id + ''"
        >
          <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="subItem.path"
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex"
              @click="clickMenu(subItem,subItem.id)"
              >{{ subItem.label }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    
  </div>

</template>

<script>
import { mapState } from "vuex";
import {usergetPowerUrl} from "../../api"
export default {
  
  data() {
    return {
      myBarOption: {
        barColor: "red",
      },
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      },
      asideMenu: [
        {
          id: 1,
          name: "Index",
          path: "/Index",
          label: "首页",
          icon: "stopwatch",
          url:"index/Index"
        },
        {
          id: 2,
          name: "production",
          label: "生产计划",
          icon: "edit-outline",
          children: [
            {
              id: 2001,
              path: "/production",
              name: "production",
              label: "生产计划管理",
              icon: "setting",
              url:'ProductionPlan/production'
            },
            {
              id: 2002,
              path: "/createOrder",
              name: "createOrder",
              label: "创建通知单",
              icon: "setting",
              url:'ProductionPlan/CreateOrder'
            },
          ],
        },
        {
          id: 3,
          name: "materialInfo",
          label: "物料管理",
          icon: "postcard",
          children: [
            {
              id: 3001,
              path: "/materialInfo",
              name: "materialInfo",
              label: "物料信息",
              icon: "setting",
              url:'MaterialRun/MaterialInfo'
            },
            {
              id: 3002,
              path: "/materialType",
              name: "materialType",
              label: "物料类型",
              icon: "setting",
              url:'MaterialRun/MaterialType'
            },
            {
              id: 3003,
              path: "/pickList",
              name: "pickList",
              label: "领料单",
              icon: "setting",
              url:'MaterialRun/PickList'
            },
            {
              id: 3004,
              path: "/BomRun",
              name: "BomRun",
              label: "BOM管理",
              icon: "setting",
              url:'MaterialRun/BomRun'
            },
          ],
        },
        {
          id: 4,
          name: "produceRun",
          label: "生产管理",
          icon: "document",
          children: [
            // {
            //   id: 4 - 1,
            //   path: "/produceRun",
            //   name: "produceRun",
            //   label: "生产管理",
            //   icon: "setting",
            // },
            // {
            //   id: 4 - 4,
            //   path: "/produceDispatch",
            //   name: "produceDispatch",
            //   label: "生产调度",
            //   icon: "setting",
            // },
            {
              id: 4002,
              path: "/groupRun",
              name: "groupRun",
              label: "班组管理",
              icon: "setting",
              url:'scrappedRun/groupRun'
            },
            {
              id: 4009,
              path: "/equipageRun",
              name: "equipageRun",
              label: "设备管理",
              icon: "setting",
               url:'scrappedRun/equipageRun'
            },
             {
              id: 4008,
              path: "/scrappedRun",
              name: "scrappedRun",
              label: "报废管理",
              icon: "setting",
              url:'scrappedRun/scrappedRun'
            },
             {
              id: 4006,
              path: "/qualityRun",
              name: "qualityRun",
              label: "在线质量",
              icon: "setting",
               url:'produceRun/qualityRun'
            },
             {
              id: 4004,
              path: "/productQuality",
              name: "productQuality",
              label: "成品质量",
              icon: "setting",
              url:'produceRun/productQuality'
            },
            {
              id: 4003,
              path: "/mixing",
              name: "mixing",
              label: "油墨混合",
              icon: "setting",
                url:'scrappedRun/mixing'
            },
            {
              id: 4008,
              path: "/halfChecklist",
              name: "halfChecklist",
              label: "半成品清单",
              icon: "setting",
              url:'scrappedRun/halfChecklist'
            },
            
            // {
            //   id: 4 - 5,
            //   path: "/produceSpeed",
            //   name: "produceSpeed",
            //   label: "生产进度",
            //   icon: "setting",
            // },
           
            // {
            //   id: 4 - 7,
            //   path: "/repairRun",
            //   name: "repairRun",
            //   label: "返修管理",
            //   icon: "setting",
            // },
           
          ],
        },
        {
          id: 5,
          name: "materialInfo",
          label: "成品库存",
          icon: "film",
          children: [
            {
              id: 5001,
              path: "/resultingIn",
              name: "resultingIn",
              label: "入库管理",
              icon: "setting",
              url:'stock/resultingIn'
            },
            {
              id: 5002,
              path: "/resultingOut",
              name: "resultingOut",
              label: "出库管理",
              icon: "setting",
              url:'stock/resultingOut'
            },
            // {
            //   id: 5 - 3,
            //   path: "/trayRun",
            //   name: "trayRun",
            //   label: "托盘管理",
            //   icon: "setting",
            // },
            {
              id: 5004,
              path: "/stockRun",
              name: "stockRun",
              label: "库存管理",
              icon: "setting",
              url:'stock/stockRun'
            },
          ],
        },
        {
          id: 8,
          name: "productOperation",
          label: "产品管理",
          icon: "circle-check",
          children: [
            {
              id: 8001,
              path: "/productOperation",
              name: "productOperation",
              label: "产品信息",
              icon: "setting",
              url:'productRun/productOperation'
            },
            {
              id: 8002,
              path: "/productType",
              name: "productType",
              label: "产品类型",
              icon: "setting",
              url:'productRun/productType'
            },
          ],
        },
        // {
        //   id: 6,
        //   name: "produceTable",
        //   label: "报表中心",
        //   icon: "eleme",
        //   children: [
        //     {
        //       id: 6 - 1,
        //       path: "/produceTable",
        //       name: "produceTable",
        //       label: "生产报表",
        //       icon: "setting",
        //     },
        //     {
        //       id: 6 - 2,
        //       path: "/materialsTable",
        //       name: "materialsTable",
        //       label: "物料报表",
        //       icon: "setting",
        //     },
        //     {
        //       id: 6 - 3,
        //       path: "/lossTable",
        //       name: "lossTable",
        //       label: "损耗报表",
        //       icon: "setting",
        //     },
        //     {
        //       id: 6 - 4,
        //       path: "/checkingTable",
        //       name: "checkingTable",
        //       label: "质检报表",
        //       icon: "setting",
        //     },
        //   ],
        // },
        {
          id: 7,
          name: "org",
          label: "系统设置",
          icon: "warning-outline",
          children: [
            {
              id: 7001,
              path: "/org",
              name: "org",
              label: "组织架构",
              icon: "setting",
              url:'systemSet/org'
            },
            {
              id: 7002,
              path: "/userRun",
              name: "userRun",
              label: "人员管理",
              icon: "setting",
              url:'systemSet/userRun'
            },
            {
              id: 7003,
              path: "/roleRun",
              name: "roleRun",
              label: "角色管理",
              icon: "setting",
              url:'systemSet/roleRun'
            },
            {
              id: 7004,
              path: "/accountRun",
              name: "accountRun",
              label: "权限管理",
              icon: "setting",
              url:'systemSet/accountRun'
            },
            // {
            //   id: 7 - 5,
            //   path: "/data",
            //   name: "data",
            //   label: "数据接口",
            //   icon: "setting",
            // },
            {
              id: 7005,
              path: "/logRun",
              name: "logRun",
              label: "日志管理",
              icon: "setting",
              url:'systemSet/logRun'
            },
            {
              id: 7006,
              path: "/RfidRun",
              name: "RfidRun",
              label: "RFID标签管理",
              icon: "setting",
              url:'systemSet/RfidRun'
            },
            {
              id: 7007,
              path: "/wordbookRun",
              name: "wordbookRun",
              label: "数据字典管理",
              icon: "setting",
              url:'systemSet/wordbookRun'
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.isCollapse,
    }),
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    menu(){
     
      return this.$store.state.menu
    },
    onRoutes() {
      const { name } = this.$route;
     
      switch (name) {
        
        case "Index":
          return "/Index"
        case "timeline":
        case "Index":
          return "/Index"    
        case "CreateOrderadd":
        case "createOrder":
          return "/createOrder"
        case "CreateOrderdetails":
        case "createOrder":
          return "/createOrder"  
        case "ProductionWeekadd":
        case "ProductionTabWeekChild":
          return "/ProductionTabWeekChild"
        case "ProductionWeekedit":
        case "ProductionTabWeekChild":
          return "/ProductionTabWeekChild"  
        case "ProductionMonthadd":
        case "ProductionTabMonthChild":
          return "/ProductionTabMonthChild"
        case "ProductionMonthedit":
        case "ProductionTabMonthChild":
          return "/ProductionTabMonthChild"        
        case "CreateOrderlook":
        case "createOrder":
          return "/createOrder"
        case "ProductionMonthedit":
        case "production":
          return "/production"
         case "ProductionMonthadd":
        case "production":
          return "/production"
         case "ProductionWeekedit":
        case "production":
          return "/production"
         case "ProductionWeekadd":
        case "production":
          return "/production"             
        case "produceDispatchchange":
        case "produceDispatch":
          return "/produceDispatch"  
        case 'groupRunadd':
        case "groupRun":
          return "/groupRun"
         case 'groupRunedit':
        case "groupRun":
          return "/groupRun"      
        case "repairRunadd":
        case "repairRun":
          return "/repairRun";
         case "qualityRundetails":
        case "qualityRun":
          return "/qualityRun";
          case "productQualitydetails":
        case "productQuality":
          return "/productQuality";    
         case "equipageRunadd":
        case "equipageRun":
          return "/equipageRun";
        case "equipageRunedit":
        case "equipageRun":
          return "/equipageRun";  
        case "qualityRunadd":
        case "qualityRun":
          return "/qualityRun";
         case "productQualityedit":
        case "productQuality":
          return "/productQuality";  
        case "mixingadd":
        case "mixing":
          return "/mixing";
         case "mixingdetails":
        case "mixing":
          return "/mixing";  
         case "mixingedit":
        case "mixing":
          return "/mixing";    
        case "produceRundetalis":
        case "produceRun":
          return "/produceRun";
        case "companyQualityedit":
        case "companyQuality":
          return "/companyQuality";  
        case "scrappedRunadd":
        case "scrappedRun":
          return "/scrappedRun";
        case "scrappedRunedit":
        case "scrappedRun":
          return "/scrappedRun";  
        case "halfChecklistlook":
        case "halfChecklist":
          return "/halfChecklist"     
        case "produceSpeed":
        case "produceSpeed":
          return "/produceSpeed";     
        case "productTypeadd":
        case "productType":
          return "/productType";
        case "productTypedetails":
        case "productType":
          return "/productType";
        case "stockRundetails":
        case "stockRun":
          return "/stockRun";     
        case "productOperationadd":
        case "productOperation":
          return "/productOperation";
        case "productOperationdetails":
        case "productOperation":
          return "/productOperation";      
        case "materialInfoDetalis":
        case "materialInfo":
          return "/materialInfo";
        case "materialInfoadd":
        case "materialInfo":
          return "/materialInfo";
         case "materialInfoedit":
        case "materialInfo":
          return "/materialInfo";  
        case "materialTypeDetalis":
        case "materialType":
          return "/materialType";
        case "materialTypeadd":
        case "materialType":
          return "/materialType";
        case "picklistadd":
        case "pickList":
          return "/pickList";
        case "picklistedit":
        case "pickList":
          return "/pickList";  
        case "bomrunadd":
        case "BomRun":
          return "/BomRun";
        case "bomrunedit":
        case "BomRun":
          return "/BomRun";      
        case "trayRunadd":
        case "trayRun":
          return "/trayRun";
        case "resultingInadd":
        case "resultingIn":
          return "/resultingIn";
        case "resultingInDetails":
        case "resultingIn":
          return "/resultingIn";
        case "resultingOutDetails":
        case "resultingOut":
          return "/resultingOut";
        case "resultingOutadd":
        case "resultingOut":
          return "/resultingOut";
         case "stockRun":
        case "stockRun":
          return "/stockRun";
        case "orgadd": //系统设置
        case "org":
          return "/org"
        case "orgedit":
        case "org":
          return "/org"
        case "userRunadd": //用户管理新增
        case "userRun":
          return "/userRun"
        case "userRunedit": //用户管理编辑
        case "userRun":
          return "/userRun"   
        case "roleRunadd": //角色管理新增
        case "roleRun":
          return "/roleRun"
        case "roleRunedit": //角色管理编辑
        case "roleRun":
          return "/roleRun"
        case "accountRunedit": //账号管理编辑
        case "accountRun":
          return "/accountRun"   
        case "accountRunadd": //角色管理新增
        case "accountRun":
          return "/accountRun"
        case "accountRundetails": //角色管理编辑
        case "accountRun":
          return "/accountRun"     
        case "dataadd": //数据接口新增
        case "data":
          return "/data"
        case "dataedit": //数据接口编辑
        case "data":
          return "/data"
        case "logRunlook": //日志管理
        case "logRun":
          return "/logRun"
        case "RfidRundetalis": //数据接口编辑
        case "RfidRun":
          return "/RfidRun"
        case "RfidRunadd": //日志管理
        case "RfidRun":
          return "/RfidRun"
        case "wordbookRundetalis": //数据接口编辑
        case "wordbookRun":
          return "/wordbookRun"
        case "wordbookRunadd": //日志管理
        case "wordbookRun":
          return "/wordbookRun"
        case "produceTableadd": //数据接口编辑
        case "produceTable":
          return "/produceTable"
        case "produceTabledetalis": //日志管理
        case "produceTable":
          return "/produceTable"
        case "materialsTabledetalis": //物料报表编辑
        case "materialsTable":
          return "/materialsTable"
        case "materialsTableadd": //物料报表新增
        case "materialsTable":
          return "/materialsTable" 
        case "lossTabledetalis": //损耗报表编辑
        case "lossTable":
          return "/lossTable"
        case "lossTableadd": //损耗报表新增
        case "lossTable":
          return "/lossTable"
        case "checkingTabledetalis": //质检报表编辑
        case "checkingTable":
          return "/checkingTable"
        case "checkingTableadd": //质检报表新增
        case "checkingTable":
          return "/checkingTable"                                                                      
      }
    },
  },
  created(){
     usergetPowerUrl({
        parentId:sessionStorage.getItem('id')
      }).then(res =>{
        // console.log(res)
        this.$store.commit('setBtn',res.data.data)
      })
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ path: item.path });
      sessionStorage.setItem("id",item.id)
      usergetPowerUrl({
        parentId:item.id
      }).then(res =>{
        // console.log(res)
        this.$store.commit('setBtn',res.data.data)
      })
       this.$store.commit("selectMenu", item);
    },
  },
  
  
};
</script>

<style>

.aside-top {
  height: 60px;
  width: auto;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.aside-top p {
  color: #fff;
  margin-left: 5px;
}
.aside-top p span {
  display: inline-block;
  font-size: 16px;
}
.logo {
  display: inline-block;
  width: 34px;
  height: 34px;
  background: url("../../assets/goldLogo2.png") no-repeat;
  background-size: cover;
}
.max-widht {
  width: 200px;
}
.min-width {
  width: auto;
}
.min-widht .aside-top p {
  display: none;
}
.el-menu-item-group ul .el-menu-item {
  text-align: left;
}
.el-submenu .el-menu-item{
  padding-left: 70px!important;
}
.el-menu-item-group__title{
  padding: 0!important;
}
</style>
