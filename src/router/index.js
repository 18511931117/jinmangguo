import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Index from '@/view/index/Index' // 首页

import timeline from "@/view/index/timeLine/timeLine"

import production from '@/view/ProductionPlan/Production.vue' // 生产计划管理
import productionTabMonthChild from '@/view/ProductionPlan/ProductionTabMonthChild.vue' // 生产月计划管理
import productionTabWeekChild from '@/view/ProductionPlan/ProductionTabWeekChild.vue' // 生产周计划管理

import createOrder from '@/view/ProductionPlan/CreateOrder' // 创建通知单

import materialInfo from '@/view/MaterialRun/MaterialInfo' // 物料信息
import materialType from '@/view/MaterialRun/MaterialType' // 物料类型
import pickList from '@/view/MaterialRun/PickList' // 领料单
import BomRun from '@/view/MaterialRun/BomRun' // BOM 管理

import produceRun from '@/view/produceRun/produceRun' // 生产管理
import groupRun from '@/view/produceRun/groupRun' // 班组管理
import mixing from '@/view/produceRun/mixing' // 油墨混合
import produceDispatch from '@/view/produceRun/produceDispatch' // 生产调度
import produceSpeed from '@/view/produceRun/produceSpeed' // 生产进度
import qualityRun from '@/view/produceRun/qualityRun' // 质量管理
import repairRun from '@/view/produceRun/repairRun' // 返修管理
import scrappedRun from '@/view/produceRun/scrappedRun' // 报废管理
import equipageRun from "@/view/produceRun/equipageRun" //设备管理
import halfChecklist from "@/view/produceRun/halfChecklist" //半成品清单
import companyQuality from "@/view/produceRun/companyQuality"

import productOperation from "@/view/productRun/productOperation" //产品操作
import productType from "@/view/productRun/productType" //产品类型

import resultingIn from '@/view/stock/resultingIn' // 入库管理
import resultingOut from '@/view/stock/resultingOut' // 出库管理
import trayRun from '@/view/stock/trayRun' // 托盘管理
import stockRun from '@/view/stock/stockRun' // 库存管理


import produceTable from '@/view/tableCenter/produceTable' // 生产报表
import materialsTable from '@/view/tableCenter/materialsTable' // 物料报表
import lossTable from '@/view/tableCenter/lossTable' // 损耗报表
import checkingTable from '@/view/tableCenter/checkingTable' // 质检报表

import org from '@/view/systemSet/org' // 组织架构
import userRun from '@/view/systemSet/userRun' // 人员管理
import roleRun from '@/view/systemSet/roleRun' // 角色管理
import accountRun from '@/view/systemSet/accountRun' // 账号管理
import data from '@/view/systemSet/data' // 数据接口
import logRun from '@/view/systemSet/logRun' // 角色管理
import RfidRun from '@/view/systemSet/RfidRun' // RFID管理
import wordbookRun from '@/view/systemSet/wordbookRun' // 数据字典管理

import CreateOrderadd from "@/view/ProductionPlan/CreateOrder/CreateOrderadd"  //通知单新增
import CreateOrderlook from "@/view/ProductionPlan/CreateOrder/CreateOrderlook"
import CreateOrderdetails from "@/view/ProductionPlan/CreateOrder/CreateOrderdetails"  //通知单新增

import ProductionMonthTabsDetails from "@/view/ProductionPlan/ProductionMonth/ProductionMonthadd/ProductionMonthTabsDetails"

import  ProductionMonthedit from "@/view/ProductionPlan/ProductionMonth/ProductionMonthedit"
import  ProductionMonthadd from "@/view/ProductionPlan/ProductionMonth/ProductionMonthadd"
import  ProductionWeekedit from "@/view/ProductionPlan/ProductionWeek/ProductionWeekedit"
import  ProductionWeekadd from "@/view/ProductionPlan/ProductionWeek/ProductionWeekadd"

import produceRundetalis from "@/view/produceRun/produceRun/produceRundetalis" //生产管理新增
import mixingadd from "@/view/produceRun/mixing/mixingadd" //油墨混合新增
import mixingdetails from "@/view/produceRun/mixing/mixingdetails" //油墨混合新增
import mixingedit from "@/view/produceRun/mixing/mixingedit" //油墨混合新增
import qualityRunadd from "@/view/produceRun/qualityRun/qualityRunadd"
import qualityRundetails from "@/view/produceRun/qualityRun/qualityRundetails"
import equipageRunadd from "@/view/produceRun/equipageRun/equipageRunadd" //设备管理新增
import equipageRunedit from "@/view/produceRun/equipageRun/equipageRunedit" //设备管理新增
import repairRunadd from "@/view/produceRun/repairRun/repairRunadd" //返修管理新增
import groupRunadd from "@/view/produceRun/groupRun/groupRunadd"
import groupRunedit from "@/view/produceRun/groupRun/groupRunedit"
import produceDispatchchange from "@/view/produceRun/produceDispatch/produceDispatchchange" //生产调度变更
import scrappedRunadd from "@/view/produceRun/scrappedRun/scrappedRunadd" //报废管理新增
import scrappedRunedit from "@/view/produceRun/scrappedRun/scrappedRunedit" //报废管理修改
import halfChecklistlook from "@/view/produceRun/halfChecklist/halfChecklistlook"

import companyQualityedit from "@/view/produceRun/companyQuality/companyQualityedit"
import productQualitydetails from "@/view/produceRun/productQuality/productQualitydetails"


import materialInfoadd from "@/view/MaterialRun/materialInfo/materialInfoadd" //物料信息新增
import materialInfoedit from "@/view/MaterialRun/materialInfo/materialInfoedit" //物料信息新增

import materialInfoDetalis from "@/view/MaterialRun/materialInfo/materialInfoDetalis" //物料信息详情
import materialTypeadd from "@/view/MaterialRun/MaterialType/MaterialTypeadd" //物料类型 新增
import materialTypeDetalis from "@/view/MaterialRun/MaterialType/MaterialTypeDetalis" //物料类型 详情
import picklistadd from "@/view/MaterialRun/pickList/picklistadd" //领料单 新增
import picklistedit from "@/view/MaterialRun/pickList/picklistedit" //领料单 新增

import bomrunadd from "@/view/MaterialRun/bomrun/bomrunadd"
import bomrunedit from "@/view/MaterialRun/bomrun/bomrunedit"


import productOperationadd from "@/view/productRun/productOperation/productOperationadd" //产品操作新增
import productOperationdetails from "@/view/productRun/productOperation/productOperationdetails" //产品操详情
import productTypeadd from "@/view/productRun/productType/productTypeadd"
import productTypedetails from "@/view/productRun/productType/productTypedetails"

import trayRunadd from "@/view/stock/trayRunadd/trayRunadd" // 托盘管理新增
import resultingInadd from "@/view/stock/resultingInadd/resultingInadd" //入库管理新增
import resultingInDetails from "@/view/stock/resultingInDetails/resultingInDetails" //入库管理新增
import resultingOutadd from "@/view/stock/resultingOut/resultingOutadd"
import resultingOutDetails from "@/view/stock/resultingOut/resultingOutDetails"
import stockRundetails from "@/view/stock/stockRun/stockRundetails"

import produceTabledetalis from "@/view/tableCenter/produceTable/produceTabledetalis"
import produceTableadd from "@/view/tableCenter/produceTable/produceTableadd"
import materialsTableadd from "@/view/tableCenter/materialsTable/materialsTableadd"
import materialsTabledetalis from "@/view/tableCenter/materialsTable/materialsTabledetalis"
import lossTableadd from "@/view/tableCenter/lossTable/lossTableadd"
import lossTabledetalis from "@/view/tableCenter/lossTable/lossTabledetalis"
import checkingTableadd from "@/view/tableCenter/checkingTable/checkingTableadd"
import checkingTabledetalis from "@/view/tableCenter/checkingTable/checkingTabledetalis"
import productQuality from "@/view/produceRun/productQuality"
import productQualityedit from "@/view/produceRun/productQuality/productQualityedit"

import orgadd from "@/view/systemSet/org/orgadd"
import orgedit from "@/view/systemSet/org/orgedit"
import userRunadd from "@/view/systemSet/userRun/userRunadd"
import userRunedit from "@/view/systemSet/userRun/userRunedit"
import roleRunadd from "@/view/systemSet/roleRun/roleRunadd"
import roleRunedit from "@/view/systemSet/roleRun/roleRunedit"
import accountRunadd from "@/view/systemSet/accountRun/accountRunadd"
import accountRunedit from "@/view/systemSet/accountRun/accountRunedit"
import accountRundetails from "@/view/systemSet/accountRun/accountRundetails"
import dataadd from "@/view/systemSet/data/dataadd"
import dataedit from "@/view/systemSet/data/dataedit"
import logRunlook from "@/view/systemSet/logRun/logRunlook"
import RfidRundetalis from "@/view/systemSet/RfidRun/RfidRundetalis"
import RfidRunadd from "@/view/systemSet/RfidRun/RfidRunadd"
import wordbookRundetalis from "@/view/systemSet/wordbookRun/wordbookRundetalis"
import wordbookRunadd from "@/view/systemSet/wordbookRun/wordbookRunadd"

import login from "@/view/login/login"

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:"/Index",
      children: [

        

        {
          path: '/timeline', //
          name: 'timeline',
          component: timeline //周
        },
        {
          path: '/ProductionWeekadd', //
          name: 'ProductionWeekadd',
          component: ProductionWeekadd //周
        },
        {
          path: '/ProductionWeekedit', //
          name: 'ProductionWeekedit',
          component: ProductionWeekedit //周编辑
        },
        {
          path: '/ProductionMonthadd', //
          name: 'ProductionMonthadd',
          component: ProductionMonthadd //周
        },
        {
          path: '/ProductionMonthedit', //
          name: 'ProductionMonthedit',
          component: ProductionMonthedit //周编辑
        },
        {
          path: '/resultingInadd', //
          name: 'resultingInadd',
          component: resultingInadd //入库管理新增
        },
        {
          path:'/resultingInDetails',
          name: 'resultingInDetails',
          component: resultingInDetails //入库管理详情
        },
        {
          path:'/resultingOutadd',
          name: 'resultingOutadd',
          component: resultingOutadd //出库管理详情
        },
        {
          path:'/resultingOutDetails',
          name: 'resultingOutDetails',
          component: resultingOutDetails //出库管理详情
        },
        {
          path:'/trayRunadd',
          name:'trayRunadd',
          component:trayRunadd, //托盘管理新增
        },
        {
          path:'/materialInfoDetalis',
          name:'materialInfoDetalis',
          component:materialInfoDetalis, //物料信息详情
        },
        {
          path:'/materialInfoadd',
          name:'materialInfoadd',
          component:materialInfoadd, //物料信息新增
        },
        {
          path:'/materialInfoedit',
          name:'materialInfoedit',
          component:materialInfoedit, //物料信息新增
        },
        {
          path:'/materialTypeDetalis',
          name:'materialTypeDetalis',
          component:materialTypeDetalis, //物料信息详情
        },
        {
          path:'/materialTypeadd',
          name:'materialTypeadd',
          component:materialTypeadd, //物料信息新增
        },
        {
          path:'/picklistadd',
          name:'picklistadd',
          component:picklistadd, //领料单新增
        },
        {
          path:'/picklistedit',
          name:'picklistedit',
          component:picklistedit, //领料单新增
        },
        {
          path:'/bomrunadd',
          name:'bomrunadd',
          component:bomrunadd, //bom新增
        },
        {
          path:'/bomrunedit',
          name:'bomrunedit',
          component:bomrunedit, //bom新增
        },
        {
          path:'/productOperationadd',
          name:'productOperationadd',
          component:productOperationadd, //产品操作新增productTypeadd
        },
        {
          path:'/productOperationdetails',
          name:'productOperationdetails',
          component:productOperationdetails, //产品操作新增productTypeadd
        },
        {
          path:'/productTypeadd',
          name:'productTypeadd',
          component:productTypeadd, //产品操作新增
        },
        {
          path:'/productTypedetails',
          name:'productTypedetails',
          component:productTypedetails, //产品操作新增
        },
        {
          path:'/produceRundetalis',
          name:'produceRundetalis',
          component:produceRundetalis, //生产管理详情
        },
        {
          path:'/mixingadd',
          name:'mixingadd',
          component:mixingadd, //油墨混合新增
        },
        {
          path:'/mixingdetails',
          name:'mixingdetails',
          component:mixingdetails, //油墨混合修改
        },
        {
          path:'/productQualitydetails',
          name:'productQualitydetails',
          component:productQualitydetails, //油墨混合编辑
        },
        {
          path:'/mixingedit',
          name:'mixingedit',
          component:mixingedit, //油墨混合编辑
        },
        {
          path:'/companyQualityedit',
          name:'companyQualityedit',
          component:companyQualityedit, //半成品清单查看
        },
        {
          path:'/halfChecklistlook',
          name:'halfChecklistlook',
          component:halfChecklistlook, //半成品清单查看
        },
        {
          path:'/scrappedRunadd',
          name:'scrappedRunadd',
          component:scrappedRunadd, //报废管理新增
        },
        {
          path:'/scrappedRunedit',
          name:'scrappedRunedit',
          component:scrappedRunedit, //报废管理新增
        },
        {
          path:'/qualityRunadd',
          name:'qualityRunadd',
          component:qualityRunadd, //质量管理新增 
        },
        {
          path: '/productQualityedit', //
          name: 'productQualityedit',
          component: productQualityedit //
        },
        {
          path:'/qualityRundetails',
          name:'qualityRundetails',
          component:qualityRundetails, //质量管理新增 
        },
        {
          path:'/equipageRunadd',
          name:'equipageRunadd',
          component:equipageRunadd, //设备管理新增 
        },
        {
          path:'/equipageRunedit',
          name:'equipageRunedit',
          component:equipageRunedit, //设备管理编辑
        },
        {
          path:'/repairRunadd',
          name:'repairRunadd',
          component:repairRunadd //返修管理 新增
        },
        {
          path:'/groupRunadd',
          name:'groupRunadd',
          component:groupRunadd //返修管理 新增
        },
        {
          path:'/groupRunedit',
          name:'groupRunedit',
          component:groupRunedit //返修管理 编辑
        },
        {
          path:'/produceDispatchchange',
          name:'produceDispatchchange',
          component:produceDispatchchange //返修管理 新增 
        },
        {
          path:'/stockRundetails',
          name:'stockRundetails',
          component:stockRundetails //返修管理 新增 
        },
        {
          path:'/ProductionMonthTabsDetails',
          name:'ProductionMonthTabsDetails',
          component:ProductionMonthTabsDetails //月计划 详情 
        },
        {
          path:'/CreateOrderadd',
          name:'CreateOrderadd',
          component:CreateOrderadd //返修管理 新增 
        },
        {
          path:'/CreateOrderdetails',
          name:'CreateOrderdetails',
          component:CreateOrderdetails //返修管理 新增 
        },
        {
          path:'/CreateOrderlook',
          name:'CreateOrderlook',
          component:CreateOrderlook //返修管理 新增 
        },
        {
          path:'/orgadd',
          name:'orgadd',
          component:orgadd //组织架构 新增 
        },
        {
          path:'/orgedit',
          name:'orgedit',
          component:orgedit //组织架构 编辑 
        },
        {
          path:'/userRunadd',
          name:'userRunadd',
          component:userRunadd //用户管理 新增 
        },
        {
          path:'/userRunedit',
          name:'userRunedit',
          component:userRunedit //用户管理 编辑 
        },
        {
          path:'/roleRunadd',
          name:'roleRunadd',
          component:roleRunadd //用户管理 新增 
        },
        {
          path:'/roleRunedit',
          name:'roleRunedit',
          component:roleRunedit //用户管理 编辑 
        },
        {
          path:'/accountRunadd',
          name:'accountRunadd',
          component:accountRunadd //z账号管理 新增 
        },
        {
          path:'/accountRunedit',
          name:'accountRunedit',
          component:accountRunedit //z账号管理 编辑 
        },
        {
          path:'/accountRundetails',
          name:'accountRundetails',
          component:accountRundetails //z账号管理 编辑 
        },
        {
          path:'/dataadd',
          name:'dataadd',
          component:dataadd //z账号管理 编辑 
        },
        {
          path:'/dataedit',
          name:'dataedit',
          component:dataedit //z账号管理 编辑 
        },
        {
          path:'/logRunlook',
          name:'logRunlook',
          component:logRunlook //日志管理 编辑 
        },
        {
          path:'/RfidRunadd',
          name:'RfidRunadd',
          component:RfidRunadd //Rfid管理 新增 
        },
        {
          path:'/RfidRundetalis',
          name:'RfidRundetalis',
          component:RfidRundetalis //Rfid管理 编辑
        },
        {
          path:'/wordbookRunadd',
          name:'wordbookRunadd',
          component:wordbookRunadd //Rfid管理 新增 
        },
        {
          path:'/wordbookRundetalis',
          name:'wordbookRundetalis',
          component:wordbookRundetalis //Rfid管理 编辑
        },
        {
          path:'/produceTableadd',
          name:'produceTableadd',
          component:produceTableadd //生产报表 新增 
        },
        {
          path:'/produceTabledetalis',
          name:'produceTabledetalis',
          component:produceTabledetalis //生产报表 编辑
        },
        {
          path:'/materialsTableadd',
          name:'materialsTableadd',
          component:materialsTableadd //生产报表 新增 
        },
        {
          path:'/materialsTabledetalis',
          name:'materialsTabledetalis',
          component:materialsTabledetalis //生产报表 编辑
        },
        {
          path:'/lossTableadd',
          name:'lossTableadd',
          component:lossTableadd //生产报表 新增 
        },
        {
          path:'/lossTabledetalis',
          name:'lossTabledetalis',
          component:lossTabledetalis //生产报表 编辑
        },
        {
          path:'/checkingTableadd',
          name:'checkingTableadd',
          component:checkingTableadd //质检报表 新增 
        },
        {
          path:'/checkingTabledetalis',
          name:'checkingTabledetalis',
          component:checkingTabledetalis //质检报表 编辑
        },
      ]
    }
  ]
})
