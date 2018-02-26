import ejs from 'ejs'
import mongoose from 'mongoose'

const Shares = mongoose.model('Shares')

const stats = (a, b = 1, num = 2) => (a / b * 100).toFixed(num)

function print() {
  const voteList = ['同意', '不同意', '弃权']
  const tpl = `弃权 万股，占参加投票股东所持有表决权股份总数的 %`
}

module.exports = {
  index: async (req, res) => {
    const data = await Shares.getStats()
    // const result = `
    //   二、参会股东情况\n
    //       参加本次会议的股东及股东授权代表${data.signHolders}人，代表股份${data.signShares}万股，占公司表决权总股份数的${stats(data.signShares, data.totalShares)}%，参会股东所代表的股份数占公司总股份数的份额符合《公司法》规定。\n
    //   三、提案审议情况\n
    //   大会以记名投票表决的方式审议并通过以下议案：\n
    //       1、《董事会2014年工作报告》\n
    //   同意${data.statsDetail[0][0].sum}万股，占参加投票股东所持有表决权股份总数的${stats(data.statsDetail[0][0].sum, data.voteShares)}%；不同意${data.statsDetail[0][1].sum}股，占参加投票股东所持有表决权股份总数的${stats(data.statsDetail[0][1].sum, data.voteShares)}%；弃权${data.statsDetail[0][2]['sum'] || 0}万股，占参加投票股东所持有表决权股份总数的    %。\n
    //       2、《公司2014年财务决算报告》\n
    //   同意   万股，占参加投票股东所持有表决权股份总数的   %；不同意   股，占参加投票股东所持有表决权股份总数的  %；弃权      万股，占参加投票股东所持有表决权股份总数的    %。\n
    //       3、《公司2014年利润分配方案》\n
    //   同意   万股，占参加投票股东所持有表决权股份总数的   %；不同意   股，占参加投票股东所持有表决权股份总数的  %；弃权      万股，占参加投票股东所持有表决权股份总数的    %。\n
    //       4、《公司2015年财务预算方案》\n
    //   同意   万股，占参加投票股东所持有表决权股份总数的   %；不同意   股，占参加投票股东所持有表决权股份总数的  %；弃权      万股，占参加投票股东所持有表决权股份总数的    %。\n
    //       5、审议《关于补选董事的提案》\n
    //   同意   万股，占参加投票股东所持有表决权股份总数的   %；不同意   股，占参加投票股东所持有表决权股份总数的  %；弃权      万股，占参加投票股东所持有表决权股份总数的    %。\n
    //   `
    res.send(data)
  }
}



