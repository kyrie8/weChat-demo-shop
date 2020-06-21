//Page Object
import getRequest from '../../api/index.js'
Page({
  data: {
    swiperList:[],
    cates:[],
    floors:[]
  },
  
  getSwiper(){
    getRequest({
      url:'home/swiperdata'
    }).then( res => {
      this.setData({
        swiperList: res.data.message
      })
    }) 
  },
  getCates(){
    getRequest({
      url:'home/catitems'
    }).then( res => {
      this.setData({
        cates: res.data.message
      })
    }) 
  },
  
  getFloor(){
    getRequest({
      url:'home/floordata'
    }).then( res => {
      this.setData({
        floors: res.data.message
      })
    }) 
  },


  onLoad: function (options){
    this.getSwiper()
    this.getCates()
    this.getFloor()
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});