// pages/myinfo/allorder/allorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        title:"全部",
        isactive:true
      },
      {
       id:1,
       title:"待付款",
       isactive:false
     },
     {
       id:2,
       title:"待收货",
       isactive:false
     },
     {
      id:3,
      title:"已完成",
      isactive:false
    }


     ],
  },
  clicktab(e){
    var id=e.currentTarget.dataset.index
   //  console.log(id)
    let {tabs}=this.data
      tabs.forEach((v,i)=>i===id?v.isactive=true:v.isactive=false)
    this.setData({
       tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})