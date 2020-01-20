const parser = require('tap_parser')
const {obj: through} = require('throo')
const duplex = require('duplexer')

const setCode = () => {
  let hasFailingTest = false
  return through((push, chunk, enc, cb) => {
    if (chunk.type === 'bailout' || (chunk.type === 'test' && chunk.parsed.ok === false)) {
      hasFailingTest = true
    }
    push(chunk.value + '\n')
    cb()
  }, (push, cb) => {
    if (hasFailingTest) {
      process.on('exit', () => process.exit(1))
    }
    cb()
  })
}

const exitCode = () => {
  const parserStream = parser()
  const exitCodeStream = parserStream
    .pipe(setCode())
  return duplex(parserStream, exitCodeStream)
}

module.exports = exitCode
