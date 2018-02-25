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

export {
  createError,
  sumByColumnName
}