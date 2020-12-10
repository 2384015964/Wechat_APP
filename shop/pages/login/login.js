// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       username:'',
       password:'',
       num:0
  },
  form1: function (e) {
    this.data.username = e.detail.value
  },
  form2: function (e) {
    this.data.password = e.detail.value
  },
  youke(e){
    wx.redirectTo({
      url: '../shop/shop',
    })
  },
onclick:function(e){
  var user=this.data.username
  var psw=this.data.password
  var num=this.num
  wx.request({
    url: 'http://timemeetyou.com:8889/api/private/v1/login',
    data: {
      username:user,  //admin
      password:psw,   //123456
    },
    header: {
      "content-type": 'application/json'
    },
    method: "post",
    success(res) {
      console.log(res)
      console.log(res.data)
      if (res.data.meta.status==200){
        wx.showToast({
          title: '登录成功',
        })
        wx.navigateTo({
          url: '../shop/shop',
        })
      } else if (res.data.meta.status==400,res.data.meta.msg=="参数错误"){
        wx.showModal({
          title: '提示',
          content: '请填写用户名和密码',
          success(res) {
            if (res.confirm){
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (res.data.meta.status == 400){
        wx.showModal({
          title: '提示',
          content: res.data.meta.msg,
          success(res) {
            if (res.confirm) {
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  })
},
})