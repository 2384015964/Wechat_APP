// pages/shop/position/postion.js
var QQMapWX = require('../../sdk/qqmap-wx-jssdk.min.js');
var qqmapsdk;
let app = getApp();
console.log(app.globalData.location)
Page({
    data: {
        location:'',
        latitude: '',
        longitude: '',
        address: '',
        nearby: '',
        array: ['杭州市', '绍兴市','宁波市'],
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
    Relocation: function (e) {
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
                        let weiz = addressRes.result
                        // console.log("信息",weiz)
                        that.setData({
                            list: weiz.pois,
                            location: weiz.address_reference.landmark_l1.title
                        })
                    }
                })
            }
        })
    },
    onLoad() {
        this.getposi();
        wx.setNavigationBarTitle({
            title: '当前地址'
        })
        let huancun=wx.getStorageSync('location')
        this.setData({
            location:huancun
        })
    },
    getposi() {
       const poislist=wx.getStorageSync('poislist')
       this.setData({
           list:poislist
       })
    },
    xuanweizhi: function (e) {
        let newlist = this.data.list
        // console.log('附近位置',e)
        // console.log(newlist[e.currentTarget.dataset.index])
        let newlocation=newlist[e.currentTarget.dataset.index].title
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