// pages/goods_list/index.js
import getRequest from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
      id:0,
      value:"综合",
      isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goods_list:[]
  },
  
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  handleTabsItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  
  getGoodsList(){
    getRequest({
      url:'goods/search',
      data:this.QueryParams
    }).then(res=>{
      const total = res.data.message.total
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
      //console.log(this.totalPages)
      this.setData({
        goods_list:[...this.data.goods_list, ...res.data.message.goods]
      })
    })
  },


  onReachBottom(){
    //console.log(123)
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有了哦!',
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
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
      // 重置列表数组
      this.setData({
        goods_list:[]
    });
    //重置页码值
    this.QueryParams.pagenum = 1
    // 重新发起请求
    this.getGoodsList()
    // 关闭下拉刷新的效果
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
/*   onReachBottom: function () {

  },
 */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})