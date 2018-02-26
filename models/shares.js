//股东股份表
const mongoose = require('mongoose')
const Schema = mongoose.Schema

import * as util from '../utils'

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
    if (ary.length <= num) {
      res = ary.map((item) => { return item.name })
    }
    return res
  },
  async getStats(num) {
    // 只要即签到又表决的 isPresent: true , isVote: true
    let allShareholders = await this.find({}, { _id: 0, __v: 0, voteTime: 0, signTime: 0 }).sort({ barCode: 1 }).exec()
    let signShareholders = allShareholders.filter(h => h.isPresent === true)
    let voteSharesholders = allShareholders.filter(h => h.isVote === true)
    const statsCount = num
    const totalShares = util.sumByColumnName(allShareholders, 'shares').toFixed()
    const signShares = util.sumByColumnName(signShareholders, 'shares')
    const signHolders = signShareholders.length
    const voteHloders = voteSharesholders.length
    const noVoteHolders = allShareholders.filter(h => h.isPresent === true && h.isVote === false).map(h => h.name)
    const voteShares = util.sumByColumnName(voteSharesholders, 'shares')
    let statsDetail = []
    let tmp
    for (let i = 0; i < 5; i++) {
      tmp = util.filterAndGroupAndSumByColumn(voteSharesholders, {
        group: (item) => item['t' + i],
        colName: 'shares',
        index: i
      })
      statsDetail.push(tmp)
    }
    tmp = null
    return {
      totalShares,
      signHolders,
      signShares,
      voteHloders,
      voteShares,
      noVoteHolders,
      statsDetail
    }
  }
}

const Shares = mongoose.model('Shares', SharesSchema)