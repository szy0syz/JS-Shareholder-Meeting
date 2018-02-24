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
  }
})

// SharesSchema.pre('save', function (next) { })

// SharesSchema.statics = {
//   async signIn(data) {
//     let shareholder = await this.findOne({
//       barCode: data.barCode
//     }).exec()
//     if(shareholder) {
//       shareholder.isPresent = 1
//       shareholder.signTime = Date.now()
      
//     } else {

//     }
//   }
// }

const Shares = mongoose.model('Shares', SharesSchema)