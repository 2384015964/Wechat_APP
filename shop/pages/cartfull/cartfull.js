// pages/cartfull/cartfull.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    cart:{},
    goodnum:0,
    goodprice:0,
    isHidenum:'none'
  },
     setcart(cart){//封装一个计算价格和数量的函数setcart(cart)
      // this.setData({
      //   cart
      // })
      let goodnum=0;
       let goodprice=0;
       let allchecked=true
       cart.forEach(v=>{
         if(v.checked){
           goodprice+=v.num*v.goods_price
           goodnum+=v.num
         }else{
           allchecked=false
         }
       })
       allchecked=cart.length!=0?allchecked:false
       //判断allchecked 如果这个数组不存在返回false 存在checked本身true
      this.setData({
        cart:cart,
        goodprice,
        goodnum,
        // goodnum:goods,
        allchecked
      })
      wx.setStorageSync('cart', cart)//修改缓存cart的数量
     },
     setcartnum(){//封装一个判断总数量是否为空
      if(this.data.goodnum==''){
        console.log('数量已经清空')
        this.setData({
          isHidenum:'none'
        })
       }else{
        console.log('数量不为空')
        this.setData({
          isHidenum:''
        })
       }
     },
  changeitem(e){//购物车商品列表的check勾选属性改变
    // console.log(e)
    //获取要修改的good_id
    const goods_id=e.currentTarget.dataset.id
    // console.log(goods_id)
    //获取购物车中对象数组
    let {cart}=this.data;
    //用findIndex方法找到goods_id的同类型的数组下标index
    let index=cart.findIndex(v=>v.goods_id===goods_id)
    //把选中状态取反，
    cart[index].checked=!cart[index].checked
    //修改原来cart数组里的值,重置缓存cart里的值
    this.setcart(cart);
    //放入封装函数计算价格数量
  },
  changegoodslist(){//购物车列表全选改变事件
     let {cart,allchecked}=this.data
     allchecked=!allchecked//反选
     cart.forEach(v=>v.checked=allchecked)
     this.setcart(cart);
  },
  clear(){//清空购物车clear()
     wx.removeStorageSync('cart')
     this.onShow()//重新刷新页面
    this.setcartnum()
  },
  editgoodsnum(e){//加减商品数量
    // console.log(e)
     let {yunsuanfu,id}=e.currentTarget.dataset
    //  console.log(yunsuanfu,id)
     let {cart}=this.data
       const index=cart.findIndex(v=>v.goods_id===id)//获取点击商品的索引index
      // console.log(cart[index].num)//商品数量
     if(cart[index].num===1&&yunsuanfu===-1){//判断商品数量为1并且点击的是负1
      wx.showModal({//点击减号显示提示框进行选择
        title: '提示',
        content: '是否删除该商品',
        success: (res)=> {
        if (res.confirm) {
        console.log('用户点击确定')
        cart.splice(index,1)
        this.setcart(cart)
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
     }else{ //点击加号增加数量
      cart[index].num+=yunsuanfu
      this.setcart(cart)
     }
      
  },
  countgoodsnums(){ //countgoodsnums()方法计算商品的数量和总价,判断总数量是否为空
     const cart=wx.getStorageSync('cart')||[]
    this.setcart(cart);
    this.setcartnum()
  },
  Pay(){
     let {address,goodnum}=this.data
    if(goodnum===0){
      wx.showToast({
        title: '你还没有选购商品',
        icon:'none',
      })
    }else{
      wx.navigateTo({
        url: './pay/pay',
      })
    }
  },
  onLoad: function (options) {
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const location=wx.getStorageSync('location')
    this.setData({
      address:location
    })
    // const goods=wx.getStorageSync('zongshu')
    // const allchecked=cart.length?cart.every(v=>v.checked):false
    // console.log(cart)
    this.countgoodsnums()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
