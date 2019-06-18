// pages/tran_index/tran_index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    keywords:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getIndex();
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
  
  },  
  formSubmitSport:function(e){
      var keywords=e.detail.value;
      console.log(e);
      var that=this;
      that.setData({
        keywords:keywords
      })
      if(keywords.length>0){
        that.getIndex(keywords);
      }
  },
  getIndex: function (keywords) {
    var that = this;
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        //console.log(res.networkType)
        var keywords=that.data.keywords;
        if (res.networkType != "none") {
          that.setData({
            nonet: false,
          })
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/activity/activityIndex',
            data: {
              'keywords':keywords,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data;
              //console.log(res); 
              //console.log(res.data)
              if (res.data.status == 1) {               
                that.setData({
                  list: data,                  
                }, function () {

                })
              } else {
                wx.showToast({
                  title: '获取数据失败',
                })
                console.log(res);
              }
              
            },
            fail: function (error) {              
              that.setData({
                nonet: true
              })
            }
          })
          wx.hideLoading()//隐藏加载中提示框
        } else {
          that.setData({
            nonet: true
          })

        }
      }
    })
  },
  toTrainDetail:function(e){    
    wx.navigateTo({
      url: '../traindetail/traindetail?id='+e.currentTarget.dataset.id,
    })
  },
  toActivityDetail: function (e) {
    wx.navigateTo({
      url: '../actdetails/actdetails?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 点击查看推荐项目跳转到介绍页面
   */  
  toSportIntro:function(e) {
    wx.navigateTo({
      url: '../sportintro/sportintro',
    })
  },
  toActivityList:function(){
    wx.navigateTo({
      url: '../activitylist/activitylist',
    })
  },
  toTrainingList: function () {
    wx.navigateTo({
      url: '../traininglist/traininglist',
    })
  },
  tapName:function(){
      console.log(111);
  },
  toMysign:function(){
    wx.redirectTo({
      url: '../mysign/mysign',
    })
  },  
})