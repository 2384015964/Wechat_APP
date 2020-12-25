// pages/cartfull/payimg/payimg.js
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
    money:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      const money=wx.getStorageSync('money')
      this.setData({
        money
      })
    }
  }
})
