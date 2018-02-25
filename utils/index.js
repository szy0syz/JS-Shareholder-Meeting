// 在Array原型上添加一个分组方法
Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (key) {
    var map = {};
    this.forEach(function (e) {
      var k = key(e);
      map[k] = map[k] || [];
      map[k].push(e);
    })
    return Object.keys(map).map(function (k) {
      return { key: k, data: map[k] };
    })
  }
})

// Create HTTP error
function createError(status, message) {
  let err = new Error(message)
  err.status = status
  return err
}

function sumByColumnName(arr, cn) {
  let sum = arr.reduce((acc, val) => {
    acc += Number(val[cn])
    return acc
  }, 0.0)
  return sum
}

function filterAndGroupAndSumByColumn(arr, options) {
  // 检查arr不能为空，colName长度大于0。
  if (!arr && options.colName.length > 0) return []

  let array = Object.assign([], arr)

  // 先过滤
  if (options.filter) {
    array = array.filter(options.filter)
  }
  // 再分组
  if (options.group) {
    array = array.group(options.group)
  }
  // console.log('~~~我是array~~~`')
  // console.dir(array)
  // console.log('******')
  // 最后聚合
  array = array.reduce((acc, val) => {
    acc.push({
      title: options.index,
      val: val.key,
      count: val.data.length,
      sum: this.sumByColumnName(val.data, options.colName)
    })
    return acc
  }, []);
  return array
}

export {
  createError,
  sumByColumnName,
  filterAndGroupAndSumByColumn
}