const fs = require('fs')
const csv = require('fast-csv')
const stream = fs.createReadStream('./shares.csv')

var csvStream = csv
  .parse()
  .on("data", function (data) {
    console.log(data);
    console.log('~~~~~~~~~')
  })
  .on("end", function () {
    console.log("done");
  })

stream.pipe(csvStream)