// pages/sorts/sorts.js
 const $sortlist=require("../../utils/api.js").Sortlist
Page({

  /**
   * 页面的初始数据
   */
  data: {
     leftlist:[],
     rightlist:[],
     clickindex:0,
     jieshouid:0,
     childrenlist:[],
     imageicon:[],
     imagename:[],
     endlist:[],
     listheight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sorts=wx.getStorageSync('sort');
     if (!sorts){
    this.getlist()
    console.log('不存在旧数据')
     }else{
        //  this.endlist=sorts.data
         let datalist=sorts.data
        //  let index=indexid.data
         this.setData({
          clickindex:0,
          leftlist:datalist.message,
          rightlist:datalist.message[0].children,
          childrenlist:datalist
         })
        console.log('这是旧数据',sorts.data)
     } 
      //  this.getlist()
  },
  async getlist(e) {
    var that =this
    const res=await $sortlist.getsortlist()
      let list=res.data.message
      let sortslist=res.data
         that.data.endlist=list
       wx.setStorageSync('sort', {times:Date.now(),data:sortslist})
       that.setData({
          leftlist:res.data.message,
          rightlist:res.data.message[0].children,
          childrenlist:res.data
       })
        // console.log('分类列表',res)
  },
   clickitem:function(e){
    var id=e.currentTarget.dataset.index
       this.data.jieshouid=id
      //  console.log('右侧列表数据',res.message[id].children)
    var res= this.data.childrenlist
    console.log(res)
     this.setData({
        clickindex:id,
        rightlist:res.message[id].children,
        listheight:0
     })
   },
})