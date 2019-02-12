// pages/doc/doc.js
Page({

  data: {
    md_content: '',
    showLoading: true,
    name: ''
  },

  noUIData: {
    download_url: ''
  },

  onShareAppMessage(res) {
    return {
      title: 'API文档查询:' + this.data.name,
      path: 'pages/doc/doc?download_url=' + this.noUIData.download_url + '&name=' + this.data.name
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name.replace('.md', '')
    })
    this.data.name = options.name.replace('.md', '')
    //云函数转发调用
    wx.BaaS
      .invokeFunction('githubTranspond', {
        url: options.download_url
      })
      .then(res => {
        console.log(res)
        //有一些md文件包含前面的注释部分,以---开头,以---结尾,故需要先去掉该部分
        var noMate = res.data.replace(new RegExp('^---[\\s\\S]*---'),'')
        //由于github的md文档中图片路径都是相对路径,这里需要转化为绝对路劲
        var md = noMate.replace(new RegExp('\\]\\(', 'g'), '](' + options.download_url.replace(options.name, ''))
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