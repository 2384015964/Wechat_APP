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
 const SearchAPI = {
  getsearch: (data) => request(GET,`goods/search?cid=${data}`),
};
const DaoHang={
  getdaohang:(data)=> request(GET,`home/catitems`,data)
}
module.exports = {
  SearchAPI: SearchAPI,
  DaoHang:DaoHang
}
