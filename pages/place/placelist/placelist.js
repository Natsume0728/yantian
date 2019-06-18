// pages/place/placelist/placelist.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowtab:0,
    typeid:69,
    faciList:[],
    nonnet:false,
    page:1,    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    that.getFaciList(1);
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
      var that = this; 
      var page=that.data.page;
      // 页数+1  
      page = parseInt(page) + 1;
      that.getFaciList(page);
      that.setData({
        page:page,
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getFaciList:function(page){
    var that=this;
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        //console.log(res.networkType)
        if (res.networkType != "none") {
          that.setData({
            nonet: false,
          })          
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })         
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/facility/faci_list',
            data: {
              type_id: that.data.typeid,
              page:page,              
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data; 
              //console.log(res); 
              //console.log(res.data)
              if (res.data.status == 1) {
                var oldList = that.data.faciList;
                for (var i = 0; i < res.data.list.length; i++) {
                  oldList.push(res.data.list[i]);
                }
                that.setData({
                 faciList:oldList,                                                
                }, function () {
                  
                })
              } else {
                wx.showToast({
                  title: '没有更多',
                }) 
                console.log(res);
              }
              wx.hideLoading()//隐藏加载中提示框
            },
            fail: function (error) {
              wx.hideLoading()//隐藏加载中提示框
              that.setData({
                nonet: true
              })
            }
          })
        } else {
          that.setData({
            nonet: true
          })

        }
      }
    })
  },
  switchNow: function (e) {
    var that = this;    
    that.setData({
      page:1,
      typeid: e.currentTarget.dataset.typeid,
      faciList:[],
    })
    that.getFaciList();
  },
  /**
   * 页面跳转
   */
  toPlaceintro:function(e){
    wx.navigateTo({
      url: '../place_intro/place_intro?faci_id='+e.currentTarget.dataset.faciid,
    })
  },
  toRepair:function(){
    wx.redirectTo({
      url: '../../repair/repair/repair',
    })
  },
  toSportsteam: function () {
    wx.redirectTo({
      url: '../../personnel/sport_teams/sport_teams',
    })
  }
})