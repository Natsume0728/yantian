// pages/joinus/joinus.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    nonet:false,
    rule:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)    
    that.setData({
      cid: options.cid,
    })
    that.getRule(options.cid);
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
  /**
   *  报名联系人
   */
  formSubmit: function (e) {
    var that = this
    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8}$/
    console.log(e)
    console.log(that);
    if (e.detail.value.name.length == 0 || e.detail.value.tel.length == 0 || e.detail.value.age.length ==0) {//判断用户输入的信息是否有效
      wx.showToast({
        title: '请输入完整信息',
        image: '../../images/notice.png',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(e.detail.value.tel)) {
      wx.showToast({
        title: '无效的手机号',
        image: '../../images/notice.png',
        duration: 1500
      })
      return false;
    } else if (e.detail.value.age<0){
      wx.showToast({
        title: '请输入正确的年龄',
        image: '../../images/notice.png',
        duration: 1500})
    } else {
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      
        success: function (res) {
          console.log(res.networkType)
          var openid=wx.getStorageSync('openid');
          console.log(that.data);
          if (res.networkType != "none") {
            that.setData({
              nonet: false
            })
            wx.showLoading({//显示加载中提示框
              title: '加载中',
            })            
            wx.request({//添加联系人
              url: app.globalData.localUrl+'/club/join_club',
              data: {
                openid: openid,
                name: e.detail.value.name,
                tel: e.detail.value.tel,
                age: e.detail.value.age,
                cid:that.data.cid,                
              },
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {               
                console.log(res.data)
                wx.hideLoading()//隐藏加载中提示框
                if (res.data.status ==false) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500
                  })                
                } else {
                  wx.showModal({
                    title: '提交成功',
                    content: '您已成功提交报名信息，若审核通过，协会将会与您联系。',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({
                          //url:'/association_intor/association_intor?cid='+that.data.cid,
                        })
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }

                    }

                  })                  
                }
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
    }
  },

getRule:function(cid){
  var that= this;    
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType != "none") {
        that.setData({
          noNetwork: false
        })
      }
      try {       
        wx.showLoading({
          title: '正在加载中',
        })
        wx.request({//发送请求获得订单详情
          url: app.globalData.localUrl + '/club/club_detail',
          data: {
            cid: cid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            var data = res.data;
            that.setData({
              rule: data.club_detail.rule,              
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
  }
})