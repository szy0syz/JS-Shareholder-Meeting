let config

if (process && process.env && process.env.NODE_ENV) {
  config = require('./env/' + process.env.NODE_ENV)
} else {
  config = require('./env/developemnt')
  config.isDev = true
}

module.exports = config