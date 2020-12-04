// pages/myinfo/newaddress/newaddress.js
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
    switchchecked:false,
    addressarray:[],
  },
  /**
   * 组件的方法列表
   */
  methods: {
     
    submit:function(e){
      console.log(e);
      let array=this.data.addressarray;
      let form=e.detail.value;
      array.push(form)
     this.setData({
       addressarray:array
     })
     let oldarray=wx.getStorageSync('address')
     if (oldarray==[]){
      wx.setStorageSync('address', array)
     }else{
       oldarray.push(form)
      wx.setStorageSync('address', oldarray)
     }
    wx.navigateBack({
      delta: 1,
    })
    }
  },
  switch1Change:function(e){
    console.log(e)
  }
})
