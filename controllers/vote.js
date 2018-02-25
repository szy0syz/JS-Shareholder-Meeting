import mongoose from 'mongoose'
const Shares = mongoose.model('Shares')

module.exports = {
  home: (req, res, next) => {
    res.send('voting page')
  },
  vote: async (req, res, next) => {
    // todo: 验证data
    const data = req.body.data
    const barCode = data.slice(0, 5)
    const stats = data.slice(5)
    const shareholder = await Shares.findOne({
      barCode,
      isPresent: true
    }).exec()
    if (shareholder) {
      shareholder.isVote = true
      for (let i = 0; i < stats.length; i++) {
        if (stats[i]) {
          shareholder['t' + i] = parseInt(stats[i], 10)
        }
      }
      shareholder.save()

      let ary = await Shares.where({ isVote: false }).sort({ barCode: 1 })
      let noVotes
      if (ary.length <= 15) {
        noVotes = ary.map((item) => {
          return item.name
        })
      }
      res.json({
        ok: 1,
        msg: '股东签到成功',
        name: shareholder.name,
        noVotes: noVotes ? noVotes : null
      })
    } else {
      res.json({
        ok: 0,
        msg: '此股东并未签到'
      })
    }
  }
}