const test = require('tape')
const {spawn} = require('child_process')
const {join: joinPath} = require('path')
const fs = require('fs')

const cmdPath = require.resolve('../bin/tap-exit-code')
test('exitCode 0 when all tests pass', t => {
  t.plan(1)
  const p = spawn(cmdPath)
  fs.createReadStream(joinPath(__dirname, 'fixtures/pass.tap'))
    .pipe(p.stdin)
  p.on('close', exitCode => t.equal(exitCode, 0))
})

test('exitCode 1 if any tests fail', t => {
  t.plan(1)
  const p = spawn(cmdPath)
  fs.createReadStream(joinPath(__dirname, 'fixtures/fail.tap'))
    .pipe(p.stdin)
  p.on('close', exitCode => t.equal(exitCode, 1))
})

test('exitCode 1 if the tests bail out', t => {
  t.plan(1)
  const p = spawn(cmdPath)
  fs.createReadStream(joinPath(__dirname, 'fixtures/bail-out.tap'))
    .pipe(p.stdin)
  p.on('close', exitCode => t.equal(exitCode, 1))
})
