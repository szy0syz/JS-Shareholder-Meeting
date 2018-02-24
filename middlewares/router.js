import fs from 'fs'
import { resolve } from 'path'

const routePath = resolve(__dirname, '../routes')

export const router = app => {
  fs.readdirSync(routePath)
    .filter(filename => ~filename.search(/\.js$/))
    .forEach(filename => require(resolve(routePath, filename))(app))
}