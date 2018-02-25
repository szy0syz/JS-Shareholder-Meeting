import mongoose from 'mongoose'

const Shares = mongoose.model('Shares')

module.exports = {
  index: (req, res) => {
    Shares.getStats()
    res.send('report page')
  }
}