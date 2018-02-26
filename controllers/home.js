import { dataImport } from '../utils/import'

module.exports = {
  home: (req, res, next) => {
    res.send('home page')
  },
  import: (req, res) => {
    dataImport()
    res.send('doing')
  }
}