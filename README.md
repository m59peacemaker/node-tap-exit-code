# tap-exit-code

Receives streaming TAP, passes it through, and sets the process exit code to 1 if there are any failing tests.

## install

```sh
npm install tap-exit-code
```

## example

```js
const exitCode = require('tap-exit-code')

process.stdin
  .pipe(exitCode())
  .pipe(yourTapReporter())
  .pipe(process.stdout)
```
