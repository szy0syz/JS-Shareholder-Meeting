// Create HTTP error
function createError(status, message) {
  let err = new Error(message)
  err.status = status
  return err
}

export {
  createError
}