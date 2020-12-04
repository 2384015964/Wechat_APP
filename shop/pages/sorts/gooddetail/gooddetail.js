// pages/sorts/gooddetail/gooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsbanner:{},
    goodsinfo:{},
    display:'',
    display1:'none',
    maodian:'none',
    addnum:'',
    hongdian:'none'
  },
  Goodsarray:{},
   getgooddetail(goods_id){
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
        data: {goods_id},
        header: {
          "content-type": 'application/json'
        },
        method: "get",
        success: (result) => {
           console.log(result)
           const pics=result.data.message
           console.log(pics)
           this.Goodsarray=pics
           this.setData({
            goodsbanner:pics.pics,
            goodsinfo:result.data.message
           })
        },
      })    
   },
   //点击图片放大预览
   haldimage(e){
    //  console.log(e)
     const url=this.Goodsarray.pics.map(i=>i.pics_mid)
    //  把轮播图数组中的图片url的路径通过map建立的数组取出pics_mid,得到urls
     const current=e.currentTarget.dataset.url
    //  传入点击的的参数e在data-url中动态引入当前urls
     wx.previewImage({
       current:current,
       urls: url
     })
   },
   //加入购物车
   addsort(){
      //获取缓存里cart里的数组
      let cart=wx.getStorageSync('cart')||[];
      let index=cart.findIndex(v=>v.goods_id===this.Goodsarray.goods_id)
      if (index===-1){
        this.Goodsarray.num=1
        this.Goodsarray.checked=true
        cart.push(this.Goodsarray)
      }else{
        cart[index].num++//把商品数量的num++
      }
      //把所有商品的num数量通过map遍历数一个新的数组
      let numarray=cart.map(v=>v.num)
      // let pricearray=cart.map(v=>v.goods_price)
      // console.log('价格',pricearray)
      // console.log('数量',numarray)
      //获得的所有商品的num数量通过reduce进行累加
      let num=numarray.reduce((x,y)=>x+y)
      console.log(num)
      wx.setStorageSync('zongshu', num)
      this.setData({
        addnum:num,
        hongdian:''
      })
      wx.setStorageSync('cart',cart)//没加入数据就往缓存中加数组
      wx.showToast({
        title: '加入成功',
      })
   },
   shuliang(){
    let cart=wx.getStorageSync('cart');
    if(cart==0){
      this.setData({
        hongdian:'none'
      })
      console.log('缓存为空') 
    }else{
      this.setData({
        hongdian:''
      })
      let numarray=cart.map(v=>v.num)
      //获得的所有商品的num数量通过reduce进行累加
      let num=numarray.reduce((x,y)=>x+y)
      // console.log(num)
      this.setData({
        addnum:num
      })
      console.log('有缓存') 
    }
  },
   //收藏
   shoucang(){
      this.setData({
        display:'none',
        display1:''
      })
   },
   shoucang1(){
    this.setData({
      display:'',
      display1:'none'
    })
 },
 onPageScroll:function(e){ // 获取滚动条当前位置
  var top=e.scrollTop
  // console.log(top)
  if (top>900){
    this.setData({
      maodian:''
    })
  }else{
    this.setData({
      maodian:'none'
    })
  }
},
// 锚点
 maodian(){
    wx.pageScrollTo({
      scrollTop:0
    })
    if (wx.scrollTop==0){
      this.setData({
        maodian:'none'
      })
    }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id=options
    console.log(id)
    const goods_id=id.goods_id
    console.log(goods_id)
    this.getgooddetail(goods_id)
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    },1000)
    this.shuliang()
  },
})
