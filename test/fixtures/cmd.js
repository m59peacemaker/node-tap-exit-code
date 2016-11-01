#!/usr/bin/env node

const exitCode = require('../../')

process.stdin
  .pipe(exitCode())
  .pipe(process.stdout)
