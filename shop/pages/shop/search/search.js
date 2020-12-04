// pages/shop/search/search.js
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
    query:'',
    goods:[],
    goodsname:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
    },
    searchinput(e){
      // console.log(e.detail.value)
      let query=e.detail.value
      this.setData({
        query:query
      })
      this.searchname()
     },
     searchname(){
      let query=this.data.query
      console.log(query)
      var that=this
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
        data:{query},
        header: {
          "content-type": 'application/json'
        },
        method: "get",
        success(res){
          console.log(res)
          let result=res.data.message
          that.setData({
            goodsname:result
          })
        }
      })
     },
    search(){
      //点击搜索完成列表渲染
      let query=this.data.query
      var that=this
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
        data:{query},
        header: {
          "content-type": 'application/json'
        },
        method: "get",
        success(res){
          let result=res.data.message.goods
          // let id=res.data.message.goods.cat_id
          // console.log(id)
          that.setData({
            goods:result
          })
        }
      })
    }
  }
})
