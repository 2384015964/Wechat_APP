// pages/shop/position/postion.js
let $MapApi = require("../../../utils/map.js")
Page({
  data: {
    location: '',
    latitude: '',
    longitude: '',
    address: '',
    nearby: '',
    array: ['杭州市', '绍兴市', '宁波市'],
    index: 0,
    index1: '',
    list: [],
    key: ''
  },
  changecity: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  async Relocation(e) {
    var that = this;
    const addressRes = await $MapApi
    let weiz = addressRes.result
    const poislist = weiz.pois
    // console.log("附件坐标", poislist)
    const suijishu = Math.floor(Math.random() * 14) + 1;
    that.setData({
      list: weiz.pois,
      location: poislist[suijishu].title
    })
  },
  onLoad() {
    this.getposi();
    wx.setNavigationBarTitle({
      title: '当前地址'
    })
    let huancun = wx.getStorageSync('location')
    this.setData({
      location: huancun
    })
  },
  getposi() {
    const poislist = wx.getStorageSync('poislist')
    this.setData({
      list: poislist
    })
  },
  xuanweizhi: function (e) {
    let newlist = this.data.list
    // console.log('附近位置',e)
    // console.log(newlist[e.currentTarget.dataset.index])
    let newlocation = newlist[e.currentTarget.dataset.index].title
    wx.setStorageSync('location', newlocation)
    this.setData({
      location: newlocation
    })
    let pages = getCurrentPages(); // 获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      location: newlocation
    })
    wx.navigateBack({
      delta: 1,
    })
  }
})