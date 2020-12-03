import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    isIcon: true,
    menu: [],//菜单
    currentMenu :[],//点击菜单
    username:'',
    btnArr:[],
  },
  mutations: {
    setBtn(state,val){ //按钮数组
      state.btnArr = val
    },
    getUsername(state,val){
      state.username = localStorage.setItem('username',val)
  },
  clearUsername(state,val){
    localStorage.removeItem('username');
},
    isUnfold(state) {
      state.isCollapse = !state.isCollapse
      state.isIcon = !state.isIcon
    },
    setMenu(state, val) { //设置菜单
      state.menu = val
      sessionStorage.setItem('menu', JSON.stringify(val))
    },
    selectMenu(state,val){

      val.name === 'Index'?(state.currentMenu = []):(state.currentMenu = val)
    },
    clearMenu(state,val){
      state.menu = []
      sessionStorage.removeItem('menu')
    },
    addMenu(state, router) { //动态添加
      if (!sessionStorage.getItem('menu')) {
        return
      }
      let menu = JSON.parse(sessionStorage.getItem('menu'))
      state.menu = menu

      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/components/home/Home`),
          children: []
        }
      ]

      menu.forEach(item => {
        
        if (item.children) {
          item.children = item.children.map(item => {
           
            item.component = () => import(`@/view/${item.webUrl}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          
          item.component = () => import(`@/view/${item.webUrl}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    }
  }
})
