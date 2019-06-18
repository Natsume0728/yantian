// pages/actdetails/mysign/mysign.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    maxPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.getApplyList(1)
      
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
    var that=this;
    var page = that.data.page;
    var maxPage = that.data.maxPage;
    if (maxPage > page) {
      that.getApplyList(parseInt(page)+1);
    }else{
      wx.showToast({
        title: '已到数据末尾',
        icon: 'none',
        duration: 1000,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getApplyList: function (page) {
    var that = this
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        var openid=wx.getStorageSync('openid');
        if (res.networkType != "none") {
          that.setData({
            nonet: false
          })
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })
          wx.request({//发送请求修改联系人信息
            url: app.globalData.localUrl + '/activity/getApplyList',
            data: {
              'openid':openid, 
              'page':page,             
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              if (res.data.status == 1) {
                  var oldList=that.data.list;
                  var data=res.data;
                  for(var i=0;i<data.list.length;i++){
                    oldList.push(data.list[i]);
                  }
                  that.setData({
                      list:oldList,
                      page:data.page,
                      maxPage:data.maxPage,
                  },function(){
                      if(data.maxPage==data.page){
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 1000,
                        })
                      }
                  })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                })
              }
              //console.log(res.data)

            },
            fail: function (error) {
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
        wx.hideLoading()//隐藏加载中提示框
      }
    })
  },
  toAct:function(){
    wx.redirectTo({
      url: '../tran_index/tran_index',
    })
  },
  cancelSign:function(e){
    var that=this;
    wx.showModal({
      title: '取消报名',
      content: '若要重新报名需要重新填写信息，您是否确定取消报名?',
      cancelColor:'#3cc51f',
      confirmColor:'#000000',
      success: function (res) {
        if (res.confirm) {
            that.updateApplyStatus('is_cancel',e.currentTarget.dataset.orders_id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  delAct:function(e){
    var that=this;
    wx.showModal({
      title: '删除活动记录',
      content: '该操作不可逆，您是否确定删除活动记录？',
      cancelColor: '#3cc51f',
      confirmColor: '#000000',
      success: function (res) {
        if (res.confirm) {
          that.updateApplyStatus('is_del', e.currentTarget.dataset.orders_id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  updateApplyStatus:function(field,orders_id){
    var that = this
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        var openid = wx.getStorageSync('openid');
        if (res.networkType != "none") {
          that.setData({
            nonet: false
          })
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })
          wx.request({//发送请求修改联系人信息
            url: app.globalData.localUrl + '/activity/updateApplyStatus',
            data: {
              'openid': openid,
              'field': field,
              'orders_id':orders_id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              if (res.data.status == 1) {               
                  var list=that.data.list;
                  console.log(list);
                  for(var i=0;i<list.length;i++){
                    if(orders_id==list[i]['orders_id']){
                      if (field == 'is_del') {
                        list.splice(i,1);
                      }else if(field=='is_cancel'){
                        list[i]['is_cancel']=1;
                      }                     
                      break;
                    }
                  }
                  console.log(list);
                  that.setData({
                    'list': list,
                  })       
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1000,
                  })                  
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                })
              }
            },
            fail: function (error) {
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
        wx.hideLoading()//隐藏加载中提示框
      }
    })
  },
  toActivityDetail: function (e) {
    wx.navigateTo({
      url: '../actdetails/actdetails?id='+e.currentTarget.dataset.act_id,
    })
  },
})