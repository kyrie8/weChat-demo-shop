// pages/auth/index.js
import getRequest from '../../api/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { login } from "../../utils/Wx.js"
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    avatarUrl:'',
    nickName:''
  },

  async handleGetUserInfo(e){
    const{encryptedData,rawData,iv,signature}=e.detail
    const{avatarUrl,nickName}=e.detail.userInfo
    this.setData({
      avatarUrl,
      nickName
    })
    const{code} = await login()
    const loginParams={encryptedData,rawData,iv,signature,code}
    const res = await getRequest({
      url:'user/wxlogin',
      data:loginParams,
      method:"post"
    })
    console.log(res)
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