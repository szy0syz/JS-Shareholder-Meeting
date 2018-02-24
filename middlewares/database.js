import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
const config = require('../config')

const modelPath = resolve(__dirname, '../models')

fs.readdirSync(modelPath)
  .filter(filename => ~filename.search(/\.js$/))
  .forEach(filename => {
    console.log(resolve(modelPath, filename))
    require(resolve(modelPath, filename))
  })

//.forEach(filename => require(resolve(modelPath, filename)))

export const database = app => {
  if (config.isDev) {
    mongoose.set('debug', true)
  }

  mongoose.connect(config.mongodb)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.mongodb)
  })
  
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB: ', config.mongodb)
  })
}