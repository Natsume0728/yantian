// pages/personnel/sport_teams/sport_teams.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    nonnet:false,
    page:1,
    category_id:1,
    teamList:[],
    coachList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.getTeam(1);
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
  getTeam: function (page) {
    var that = this;
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
          var category_id = that.data.category_id;
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/team/team_list',
            data: {
              category_id: category_id,
              page: page,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data;
              //console.log(res); 
              //console.log(res.data)
              if (res.data.status == 1) {                
                if(page>1){
                  var oldList = category_id == 1 ? that.data.teamList : that.data.coachList;
                  for (var i = 0; i < res.data.list.length; i++) {
                    oldList.push(res.data.list[i]);
                  }
                }else{
                  oldList=res.data.list;
                }
                console.log(res.data);                
                if(category_id==2){
                  that.setData({
                    coachList:oldList,
                    page: page,
                  }, function () {
                  })
                }else{
                  that.setData({
                    teamList:oldList,
                    page: page,
                  }, function () {

                  })
                }
                
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
  /**
   * tab
   */
  switchNow: function (e) {
    var that = this;
    that.setData({
      category_id: e.target.dataset.category_id
    })
    that.getTeam(1);
  },
  toPlaceintro: function () {
    wx.redirectTo({
      url: '../../place/placelist/placelist',
    })
  },
  toRepair: function () {
    wx.redirectTo({
      url: '../../repair/repair/repair',
    })
  },
  toTeams: function (e) {
    wx.navigateTo({
      url: '../teams/teams?team_id='+e.currentTarget.dataset.id,
    })
  },
  toCoach: function (e) {
    wx.navigateTo({
      url: '../coach/coach?team_id='+e.currentTarget.dataset.id,
    })
  }
  
})