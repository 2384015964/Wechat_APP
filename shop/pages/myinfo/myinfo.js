// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    userimg:{}
  },
  bindGetUserInfo:function(e){
    if (e.detail.userInfo) {
        //用户按了允许授权按钮
        console.log(e)
        const user=e.detail.userInfo;
         wx.setStorageSync("user", user)
         wx.showLoading({
          title: '登录中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
         this.onShow()
       } else {
        //用户按了拒绝按钮
        wx.showModal({
         title: '提示',
         content: '您点击了拒绝授权请授权之后再进入!!!',
         showCancel: false,
         confirmText: '重新授权',
         success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
           console.log('用户点击了“重新授权”');
          }
         }
        });
       }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userinfo=wx.getStorageSync('user')
    this.setData({userinfo})
  },
})