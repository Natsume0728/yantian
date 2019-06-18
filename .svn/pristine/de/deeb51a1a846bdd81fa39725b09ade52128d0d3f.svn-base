// pages/submit/submit.js
var app=getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    act_id:'',
    imglist:[],
    json_imglist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var act_id = parseInt(options.act_id);
    
    console.log(act_id);
    if (act_id > 0) {
      var that = this;
      that.setData({'act_id':act_id});
      that.getFieldInfo(act_id);
    }
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
      title: that.data.info.act_title,
      path: '/pages/activity_apply/activity_apply?act_id='+that.data.act_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  getFieldInfo: function (act_id) {
    var that = this;
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        //console.log(res.networkType)        
        if (res.networkType != "none" && act_id > 0) {
          that.setData({
            nonet: false,
          })
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/activity/applyField',
            data: {
              'act_id': act_id,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data;
              console.log(res); 
              console.log(res.data)
              if (res.data.status == 1) {
                that.setData({
                  info:data,                  
                }, function () {
                  var leader=data.leader;
                  for(var i=0;i<leader.length;i++){
                    if(leader[i]['field_type']=='select'){
                      that.setData({
                          'sex':'',
                      })
                    }
                  }                 
                  if (data.content) {
                    WxParse.wxParse('article', 'html', data.content, that, 96);
                  }
                })
              } else {
                wx.showToast({
                  title: '获取数据失败',
                })
                
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
  formSubmit: function (e) {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;    
    var data=e.detail.value;
    e.detail.value.openid=wx.getStorageSync('openid');
    e.detail.value.act_id=that.data.act_id;
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行
        success: function (res) {
          //console.log(res.networkType)
          if (res.networkType != "none") {
            that.setData({
              nonet: false
            })
            wx.showLoading({//显示加载中提示框
              title: '加载中',
            })
            wx.request({//发送请求修改联系人信息
              url: app.globalData.localUrl+'/activity/ajaxSubmit',
              data:e.detail.value,
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res); 
                if(res.data.status==1){                 
                  wx.showModal({
                    title: '温馨提示',
                    content: res.data.msg,
                    showCancel:false,
                    success:function(res){
                        if(res.confirm){
                            wx.redirectTo({
                              url: '../mysign/mysign',
                            })
                        }
                    }
                  })
                } else{
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500,                    
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
  uploadimg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths 
        console.log(tempFilePaths);     
        var Url = 'https://group.iron-box.cn';        
        that.uploadOne(Url, 0, tempFilePaths,index);
      }
    })
  },
  uploadOne: function (Url, i, allpath,index) {
    var that = this;
    wx.uploadFile({
      url: Url + '/upload/upload_files', //仅为示例，非真实的接口地址
      filePath: allpath[i],
      name: 'file',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: {
        'folder': 'newyantian',
        'fileName': 'file'
      },
      success: function (res) {
        var data = JSON.parse(res.data);
        //do something        
        console.log(index);
        if (data.status == true) {
          var imglist = that.data.imglist;
          var json_imglist=that.data.json_imglist;          
          console.log(parseInt(imglist.length));
          if (imglist.length<index+1)imglist[index]=[];         
          if (json_imglist.length< index+1) json_imglist[index] = [];          
          imglist[index].push(Url + data.real_path);
          json_imglist[index]=JSON.stringify(imglist[index]),
          console.log(imglist[index]);console.log(json_imglist);
          that.setData({
            imglist: imglist,
            json_imglist: json_imglist,
          })
          if (i < allpath.length - 1) {
            that.uploadOne(Url, i + 1, allpath,index);
          }
        }
      }
    })
  },
  delimg: function (e) {
    var that = this;
    var imglist = that.data.imglist;
    var json_imglist=that.data.json_imglist;
    var index = e.currentTarget.dataset.index;
    var idx=e.currentTarget.dataset.idx;
    imglist[idx].splice(index, 1);
    json_imglist[idx] = JSON.stringify(imglist[idx]);
    that.setData({
      imglist: imglist,
      json_imglist: json_imglist,
    })
  },
  pickerSelect:function(e){    
    console.log(e);
  }
})