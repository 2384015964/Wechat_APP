// pages/sorts/productlist/product list.js
const $Getproductlist=require("../../../utils/api.js").Getproductlist
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      tabs:[
       {
         id:0,
         title:"综合",
         isactive:true
       },
       {
        id:1,
        title:"销量",
        isactive:false
      },
      {
        id:2,
        title:"排序",
        isactive:false
      }


      ],
      goods:[],
      oncid:[],
      detailid:'',
      // goodsname:[],
      // goodsprice:[]  
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      let cat_id=options;//通过页面启动函数onload获取传参的id
      // console.log(cat_id);
      const cid=cat_id.cid
      console.log(cid)
      this.getsearch(cid)//通过形参传递参数至获取cid
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      },1000)
    },
     async getsearch(cid){
      var that=this
      const res=await  $Getproductlist.getproductlist(cid)
       let result=res.data.message.goods
          that.setData({
             goods:result,
        })
        wx.stopPullDownRefresh()         
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
   onReachBottom(){
     console.log('页面触底')//页面触底提示
     wx.showToast({
       title: '已经到底了',
     })
   },
   onPullDownRefresh(){
     this.getsearch(cid)//刷新页面数据
   }

  }
})
