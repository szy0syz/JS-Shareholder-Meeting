import { resolve } from 'path'
const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('fast-csv')
const stream = fs.createReadStream(resolve(__dirname, '../utils/shares.csv'))

const Shares = mongoose.model('Shares')

var csvStream = csv
  .parse()
  .on("data", async function (data) {
    console.log(data);
    console.log('~~~~~~~~~')
    const share = new Shares({
      barCode: data[0],
      name: data[1],
      shares: data[2],
      type: data[3]
    })
    share.save()
  })
  .on("error", function (err) {
    console.error(err);
  })
  .on("end", function () {
    console.log("~~~~~~~~~ done ~~~~~~~~~");
  })

function dataImport() {
  stream.pipe(csvStream)
}  

export {
  dataImport
}