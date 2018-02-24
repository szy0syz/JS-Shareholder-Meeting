import mongoose from 'mongoose'
import * as util from '../utils'

const Shares = mongoose.model('Shares')

module.exports = {
  home: (req, res, next) => {
    res.send('signing page')
  },
  sign: (req, res, next) => {
    try {
      const barCode = parseInt(req.query.barCode, 10)
      const shareholder = Shares.findOne({
        barCode: barCode
      }).exec()
      if (shareholder) {
        shareholder.isPresent = true
        shareholder.signTime = Date.now()
        try {
          shareholder.save()
          res.json({
            ok: 1,
            msg: '签到成功',
            name: shareholder.name
          })
        } catch (err) {
          console.log('保存股东签到失败')
          res.json({
            ok: 0,
            msg: '保存股东签到失败',
            err
          })
        }
      } else {
        res.json({
          ok: 0,
          msg: '无此股东编码'
        })
      }

    } catch (err) {
      res.json({
        ok: 0,
        msg: err.message
      })
    }
  },
  get: (req, res, next) => {

  },
  getByBarCode: (req,res,next, key, value) => {
    
  }
}