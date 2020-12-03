import Mock from 'mockjs'

export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'wp') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menus: [
                {
                  id: 1,
                  name: "Index",
                  path: "/Index",
                  label: "首页",
                  icon: "eleme",
                  webUrl:'index/Index'
                },
                {
                  id: 2,
                  name: "production",
                  label: "生产计划",
                  icon: "eleme",
                  children: [
                    {
                      id: 2001,
                      path: "/ProductionTabMonthChild",
                      name: "ProductionTabMonthChild",
                      label: "生产月计划",
                      icon: "setting",
                      webUrl:"ProductionPlan/productionTabMonthChild"
                    },
                    {
                      id: 2001,
                      path: "/ProductionTabMonthChild",
                      name: "ProductionTabMonthChild",
                      label: "生产周计划",
                      icon: "setting",
                      webUrl:"ProductionPlan/productionTabWeekChild"
                    },
                    {
                      id: 2002,
                      path: "/createOrder",
                      name: "createOrder",
                      label: "创建通知单",
                      icon: "setting",
                      webUrl:'ProductionPlan/CreateOrder'
                    },
                  ],
                },
                {
                  id: 3,
                  name: "materialInfo",
                  label: "物料管理",
                  icon: "eleme",
                  children: [
                    {
                      id: 3001,
                      path: "/materialInfo",
                      name: "materialInfo",
                      label: "物料信息",
                      icon: "setting",
                      webUrl:'MaterialRun/MaterialInfo'
                    },
                    {
                      id: 3002,
                      path: "/materialType",
                      name: "materialType",
                      label: "物料类型",
                      icon: "setting",
                      webUrl:'MaterialRun/MaterialType'
                    },
                    {
                      id: 3003,
                      path: "/pickList",
                      name: "pickList",
                      label: "领料单",
                      icon: "setting",
                      webUrl:'MaterialRun/PickList'
                    },
                    {
                      id: 3004,
                      path: "/BomRun",
                      name: "BomRun",
                      label: "BOM管理",
                      icon: "setting",
                      webUrl:'MaterialRun/BomRun'
                    },
                  ],
                },
                {
                  id: 4,
                  name: "produceRun",
                  label: "生产管理",
                  icon: "eleme",
                  children: [
                    {
                      id: 4001,
                      path: "/produceRun",
                      name: "produceRun",
                      label: "生产管理",
                      icon: "setting",
                      webUrl:'produceRun/produceRun'
                    },
                    {
                      id: 4002,
                      path: "/groupRun",
                      name: "groupRun",
                      label: "班组管理",
                      icon: "setting",
                      webUrl:'produceRun/groupRun'
                    },
                    {
                      id: 4009,
                      path: "/equipageRun",
                      name: "equipageRun",
                      label: "设备管理",
                      icon: "setting",
                      webUrl:'produceRun/equipageRun'
                    },
                    {
                      id: 4003,
                      path: "/mixing",
                      name: "mixing",
                      label: "油墨混合",
                      icon: "setting",
                      webUrl:'produceRun/mixing'
                    },
                    {
                      id: 4010,
                      path: "/halfChecklist",
                      name: "halfChecklist",
                      label: "半成品清单",
                      icon: "setting",
                      webUrl:'produceRun/halfChecklist'
                    },
                    {
                      id: 4004,
                      path: "/produceDispatch",
                      name: "produceDispatch",
                      label: "生产调度",
                      icon: "setting",
                      webUrl:'produceRun/produceDispatch'
                    },
                    {
                      id: 4005,
                      path: "/produceSpeed",
                      name: "produceSpeed",
                      label: "生产进度",
                      icon: "setting",
                      webUrl:'produceRun/produceSpeed'
                    },
                    {
                      id: 4006,
                      path: "/qualityRun",
                      name: "qualityRun",
                      label: "质量管理",
                      icon: "setting",
                      webUrl:'produceRun/qualityRun'
                    },
                    {
                      id: 4007,
                      path: "/repairRun",
                      name: "repairRun",
                      label: "返修管理",
                      icon: "setting",
                      webUrl:'produceRun/repairRun'
                    },
                    {
                      id: 4008,
                      path: "/scrappedRun",
                      name: "scrappedRun",
                      label: "报废管理",
                      icon: "setting",
                      webUrl:'produceRun/scrappedRun'
                    },
                    {
                      id: 4008,
                      path: "/companyQuality",
                      name: "companyQuality",
                      label: "公司质量",
                      icon: "setting",
                      webUrl:'produceRun/companyQuality'
                    },
                  ],
                },
                {
                  id: 5,
                  name: "materialInfo",
                  label: "成品库存",
                  icon: "eleme",
                  children: [
                    {
                      id: 5001,
                      path: "/resultingIn",
                      name: "resultingIn",
                      label: "入库管理",
                      icon: "setting",
                      webUrl:'stock/resultingIn'
                    },
                    {
                      id: 5002,
                      path: "/resultingOut",
                      name: "resultingOut",
                      label: "出库管理",
                      icon: "setting",
                      webUrl:'stock/resultingOut'
                    },
                    {
                      id: 5003,
                      path: "/trayRun",
                      name: "trayRun",
                      label: "托盘管理",
                      icon: "setting",
                      webUrl:'stock/trayRun'
                    },
                    {
                      id: 5004,
                      path: "/stockRun",
                      name: "stockRun",
                      label: "库存管理",
                      icon: "setting",
                      webUrl:'stock/stockRun'
                    },
                  ],
                },
                {
                  id: 8,
                  name: "productOperation",
                  label: "产品管理",
                  icon: "eleme",
                  children: [
                    {
                      id: 8001,
                      path: "/productOperation",
                      name: "productOperation",
                      label: "产品操作",
                      icon: "setting",
                      webUrl:'productRun/productType'
                    },
                    {
                      id: 8002,
                      path: "/productType",
                      name: "productType",
                      label: "产品类型",
                      icon: "setting",
                      webUrl:'productRun/productOperation'
                    },
                  ],
                },
                {
                  id: 6,
                  name: "produceTable",
                  label: "报表中心",
                  icon: "eleme",
                  children: [
                    {
                      id: 6001,
                      path: "/produceTable",
                      name: "produceTable",
                      label: "生产报表",
                      icon: "setting",
                      webUrl:'tableCenter/produceTable'
                    },
                    {
                      id: 6002,
                      path: "/materialsTable",
                      name: "materialsTable",
                      label: "物料报表",
                      icon: "setting",
                      webUrl:'tableCenter/checkingTable'
                    },
                    {
                      id: 6003,
                      path: "/lossTable",
                      name: "lossTable",
                      label: "损耗报表",
                      icon: "setting",
                      url:'tableCenter/lossTable'
                    },
                    {
                      id: 6004,
                      path: "/checkingTable",
                      name: "checkingTable",
                      label: "质检报表",
                      icon: "setting",
                      webUrl:'tableCenter/materialsTable'
                    },
                  ],
                },
                {
                  id: 7,
                  name: "org",
                  label: "系统设置",
                  icon: "eleme",
                  children: [
                    {
                      id: 7001,
                      path: "/org",
                      name: "org",
                      label: "组织架构",
                      icon: "setting",
                      webUrl:'systemSet/org'
                    },
                    {
                      id: 7002,
                      path: "/userRun",
                      name: "userRun",
                      label: "人员管理",
                      icon: "setting",
                      webUrl:'systemSet/userRun'
                    },
                    {
                      id: 7003,
                      path: "/roleRun",
                      name: "roleRun",
                      label: "角色管理",
                      icon: "setting",
                      webUrl:'systemSet/roleRun'
                    },
                    {
                      id: 7004,
                      path: "/accountRun",
                      name: "accountRun",
                      label: "账号管理",
                      icon: "setting",
                      webUrl:'systemSet/accountRun'
                    },
                    {
                      id: 7005,
                      path: "/data",
                      name: "data",
                      label: "数据接口",
                      icon: "setting",
                      webUrl:'systemSet/data'
                    },
                    {
                      id: 7006,
                      path: "/logRun",
                      name: "logRun",
                      label: "日志管理",
                      icon: "setting",
                      webUrl:'systemSet/logRun'
                    },
                    {
                      id: 7007,
                      path: "/RfidRun",
                      name: "RfidRun",
                      label: "RFID标签管理",
                      icon: "setting",
                      webUrl:'systemSet/RfidRun'
                    },
                    {
                      id: 7008,
                      path: "/wordbookRun",
                      name: "wordbookRun",
                      label: "数据字典管理",
                      icon: "setting",
                      webUrl:'systemSet/wordbookRun'
                    },
                  ],
                },
              ],
          
            // token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'wp' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'index2',
                label: '首页',
                icon: 's-home',
                
                url: 'index/index'
              },
              {
                path: '/setting',
                name: 'setting',
                label: '设置',
                icon: 'video-play',
                url: 'setting/Setting'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
