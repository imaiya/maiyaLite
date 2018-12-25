// pages/doc/doc.js
Page({

  data: {
    md_content: '',
    showLoading: true,
    name: ''
  },

  onShareAppMessage(res) {
    return {
      title: 'API文档查询',
      path: 'pages/api/api'
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name.replace('.md', '')
    })
    this.data.name = options.name.replace('.md', '')
    wx.BaaS.request({
      url: options.download_url,
      data: {
        access_token: 'a83282f90e3f99082518be4ab5392cb2f6f989bd'
      },
      method: 'GET'
    }).then(res => {
      console.log(res)
      var md = res.data.replace(new RegExp('\\]\\(', 'g'), '](' + options.download_url.replace(options.name, ''))
      this.setData({
        md_content: md
      })
      var that = this
      setTimeout(function() {
        that.setData({
          showLoading: false
        })
      }, 1000);
    })
  },

})