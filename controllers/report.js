import mongoose from 'mongoose'

const Shares = mongoose.model('Shares')

module.exports = {
  index: async (req, res) => {
    const result = await Shares.getStats()
    res.json(result)
  }
}