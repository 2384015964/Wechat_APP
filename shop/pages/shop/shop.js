// pages/shop/shop.js
var QQMapWX = require('../sdk/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
const $getsearch = require('../../utils/api.js').SearchAPI
const $getdaohang=require('../../utils/api.js').DaoHang
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgid: [],
    bg: true,
    currentindex: 0,
    chooseSize: false,
    animationData: {},
    animationshop: {},
    location: '未开启定位',
    imageUrl: ["../banner/rule.jpg", "../banner/es.jpg", "../banner/xinpin.jpg"],
    display: 'none',
    display2: 'none',
    mengdian: '',
    goodsdetail: '',
    shopgoods: {},
    shopname: [{
        name: '门店1'
      },
      {
        name: '门店2'
      },
      {
        name: '门店3'
      },
      {
        name: '门店4'
      }
    ],
    images: [],
    testid: "15",
    // gonggename: []
  },
  onLoad(e) {
    // 实例化腾讯地图API核心类
    this.getsearch()
    this.getdaohang()
    wx.setNavigationBarTitle({
      title: '夜刀商城'
    })
    var that = this;
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'BQSBZ-AANRP-TWVDJ-VAAXI-C3HA2-AOBEG'
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // console.log(res);
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          get_poi: 1,
          poi_options: 'policy=2;radius=3000;page_size=10;page_index=1',
          success: function (addressRes) {
            let weizhi = addressRes;
            // console.log(weizhi)
            let weiz = addressRes.result
            const huancun = addressRes.result.address_reference.landmark_l2.title
            wx.setStorageSync('location', huancun)
            // console.log(weiz)
            that.setData({
              location: weiz.address_reference.landmark_l2.title
            })
            var chuancan = that.data.location
            // console.log(chuancan)
          }
        })
      }
    })
  },
  getdaohang() {
    var that = this
    $getdaohang.getdaohang()
    .then(res=>{
      let carelist = res.data.message
      that.setData({
        images: carelist
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 100,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(50).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      // 230 移动的距离
      animation.translateY(15).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)
    that.setData({
      display: ""
    })
  },
  // 隐藏
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(50).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(300).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
    that.setData({
      display: "none"
    })
  },
  xiala: function (e) {
    var list = [],
      list = this.data.shopname
    var id = e.currentTarget.dataset.index
    this.setData({
      mengdian: list[id].name,
      display2: '',
      currentindex: id
    })
    //动画
    var then = this;
    // 创建一个动画实例
    var shop = wx.createAnimation({
      // 动画持续时间
      duration: 100,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    then.shop = shop
    // 先在y轴偏移，然后用step()完成一个动画
    shop.opacity(0.8).step()
    // 用setData改变当前动画
    then.setData({
      // 通过export()方法导出数据
      animationshop: shop.export(),
      // 改变view里面的Wx：if
      // chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      // 230 移动的距离
      shop.opacity(0).step()
      then.setData({
        animationshop: shop.export()
      })
    }, 500)
  },
  fenlei(e) {
    // console.log(e)
    //点击分类跳转到分类界面，其他类似
    let index = e.currentTarget.dataset.index
    if (index == 0) {
      wx.switchTab({
        url: '../sorts/sorts',
      })
    }
  },
  editgoodsnum(e) {
    let id = e.currentTarget.dataset.index
    //获取缓存里cart里的数组
    let cart = wx.getStorageSync('cart') || [];
    let shopgoods = this.data.shopgoods
    let index = cart.findIndex(v => v.goods_id === shopgoods[id].goods_id)
    if (index === -1) {
      shopgoods[id]['num'] = 1
      shopgoods[id]['checked'] = true
      cart.push(shopgoods[id])
    } else{
      cart[index].num++ 
      //把商品数量的num++
    }
    //把所有商品的num数量通过map遍历数一个新的数组
    let numarray = cart.map(v => v.num)
    // let pricearray=cart.map(v=>v.goods_price)
    // console.log('价格',pricearray)
    // console.log('数量',numarray)
    //获得的所有商品的num数量通过reduce进行累加
    let num = numarray.reduce((x, y) => x + y)
    wx.setStorageSync('zongshu', num)
    wx.setStorageSync('cart', cart) //没加入数据就往缓存中加数组
    wx.showToast({
      title: '加入成功',
    })
  },
  getsearch() {
    var that = this
    let cid = that.data.testid
    $getsearch.getsearch(cid)
      .then(res => {
        let result = res.data.message.goods
        that.setData({
          shopgoods: result,
        })
      })
      .catch(err => {
        console.log('请求失败', err)
      })
  },
})