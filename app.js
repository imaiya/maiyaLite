//app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    let clientID = '0b829ec3dd58f96ec69d'
    wx.BaaS.init(clientID)
  },
  globalData: {
    //内容表的GroupID
    contentGroupID: 1545197578391899,
  }
})