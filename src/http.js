import axios from 'axios'
import QS from 'qs'
import router from '@/router'
import store from './store/index'

import { Loading, Message,MessageBox } from 'element-ui'

import domMessage from './msg'
const messageOnce = new domMessage()
const http = axios.create({
	timeout: 1000 * 60 * 2,
	withCredentials: true
})

axios.defaults.timeout =  6000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// axios.defaults.headers.post['Content-Type'] = 'application/json';

let loading

function startLoading () {
  loading = Loading.service({
    lock: true, // 是否锁定
    text: '拼命加载中...', // 加载中需要显示的文字
    background: 'rgba(0,0,0,.7)' // 背景颜色
  })
}

// 结束加载动画
function endLoading () {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
  startLoading()// 请求时的加载动画
  return config // 加载动画的时候把config return 回去
}, error => {
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {

  //   endLoading()// 结束加载动画
  
  //  return response // 结束时把response return回去
  if(response.data.status == "0"){
    
    endLoading()// 结束加载动画
  
    return response // 结束时把response return回去
  }else if(response.data.status == "1"){
    
    messageOnce.warning({
			message: '登录超时,3秒自动跳转到登录页',
			type: 'warning'
    })
    setTimeout(function(){
      router.push({
        name:'login',
      })
      store.commit('clearMenu')
      store.commit('clearUsername')
      location.reload()
    },3000)
    
    endLoading()// 结束加载动画
  
    return response // 结束时把response return回去
    // MessageBox.alert('登录超时,请重新登录！','登录超时',{
    //   confirmButtonText:"点击跳转到登录页",
    //   callback: action =>{
    //     router.push({
    //       name:'login',
    //     })
        

    //   }
    // })
  }else if(response.data.status == "2"){
    endLoading()// 结束加载动画
  
    return response // 结束时把response return回去
  }
}, error => {
  // 错误提醒
  endLoading()// 如果错误也结束动画
  // Message.error('请求超时,请重新加载')
  // return Promise.reject(error)
  if (error.response.status == 504||error.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (error.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  } else {
    Message.error({message: '未知错误'});
  }
  return Promise.reject(error);
})

export function get (url, params,) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post (url, params,config={}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params,config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}


// columns11: [
//   {
//     title: "水松纸工段9月份生产计划进度表（吨）",
//     align: "center",
//     children: [
//       {
//         title: "日期",
//         key: "data",
//         align: "center",
//         width: 100,
        

//         // sortable: true
//       },
//       {
//         title: "1#品牌机架",
//         align: "center",
//         key: "one",
        
//         children: [
//           {
//             title: "英红齐聚",
//             key: "brandOne",
//             align: "center",
//             render: (h, p) => {
//           const { id, score } = p.row;
//           const inp = h("input", {
//             style: {
//               width: "100%",
//               padding: "4px 2px",
//               borderRadius: "4px",
//               border: "1px solid #e9eaec",
//               textAlign: "center",
//             },
//             attrs: {
//               maxlength: 16,
//             },
//             domProps: {
//               value: score,
//             },
//             on: {
//               input: (event) => {
//                 this.currentScore = event.target.value;
//               },
//             },
//           });
//           return this.currentId === p.row.id ? inp : h("span", score);
//         },
//             // width: 200
//           },
//           {
//             title: "喜满堂",
//             key: "brandTwo",
//             align: "center",
//           },
//           {
//             title: "金满堂",
//             key: "brandThree",
//             align: "center",
//           },
//         ],
//       },
//       {
//         title: "2#品牌机架",
//         key: "two",
//         align: "center",
//         children: [
//           {
//             title: "英红齐聚",
//             key: "brandOne2",
//             align: "center",
//             // width: 200
//           },
//           {
//             title: "喜满堂",
//             key: "brandTwo",
//             align: "center",
//           },
//           {
//             title: "金满堂",
//             key: "brandThree",
//             align: "center",
//           },
//           {
//             title: "金满堂",
//             key: "brandFour",
//             align: "center",
//           },
//         ],
//       },
//       {
//         title: "3#品牌机架",
//         align: "center",
//         children: [
//           {
//             title: "英红齐聚",
//             key: "street",
//             align: "center",
//             // width: 200
//           },
//           {
//             title: "喜满堂",
//             align: "center",
//           },
//           {
//             title: "金满堂",
//             align: "center",
//           },
//         ],
//       },
//       {
//         title: "合计",
//         align: "center",

//         children: [
//           {
//             title: " ",
//             key: "street",
//             align: "center",
//             // width: 200
//           },
//         ],
//       },
//       {
//         title: "4#品牌机架",
//         align: "center",
//         children: [
//           {
//             title: "英红齐聚",
//             key: "street",
//             align: "center",
//             // width: 200
//           },
//         ],
//       },
//     ],
//   },
// ],
// data10: [],