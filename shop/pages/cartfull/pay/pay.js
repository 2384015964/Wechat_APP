// pages/cartfull/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    cart:{},
    goodnum:0,
    goodprice:0,
  },
  Pay(){
    wx.requestPayment(
      {
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success':function(res){},
      'fail':function(res){},
      'complete':function(res){}
      })
  },
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const location=wx.getStorageSync('location')
    let cart=wx.getStorageSync('cart', cart)||[]
     let checked=cart.filter(v=>v.checked)
    let goodnum=0;
    let goodprice=0;
       checked.forEach(v=>{
           goodprice+=v.num*v.goods_price
           goodnum+=v.num
         })
      this.setData({
        cart:checked,
        goodprice,
        goodnum,
        address:location
      })
  }
})
