// pages/cart/index.js
import {showModal,showToast,getSetting,openSetting,chooseAddress,} from "../../utils/Wx.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },


  async handleChooseAddress(){
    try {
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if(scopeAddress === false){
      await openSetting()
    }
      const address = await chooseAddress()
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  

  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked=!cart[index].checked
    this.setCart(cart)
  },

  setCart(cart){
    let allChecked=true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length != 0 ? allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart)
  },

  handleAllChange(){
    let {cart,allChecked}=this.data
    allChecked = !allChecked
    console.log(allChecked)
    cart.forEach(v=>v.checked=allChecked)
    
    this.setCart(cart)
  },

  async handleItemNumEdit(e){
    const{operation,id}=e.currentTarget.dataset
    let {cart} = this.data
    const index=cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&operation===-1){
     const res = await showModal({content: '是否删除'})
     if(res.confirm){
      cart.splice(index,1)
      this.setCart(cart)
    }
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
    
  },

  async handlePay(){
   const {address,totalNum} = this.data
   if(!address.userName){
     await showToast({title:"请选择收货地址"})
     return
   }
   if(!totalNum){
    await showToast({title:"请选择商品"})
    return
  }
   wx.navigateTo({
     url: '/pages/pay/index',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    const address = wx.getStorageSync("address");
    
    const cart = wx.getStorageSync("cart")||[];
    
    this.setData({
      address
    })
    //const allChecked=cart.length?cart.every(v=>v.checked):false
    this.setCart(cart)
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