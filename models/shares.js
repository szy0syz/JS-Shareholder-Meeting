//股东股份表
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  },
  t0: Number,
  t1: Number,
  t2: Number,
  t3: Number,
  t4: Number,
  t5: Number,
  t6: Number,
  t7: Number,
  t8: Number,
  t9: Number,
  t10: Number,
  t11: Number,
  t12: Number,
  t13: Number,
  t14: Number,
  t15: Number,
  t16: Number,
  t17: Number,
  t18: Number,
  t19: Number
})

// SharesSchema.pre('save', function (next) { })

SharesSchema.statics = {
  async getNoVotes(num) {
    let res = null
    let ary = await this.where({ isVote: false }).sort({ barCode: 1 })
    console.log(num)
    if (ary.length <= num) {
      res = ary.map((item) => { return item.name })
    }
    console.log('res___' + res)
    return res
  },
  async getStats() {

    const totalShares = 5370
    const reallyShares = 0
  }
}

const Shares = mongoose.model('Shares', SharesSchema)