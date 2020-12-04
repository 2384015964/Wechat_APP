// pages/myinfo/shipping_address/shippingaddress.js
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
      address:{},
      display:"none",
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    addressinfo(){
      const location=wx.getStorageSync('address')
      this.setData({
        address:location
      })
    },
    onShow: function () {
     this.addressinfo()
    },
  }
})
