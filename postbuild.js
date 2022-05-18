const fs = require('fs')
const rm = require('rimraf')

const file = fs.readFileSync('./build/potree/potree.js', 'utf-8')
const lines = file.split('\n')
  .slice(5, -3) // 干掉 umd
  .map(line => line[0] === '\t' ? line.slice(1) : line) // 干掉第一个 tab

lines.unshift("import $ from 'jquery';\n\nconst exports = window.Potree = {};")
lines.push('export default exports;')

rm.sync('dist')
fs.mkdirSync('dist')
fs.writeFileSync('./dist/index.js', lines.join('\n'), 'utf-8')

