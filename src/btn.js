import store from './store/index'


export function btnArr(code){

    var arr = store.state.btnArr
    console.log(arr)
    return arr.indexOf(code) > -1
}