import mongoose from 'mongoose'

const Shares = mongoose.model('Shares')

module.exports = {
  index: (req, res) => {
    res.send('report page')
  }
}