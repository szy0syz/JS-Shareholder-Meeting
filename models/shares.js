//股东股份表
const mongoose = require('mongoose')
const Schema = mognoose.Schema

const SharesSchema = new Schema({
  barCode: Number,
  name: String,
  shares: Number,
  type: String,
  voteTime: {
    type: Date,
    default: Date.now()
  },
  signTime: {
    type: Date,
    default: Date.now()
  },
  isPresent: {
    type: Boolean,
    default: false
  },
  isVote: {
    type: Boolean,
    default: false
  }
})

SharesSchema.pre('save', function (next) { })

SharesSchema.statics = {}

const Shares = mongoose.model('Shares', SharesSchema)