const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';
// url 的封装
const HTTP_url="https://api-hmugo-web.itheima.net/api/public/v1/";
 function request(method,url,data){
      return new Promise(function(resolve,reject){
        let header= {
          'content-type': 'application/json',
      };
        wx.request({
          url: HTTP_url+url,
          method:method,
          data:method===POST?JSON.stringify(data):data,
          header:header,
          success(res){
            if (res.data.meta.status==200){
               resolve(res)
            }else{
              reject('请求失败')
            }
          },
          fail(err){
            reject(err)
          }
        })
      })
 }
 const API = {
  getdemolist: (data) => request(GET,`goods/search?cid=${data}`),
  getdaohang:(data)=> request(GET,`home/catitems`,data),
  getsortlist:(data)=>request(GET,`categories`,data),
  getqsearch:(data)=>request(GET,`goods/qsearch?query=${data}`), //关键字实时加载搜索
  getsearch:(data)=>request(GET,`goods/search?query=${data}`),//点击搜索后列表搜索
  getproductlist:(data)=>request(GET,`goods/search?cid=${data}`),//通过页面参数cid获取商品列表
  getdetail:(data)=>request(GET,`goods/detail?goods_id=${data}`)//商品详情
};
module.exports = {
  DemolistAPI:API,
  DaoHang:API,
  Sortlist:API,
  GetQsearch:API,
  Getseach:API,
  Getproductlist:API,
  Getdetail:API,
}
