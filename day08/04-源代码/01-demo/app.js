//app.js
App({

// 生命周期：小程序初始化时执行
onLaunch(){
  console.log('app onLanuch')
},
  onShow(options){
  console.log(options)
},
onHide(){
  console.log('app onHide')
}
})