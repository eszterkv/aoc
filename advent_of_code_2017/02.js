const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/02.test');

runTest(getChecksum, tests.suite1);
runTest(getChecksumPart2, tests.suite2);

fs.readFile('./inputs/02.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${getChecksum(input)}`);
  console.log(`Part 2: ${getChecksumPart2(input)}`);
});

function getChecksum(input) {
  return input.split('\n')
              .map((row) => {
                const batch = row.split('\t').map((num) => parseInt(num));
                return Math.max.apply(this, batch) - Math.min.apply(this, batch);
              })
              .reduce((sum, row) => sum + row);
}

function getChecksumPart2(input) {
  return input.split('\n')
              .map((row) => {
                const batch = row.split('\t').map((num) => parseInt(num));
                let num, divisor;
                batch.forEach((n, idx) => {
                  batch.slice(0, idx).concat(batch.slice(idx + 1, batch.length)).forEach((d) => {
                    if (n % d === 0) {
                      num = n;
                      divisor = d;
                    }
                  })
                });
                return num / divisor;
              })
              .reduce((sum, row) => sum + row);
}
