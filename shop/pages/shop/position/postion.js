// pages/shop/position/postion.js
var QQMapWX = require('../../sdk/qqmap-wx-jssdk.min.js');
var qqmapsdk;
let app = getApp();
console.log(app.globalData.location)
Page({
    data: {
        latitude: '',
        longitude: '',
        address: '',
        nearby: '',
        array: ['绍兴市 ', '杭州市','宁波'],
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
                        let weizhi = addressRes;
                        console.log(weizhi)
                        let weiz = addressRes.result
                        // console.log(weiz)
                        that.setData({
                            // location: weiz.address_reference.landmark_l2.title,
                            list: weiz.pois

                        })
                    }
                })
            }
        })
    },
    onLoad(options) {
        var student=wx.setStorageSync('key')
        this.getposi();
        wx.setNavigationBarTitle({
            title: '当前地址'
        })
        // var pages = getCurrentPages(); // 获取页面栈
        // var currPage = pages[pages.length - 1]; // 当前页面
        // var prevPage = pages[pages.length - 2]; // 上一个页面
        // currPage.setData({
        //     location: newlist[e.currentTarget.dataset.index].title
        // })
        const huancun=wx.getStorageSync('location')
        console.log('这是缓存数据',huancun)
        this.setData({
            location:huancun
        })
    },
    getposi() {
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
                        console.log(weizhi)
                        let result = addressRes.result
                        console.log(result)
                        that.setData({
                            location: result.formatted_addresses.rough,
                            list: result.pois
                        })

                        // this.poisweizhi=addressRes.result.pois
                        // let list=this.poisweizhi.map(v=>v.title);
                        // this.setData({
                        //    list:poisweizhi
                        // })
                    }
                })
            }
        })
    },
    xuanweizhi: function (e) {
        var newlist = [],
            newlist = this.data.list
        // console.log('附近位置',e)
        console.log(newlist[e.currentTarget.dataset.index])
        this.setData({
            location: newlist[e.currentTarget.dataset.index].title
        })
        var pages = getCurrentPages(); // 获取页面栈
        var prevPage = pages[pages.length - 2]; // 上一个页面
            prevPage.setData({
                location: newlist[e.currentTarget.dataset.index].title
            })
           wx.navigateBack({
             delta: 1,
           })
    }
})