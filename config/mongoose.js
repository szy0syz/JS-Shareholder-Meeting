import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
const config = require('./index')

const modelsPath = resolve(__dirname, '/models')

fs.readdirSync(modelsPath)
  .filter(filename => ~filename.search(/\.js$/))
  .forEach(filename => require(resolve(modelsPath, filename)))

export const database = () => {
  if (config.isDev) {
    mongoose.set('debug', true)
  }
  
}