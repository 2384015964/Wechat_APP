var QQMapWX = require('../pages/sdk/qqmap-wx-jssdk.min.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'BQSBZ-AANRP-TWVDJ-VAAXI-C3HA2-AOBEG'
});
//1、获取当前位置坐标
const mapApi=()=> {
   return new Promise(function(resolve,reject){
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
        poi_options: 'policy=2;radius=3000;page_size=15;page_index=1',
        success(addressRes) {
          resolve(addressRes)
        },
        fail(err){
          reject(err)
        }
      })
    }
  })
})
}
module.exports=mapApi()
