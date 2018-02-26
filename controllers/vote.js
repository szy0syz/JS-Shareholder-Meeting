import mongoose from 'mongoose'
const Shares = mongoose.model('Shares')

module.exports = {
  home: (req, res, next) => {
    res.send('voting page')
  },
  vote: async (req, res, next) => {
    // todo: 验证data
    const data = (req.params.voteData || req.body.data || 0) + ''
    console.log(data)
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

      res.json({
        ok: 1,
        msg: '股东表决成功',
        name: shareholder.name,
        noVotes: await Shares.getNoVotes(15) //如果未表决股东少于15人时返回名单
      })
    } else {
      res.json({
        ok: 0,
        msg: '此股东并未签到'
      })
    }
  }
}