import ejs from 'ejs'
import mongoose from 'mongoose'

const Shares = mongoose.model('Shares')


function print(opt) {
  const voteList = ['未知', '同意', '不同意', '弃权']
  const stats = (a, b = 1, num = 2) => (a / b * 100).toFixed(num)

  const tpl = `
二、参会股东情况
    参加本次会议的股东及股东授权代表<%= signHolders %>人，代表股份<%= signShares %>万股，占公司表决权总股份数的<%= stats(signShares, totalShares, 4) %>%，参会股东所代表的股份数占公司总股份数的份额符合《公司法》规定。
三、提案审议情况
    大会以记名投票表决的方式审议并通过以下议案：
    <% for(let i = 0; i < data.length; i++) {%>
    <%= i+1 %>、
    <% for(let j = 0; j < data[i].length; j++) {%>
      <% if(!!data[i][j].val) { %> <%= voteList[data[i][j].val] %><%= data[i][j].sum %>万股，占参加投票股东所持有表决权股份总数的<%= stats(data[i][j].sum, voteShares, 4) %>% <% } %>
    <% } %>
    <% } %>
  `
  return ejs.render(tpl, {
    data: opt.statsDetail,
    signHolders: opt.signHolders,
    signShares: opt.signShares,
    totalShares: opt.totalShares,
    voteShares: opt.voteShares,
    voteList,
    stats
  })
}


module.exports = {
  index: async (req, res) => {
    const data = await Shares.getStats()
    data.report = print(data)
    res.send(data)
  }
}


/*
[ 
  [ 
    { title: 0, val: '1', count: 6, sum: 4589.1177 },
    { title: 0, val: '3', count: 2, sum: 16.2346 } 
  ],
  [ 
    { title: 1, val: '1', count: 5, sum: 4584.1777 },
    { title: 1, val: '2', count: 2, sum: 15.9373 },
    { title: 1, val: '3', count: 1, sum: 5.2373 } 
  ],
  [ 
    { title: 2, val: '1', count: 5, sum: 4593.175 },
    { title: 2, val: '2', count: 1, sum: 2 },
    { title: 2, val: '3', count: 2, sum: 10.1773 } 
  ],
  [ 
    { title: 3, val: '1', count: 5, sum: 4587.1177 },
    { title: 3, val: '2', count: 1, sum: 2 },
    { title: 3, val: '3', count: 2, sum: 16.2346 } 
  ],
  [ 
    { title: 4, val: '1', count: 4, sum: 4582.1777 },
    { title: 4, val: '2', count: 2, sum: 15.9373 },
    { title: 4, val: '3', count: 2, sum: 7.2373 } 
  ] 
]
*/

/*const tpl = `
二、参会股东情况
    参加本次会议的股东及股东授权代表<%= signHolders %>人，代表股份<%= signShares %>万股，占公司表决权总股份数的<%= stats(signShares, totalShares, 4) %>%，参会股东所代表的股份数占公司总股份数的份额符合《公司法》规定。
三、提案审议情况
    大会以记名投票表决的方式审议并通过以下议案：
    <% for(let i = 0; i < data.length; i++) {%>
      <%= i %>、
      <% for(let j = 0; j < data[i].length; j++) {%>
        <% if(!!data[i][j].val) { %> <%= voteList[data[i][j].val] %><%= data[i][j].sum %>万股，占参加投票股东所持有表决权股份总数的<%= stats(data[i][j].sum, voteShares, 4) %>% <% } %>
      <% } %>
    <% } %>
  `
  */