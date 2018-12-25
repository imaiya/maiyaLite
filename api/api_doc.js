//内容表的数据项操作API封装
//获取所有API文档
let getDoctList = (cb) => {
  // 应用查询对象
  let contentTable = new wx.BaaS.TableObject('table_doc')

  contentTable
    .orderBy('-created_at')
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}





module.exports = {
  getDoctList,
}