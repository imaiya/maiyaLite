//内容表的数据项操作API封装
//获取所有文章的简易信息
let getContentList = (offset, cb) => {
  let query = new wx.BaaS.Query()
  // 应用查询对象
  let contentTable = new wx.BaaS.TableObject('table_content')

  contentTable
    .select(['title', 'description', 'cover', 'id', 'readed', 'category_value'])
    .setQuery(new wx.BaaS.Query().compare('id', '!=', '5c1cb61d097b2931396f9974'))
    .expand(['category_value'])
    .limit(5)
    .offset(offset)
    .orderBy('-created_at')
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}
/**
 * 根据id获取文章的详情
 */
let getContentWithId = (contentId, cb) => {
  new wx.BaaS.TableObject('table_content')
    .get(contentId)
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

/**
 * 更新文章的阅读数
 */
let updateReaded = (contentId, nowReaded) => {
  var table = new wx.BaaS.TableObject('table_content')
  var item = table.getWithoutData(contentId)

  item.set('readed', nowReaded ? nowReaded + 1 : 11)
  item.update().then(res => {
    // success
  }, err => {
    // err
  })
}

let updateUserSubscibe = (subscibe) => {
  let MyUser = new wx.BaaS.User()
  let currentUser = MyUser.getCurrentUserWithoutData()

  // age 为自定义字段
  currentUser.set('subscibe', subscibe).update().then(res => {
    // success
  }, err => {
    // err
    console.log('更新订阅状态失败')
  })
}




module.exports = {
  getContentList,
  getContentWithId,
  updateReaded,
  updateUserSubscibe,
}