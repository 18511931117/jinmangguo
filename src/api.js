import { get,post } from "./http"
import QS, { stringify } from "qs"


// export const login = (params) =>{
//     return post(`api/permission/getMenu`,params)
// }
export const loginApi = (params) => {
    return post('/login',QS.stringify(params))
}
export const getMenu = (params) => {
    return get('/api/sys/user/menu',params)
}

//首页
export const getIndexData = (params) => {
    return get('/api/production/Progress/getSumCount',params)
}
export const getIndexgetYearSumCount = (params) => {
    return get('/api/production/Progress/getYearSumCount',params)
}
export const getIndexgetMonthSumCount = (params) => {
    return get('/api/production/Progress/getMonthSumCount',params)
}

export const getIndexgetDaySumCount = (params) => {
    return get('/api/production/Progress/getDaySumCount',params)
}

export const getIndexgetDayProcessCount = (params) => {
    return get('/api/production/Progress/getDayProcessCount',params)
}


export const getIndexgetMonthProcessCount = (params) => {
    return get('/api/production/Progress/getMonthProcessCount',params)
}

export const getIndexgetYearProcessCount = (params) => {
    return get('/api/production/Progress/getYearProcessCount',params)
}

export const getIndexgetMonthStockCount = (params) => {
    return get('/api/production/Progress/getMonthStockCount',params)
}

export const getIndexgetDayStockCount = (params) => {
    return get('/api/production/Progress/getDayStockCount',params)
}

export const getIndexgetYearStockCount = (params) => {
    return get('/api/production/Progress/getYearStockCount',params)
}

export const getIndexgetWeekSumCount = (params) => {
    return get(`/api/production/Progress/getWeekSumCount`,params)
}

export const getProductWorkflow = (params) => {
    return get(`/api/production/Progress/getProductWorkflow`,params)
}

//生产计划 》生产计划管理 >月计划

export const monthgetPage = (params) => {
    return get(`/api/production/monthPlan/getDtoPage`,params)
}

export const monthPlanexportData = (params) => {
    return get(`/api/production/monthPlan/exportData`,params)
}

export const monthget = (id) => {
  return get(`/api/production/monthPlan/getDto/${id}`)
}

export const monthPlaninsertMonthPlan = (params) => {
    return post(`/api/production/monthPlan/insertMonthPlan`,params)
}


export const delMonthPlaninsertMonthPlan = (params) => {
  return post(`/api/production/monthPlan/delete`,QS.stringify(params))
}

export const updateMonthPlaninsertMonthPlan = (params) => {
  return post(`/api/production/monthPlan/updateMonthPlan`,params)
}

// monthPlaninsertMonthPlan({},{
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

//生产计划 》 生产计划管理》周计划
export const weekgetPage = (params) => {
    return get(`/api/production/monthWeek/getDtoPage`,params)
}


export const insertWeekPlan = (params,config) => {
    return post(`/api/production/monthWeek/insertWeekPlan`,params,config)
}

export const monthWeekgetWeekPlan = (params) => {
    return get(`/api/production/monthWeek/getWeekPlan`,params,)
}

export const monthWeekupdateWeekPlanDetail = (params,config) => {
    console.log(params)
    return post(`/api/production/monthWeek/updateWeekPlanDetail`,params,config)
}

export const monthWeekupdateWeekdelete = (params) => {
    return post(`/api/production/monthWeek/delete`,QS.stringify(params))
}

export const weekinsert = (params,config) => {
    return post(`/api/production/monthWeek/insertWeekPlan`,params,config)
}

//创建通知单
export const noticegetPage = (params) => {
    return get(`/api/production/notice/getPage`,params)
}

export const noticegetAll = (params) => {
    return get(`/api/production/notice/getAll`,params)
}

export const noticeget = (id) => {
  return get(`/api/production/notice/getDto/${id}`)
}
export const noticeInsert = (params) => {
    return post(`/api/production/notice/insertNotice`,params)
}

export const noticeUpdate = (params) => {
  return post(`/api/production/notice/updateNotice`,params)
}
//创建通知单 》生产工序
export const processgetPage = (params) => {
    return get(`/api/production/process/getAll`,params)
}
//
export const devicegetAll = (params) => {
    return get(`/api/production/device/getAll`,params)
}
//工序详情
export const noticeDevicegetPage = (params) => {
    return get(`/api/production/noticeDeviceDetailed/getPage`,params)
}
//工序详情 添加
export const noticeDeviceinsert = (params) => {
    return post(`/api/production/noticeDeviceDetailed/insert`,QS.stringify(params))
}
//工序详情 删除

export const noticeDeviceDel = (params) => {
    return post(`/api/production/noticeDeviceDetailed/delete`,QS.stringify(params))
}

//物料管理 》物料信息

export const infogetPage = (params) => {
    return get(`/api/materiel/info/getPage`,params)
}
export const infogetAll = (params) => {
    return get(`/api/materiel/info/getAll`,params)
}



export const infoDel = (params) => {
    return post(`/api/materiel/info/delete`,QS.stringify(params))
}
export const infoInsert = (params) => {
    return post(`/api/materiel/info/insert`,QS.stringify(params))
}
export const infoEdit = (id) => {
    return get(`/api/materiel/info/get/${id}`)
}
export const infoEditSubmit = (params) => {
    return post(`/api/materiel/info/update`,QS.stringify(params))
}
//物料管理 》物料类型
export const typegetPage = (params) => {
    return get(`/api/materiel/type/getPage`,params)
}
export const typegetAll = (params) => {
  return get(`/api/materiel/type/getAll`,params)
}

export const typeDel = (params) => {
    return post(`/api/materiel/type/delete`,QS.stringify(params))
}
export const typeInsert = (params) => {
    return post(`/api/materiel/type/insert`,QS.stringify(params))
}
export const typeEdit = (id) => {
    return get(`/api/materiel/type/get/${id}`)
}
export const typeEditSubmit = (params) => {
    return post(`/api/materiel/type/update`,QS.stringify(params))
}

//物料管理 》物料类型
export const pickinggetPage = (params) => {
    return get(`/api/materiel/picking/getPage`,params)
}
export const pickinggetAll = (params) => {
    return get(`/api/materiel/picking/getAll`,params)
}
export const pickingInsert = (params) => {
    return post(`/api/materiel/picking/insert`,QS.stringify(params))
}

export const pickinginsertPicking = (params,config) => {
    return post(`/api/materiel/picking/insertPicking`,params,config)
}

export const pickinginsertgetDto = (id) => {
    return get(`/api/materiel/picking/getDto/${id}`)
}

export const pickingupdatePicking = (params,config) => {
    return post(`/api/materiel/picking/updatePicking`,params,config)
}

//物料管理 》BOM管理

export const bomgetPage = (params) => {
    return get(`/api/materiel/bom/getPage`,params)
}
export const bomgetAll = (params) => {
    return get(`/api/materiel/bom/getAll`,params)
}

export const bominsertBom = (params,config) => {
    return post(`/api/materiel/bom/insertBom`,params,config)
}


export const getDtoBom = (id) => {
    return get(`/api/materiel/bom/getDto/${id}`,)
}


export const bomupdateBom = (params,config) => {
    return post(`/api/materiel/bom/updateBom`,params,config)
}

export const bomDetailedgetAll = (params) => {
    return get(`/api/materiel/bomDetailed/getAll`,params)
}
export const bomDel = (params) => {
    return post(`/api/materiel/bom/delete`,QS.stringify(params))
}
export const bomInsert = (params) => {
    return post(`/api/materiel/bom/insert`,QS.stringify(params))
}
export const bomEdit = (id) => {
    return get(`/api/materiel/bom/get/${id}`)
}
export const bomEditSubmit = (params) => {
    return post(`/api/materiel/bom/update`,QS.stringify(params))
}


//产品管理 》产品信息
export const infogetPageApi = (params) => {
    return get(`/api/product/info/getPage`,params)
}
export const infoInsertApi = (params) => {
    return post(`/api/product/info/insert`,QS.stringify(params))
}
export const infoEditApi = (id) => {
    return get(`/api/product/info/get/${id}`,)
}
export const infoEditSubmitApi = (params) => {
    return post(`/api/product/info/update`,QS.stringify(params))
}
export const infoDelApi = (params) => {
    return post(`/api/product/info/delete`,QS.stringify(params))
}

//产品管理 》产品类型

export const typegetPageApi = (params) => {
    return get(`/api/product/type/getPage`,params)
}
export const typegetAllApi = (params) => {
  return get(`/api/product/type/getAll`,params)
}
export const typeInsertApi = (params) => {
    return post(`/api/product/type/insert`,QS.stringify(params))
}
export const typeEditApi = (id) => {
    return get(`/api/product/type/get/${id}`,)
}
export const typeEditSubmitApi = (params) => {
    return post(`/api/product/type/update`,QS.stringify(params))
}

export const typeDelApi = (params) => {
    return post(`/api/product/type/delete`,QS.stringify(params))
}


//成品库存 》库存管理
export const roomgetPage = (params) => {
    return get(`/api/stock/in/getStockInDetailsPage`,params)
}
export const roomgetAll = (params) => {
    return get(`/api/stock/room/getAll`,params)
}
export const roomEdit = (id) => {
    return get(`/api/stock/room/get/${id}`)
}
//成品库存 》入库操作
export const ingetPage = (params) => {
    return get(`/api/stock/in/getPageDto`,params)
}

export const ingetAll = (params) => {
    return get(`/api/stock/in/getAll`,params)
}
export const inEdit = (id) => {
    return get(`/api/stock/in/get/${id}`)
}
//成品库存 》出库操作
export const outgetPage = (params) => {
    return get(`/api/stock/out/getStockOutDetailsPage`,params)
}
export const outgetAll = (params) => {
    return get(`/api/stock/out/getAll`,params)
}
export const outEdit = (id) => {
    return get(`/api/stock/out/get/${id}`)
}

//生产信息
export const productinfogetAll = (params) => {
    return get(`/api/product/info/getAll`,params)
}

export const productioninfogetAll = (params) => {
    return get(`/api/production/info/getAll`,params)
}
export const productioninfogetPage = (params) => {
    return get(`api/production/info/getPage`,params)
}

//生产管理 》生产报废
export const scrapgetPage = (params) => {
    return get(`/api/production/scrap/getPage`,params)
}

export const scrapinsertScrap = (params,config) => {
    return post(`/api/production/scrap/insertScrap`,params,config)
}

export const scrapgetDto = (id) => {
    return get(`/api/production/scrap/getDto/${id}`)
}

export const scrapupdateScrap = (params,config) => {
    return post(`/api/production/scrap/updateScrap`,params,config)
}
export const scrapgetAll = (params) => {
    return get(`/api/production/scrap/getAll`,params)
}
export const scrapDel = (params) => {
    return post(`/api/production/scrap/delete`,QS.stringify(params))
}
export const scarpInsert = (params) => {
    return post(`/api/production/scrap/insert`,QS.stringify(params))
}
export const scrapEdit = (id) => {
    return get(`/api/production/scrap/get/${id}`)
}
export const scrapEditSubmit = (params) => {
    return post(`/api/production/scrap/update`,QS.stringify(params))
}
//半成品
export const infoBangetPage = (params) => {
    return get(`/api/production/info/getSemiProductPage`,params)
}


//油墨
export const prinkgetPage = (params) => {
    return get(`/api/production/prink/getPage`,params)
}

export const prinkgetAll = (params) => {
    return get(`/api/production/prink/getAll`,params)
}
export const prinkDel = (params) => {
    return post(`/api/production/prink/delete`,QS.stringify(params))
}
export const prinkInsert = (params) => {
    return post(`/api/production/prink/insert`,QS.stringify(params))
}

//公司质检

export const qualityCompanyFinishgetPage = (params) => {
    return get(`/api/production/qualityCompanyFinish/getPage`,params)
}

// export const qualityCompanyFinishget = (id) => {
//     return get(`/api/production/qualityCompanyFinish/get/${id}`)
// }


export const qualityCompanyFinishDetailsgetPage = (params) => {
    return get(`/api/production/qualityCompanyFinishDetails/getPage`,params)
}

export const qualityCompanyFinishinsert = (params,config) => {
    return post(`/api/production/qualityCompanyFinish/insert`,params,config)
}

export const qualityCompanyFinishDetailsgetAll = (params) => {
    return get(`/api/production/qualityCompanyFinishDetails/getAll`,params)
}

export const qualityCompanyFinishDetailsupdate = (params) => {
    return post(`/api/production/qualityCompanyFinishDetails/update`,params)
}

export const prinkinsertData = (params,config) => {
    return post(`/api/production/prink/insertData`,params,config)
}
export const prinkEdit = (id) => {
    return get(`/api/production/prink/get/${id}`,)
}
export const prinkEditSubmit = (params) => {
    return post(`/api/production/prink/update`,QS.stringify(params))
}
export const prinkEditUpdateDataSubmit = (params,config) => {
    return post(`/api/production/prink/updateData`,params,config)
}

//油墨详情
export const prinkDetailgetPage = (params) => {
    return get(`/api/production/prinkDetail/getAll`,params)
}
export const prinkDetailInsert = (params) => {
    return post(`/api/production/prinkDetail/insert`,params)
}

export const pickingDetailedgetPage = (params) => {
    return get(`/api/materiel/pickingDetailed/getPage`,params)
}

//生产管理 》生产班组
export const teamgetPage = (params) => {
    return get(`/api/production/team/getPageDto`,params)
}
export const teamgetAll = (params) => {
    return get(`/api/production/team/getAll`,params)
}

export const teamDel = (params) => {
    return post(`/api/production/team/delete`,QS.stringify(params))
}


export const insertTeam = (params,config) => {
    return post(`/api/production/team/insertTeam`,params,config)
}


export const updateTeam = (params,config) => {
    return post(`/api/production/team/updateTeam`,params,config)
}
export const teamInsert = (params) => {
    return post(`/api/production/team/insert`,QS.stringify(params))
}
export const teamEdit = (id) => {
    return get(`/api/production/team/get/${id}`)
}

export const teamEditgetDto = (id) => {
    return get(`/api/production/team/getDto/${id}`)
}
export const teamEditSubmit = (params) => {
    return post(`/api/production/team/update`,QS.stringify(params))
}
//生产管理 》设备管理
export const devicegetPage = (params) => {
    return get(`/api/production/device/getPage`,params)
}
export const deviceDel = (params) => {
    return post(`/api/production/device/delete`,QS.stringify(params))
}
export const deviceInsert = (params) => {
    return post(`/api/production/device/insert`,QS.stringify(params))
}
export const deviceinsertDevice = (params,config) => {
    return post(`/api/production/device/insertDevice`,params,config)
}

export const devicegetDto = (id) => {
    return get(`/api/production/device/getDto/${id}`)
}



export const deviceupdateDevice = (params,config) => {
    return post(`/api/production/device/updateDevice`,params,config)
}

export const deviceEdit = (id) => {
    return get(`/api/production/device/get/${id}`)
}
export const deviceEditSubmit = (params) => {
    return post(`/api/production/device/update`,QS.stringify(params))
}

//生产管理 》在线质量
// export const qualitygetPage = (params) => {
//     return get(`/api/production/quality/getPage`,params)
// }
// export const qualityDel = (params) => {
//     return get(`/api/production/quality/delete`,params)
// }
export const qualityOnlinegetPage = (params) => {
    return get(`/api/production/qualityOnline/getPageDto`,params)
}

export const qualityOnlinegetAll = (params) => {
    return get(`/api/production/qualityOnline/getAll`,params)
}


//成品质量

export const qualityFinishgetPage = (params) => {
    return get(`/api/production/qualityFinish/getPageDto`,params)
}


 //系统管理
//角色管理 获取分页
export const rolegetPage = (params) => { //
    return get('/api/sys/role/getPage',params)
}
export const rolegetAll = (params) => { //
  return get('/api/sys/role/getAll',params)
}
//角色管理 》增加
// export const roleInsert = (params) => { //
//     return post('/api/sys/role/insert',QS.stringify(params))
// }
//获取tree
export const getTree = (params) => {
    return get(`/api/sys/power/getTree`,params)
}

export const roleInsert = (params,config) => { //
    return post('/api/sys/role/insertRole',params,config)
}

//角色管理 》编辑
export const roleEdit = (id) => {
    return get(`/api/sys/role/getDto/${id}`)
}
//角色管理 》编辑》提交
export const roleEditSubmit = (params,config) => {
    return post(`/api/sys/role/updateRole`,params,config)
}
//角色管理 》删除
export const roleDel = (params) => {
    return post('/api/sys/role/delete',QS.stringify(params))
}

//用户管理 获取分页
export const usergetPage = (params) => {
    return get('/api/sys/user/getPage',params)
}
export const usergetAll = (params) => {
  return get('/api/sys/user/getAll',params)
}
//用户管理 》增加
export const userInsert = (params) => { //
    return post('/api/sys/user/insert',QS.stringify(params))
}
//用户管理 》删除
export const userDel = (params) => {
    return post('/api/sys/user/delete',QS.stringify(params))
}
//用户管理》 编辑
export const userEdit = (id) => {
    return get(`/api/sys/user/get/${id}`)
}
//用户管理》 编辑 》提交
export const userEditSubmit = (params) => {
    return post(`/api/sys/user/update`,QS.stringify(params))
}

//系统日志》获取分页
export const loggetPage = (params) => {
    return get(`/api/sys/log/getPage`,params)
}
export const loggetAll = (params) => {
    return get(`/api/sys/log/getAll`,params)
}

// RFID 》分页
export const rfidGetPage = (params) => {
    return get('/api/sys/rfid/getPage',params)
}

export const rfidgetAll = (params) => {
    return get('/api/sys/rfid/getAll',params)
}
// RFID 》增加
export const rfidInsert = (params) => {
    return post(`/api/sys/rfid/insert`,QS.stringify(params))
}
//rfid >编辑
export const rfidEdit = (id) => {
    return get(`/api/sys/rfid/get/${id}`)
}
//rfid 》编辑提交
export const rfidEditSubmit = (params) => {
    return post(`/api/sys/rfid/update`,QS.stringify(params))
}
//rfid 》删除
export const rfidDel = (params) => {
    return post(`/api/sys/rfid/delete`,QS.stringify(params))
}

//数字字典 》获取分页
export const wordgetPage = (params) => {
    return get(`/api/sys/pram/getPage`,params)
}
export const wordgetAll = (params) => {
    return get(`/api/sys/pram/getAll`,params)
}

//数字字典 》添加
export const wordInsert = (params) => { //
    return post('/api/sys/pram/insert',QS.stringify(params))
}
//数字字典 》编辑
export const wordEdit = (id) => {
    return get(`/api/sys/pram/get/${id}`)
}
//数字字典》编辑 提交
export const wordEditSubmit = (params) => {
    return post(`/api/sys/pram/update`,QS.stringify(params))
}
//数字 字典》 删除
export const wordDel = (params) => {
    return post(`/api/sys/pram/delete`,QS.stringify(params))
}

//组织机构
export const orggetPage = (params) => {
    return get(`/api/sys/org/getPage`,params)
}
export const orggetAll= (params) => {
  return get(`/api/sys/org/getAll`,params)
}
export const orgDel = (params) => {
    return post(`/api/sys/org/delete`,QS.stringify(params))
}
export const orgInsert = (params) => {
    return post(`/api/sys/org/insert`,QS.stringify(params))
}
export const orgEdit = (id) => {
    return get(`/api/sys/org/get/${id}`)
}
export const orgEditSubmit = (params) => {
    return post(`/api/sys/org/update`,QS.stringify(params))
}


//权限管理
export const accountgetPage = (params) => {
    return get(`/api/sys/power/getPage`,params)
}
export const accountgetAll = (params) => {
    return get(`/api/sys/power/getAll`,params)
}
export const accountDel = (params) => {
    return post(`/api/sys/power/delete`,QS.stringify(params))
}
export const accountInsert = (params) => {
    return post(`/api/sys/power/insert`,QS.stringify(params))
}
export const accountEdit = (id) => {
    return get(`/api/sys/power/get/${id}`)
}
export const accountEditSubmit = (params) => {
    return post(`/api/sys/power/update`,QS.stringify(params))
}

//按钮权限

export const usergetPowerUrl = (params) => {
    return get(`/api/sys/user/getPowerUrl`,params)
}


//在线质量
export const qualityOnlineDetailsGet = (id) => {
    return get(`/api/production/qualityOnlineDetails/get/${id}`)
}

export const qualityOnlineDetailsUpdate = (params) => {
  return post(`/api/production/qualityOnlineDetails/update`,params)
}

//在线获取质检项
export const qualityOnlineOptionGetAll = (params) => {
  return get(`/api/production/qualityOption/getAll`,params)
}



//成品质量
export const qualityFinishDetailsGet = (id) => {
  return get(`/api/production/qualityFinishDetails/get/${id}`)
}

export const qualityFinishDetailsUpdate = (params) => {
  return post(`/api/production/qualityFinishDetails/update`,params)
}

//产线
export const getLineSelectAll = (params) => {
  return get(`/api/production/line/getAll`,params)
}

//车间
export const getFarmSelectAll = (params) => {
  return get(`/api/production/farm/getAll`,params)
}
