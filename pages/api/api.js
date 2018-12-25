// pages/api/api.js
import docAPI from '../../api/api_doc'
Page({

  data: {
    docList: []
  },
  onItemClick: function(event) {
    console.log(event)
    var curl = event.currentTarget.dataset.curl
    var cname = event.currentTarget.dataset.cname
    wx.navigateTo({
      url: '../doclist/doclist?url=' + curl + '&name=' + cname
    })
  },
  onShareAppMessage(res) {
    return {
      title: 'API文档查询',
      path: 'pages/api/api'
    }
  },

  onLoad: function(options) {
    docAPI.getDoctList((res) => {
      this.setData({
        docList: res.data.objects
      })
    })
  },


})