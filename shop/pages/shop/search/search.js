// pages/shop/search/search.js
const $GetQsearch=require("../../../utils/api.js").GetQsearch
const $Getsearch=require("../../../utils/api.js").Getseach
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
       $GetQsearch.getqsearch(query)
       .then(res=>{
        let result=res.data.message
        that.setData({
          goodsname:result
        })
       })
       .catch(err=>{
         console.log(err)
       })
        
     },
    search(){
      //点击搜索完成列表渲染
      let query=this.data.query
      var that=this
      $Getsearch.getsearch(query)
      .then(res=>{
        let result=res.data.message.goods
        that.setData({
          goods:result
        })
      })
      .catch(err=>{
         console.log(err)
      })
      
    }
  }
})
