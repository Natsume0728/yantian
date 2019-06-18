// pages/association_intor/association_intor.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    intro: {},//协会详情
    showmore:false,//显示更多信息
    tyg_id:0,
    activityList:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */  
  onLoad: function (options) {   
    var that=this;    
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType != "none") {
          that.setData({
            noNetwork: false
          })}
          try {  
             that.setData({
               id:options.id
             })        
              wx.showLoading({
                title: '正在加载中',
              })
              wx.request({//发送请求获得订单详情
                url: app.globalData.localUrl + '/club/club_detail',
                data: {
                  cid:options.id                  
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);                  
                  var data=res.data;
                  WxParse.wxParse('article', 'html', data.club_detail.club_des, that, 24);
                  console.log(data.club_detail.atlas);
                  that.setData({                    
                    intro: data.club_detail,
                    activityList:data.activityList,
                    tyg_id: options.id,
                  }, function () {

                  })
                  wx.hideLoading()//隐藏加载中提示框
                },
                fail: function (error) {
                  wx.hideLoading()//隐藏加载中提示框
                  that.setData({
                    nonet: true
                  })
                }
              })
            }
           catch (e) {
           
          }
      }    
    })
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '盐田体育通',
      path: '/pages/association_intro/association_intro?id='+that.data.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  /** 页面跳转 */
  toJoinus:function(e){
    let that=this;
    let index = that.data.tyg_id;
    console.log(index);
    wx.navigateTo({
      url: '../joinus/joinus?cid='+index,
    })
  },
  toPhotointr:function(e){
    wx.navigateTo({
      url: '../photo_intro/photo_intro?cid='+e.currentTarget.dataset.cid,
    })
  },
  toActintro:function(options){
    console.log(options);
    wx.navigateTo({
      url: '../act_intro/act_intro?aid='+options.currentTarget.dataset.aid,
    })
  },
  // 介绍文字详情
  showMore:function(e){
    let that=this;
    let showmore = that.data.showmore
    if(showmore){
      that.setData({
        showmore:false
      })
    }else{
      that.setData({
        showmore:true
      })
    }
  }
})