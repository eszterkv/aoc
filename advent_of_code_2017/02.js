const fs = require('fs');
const test = require('./test');

fs.readFile('./02.input', 'utf8', (err, data) => {
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

const testSuite1 = [
  {input: `5 1 9 5
7 5 3
2 4 6 8`.replace(/( )/g, '\t'), expected: 18},
];

const testSuite2 = [
  {input: `5 9 2 8
9 4 7 3
3 8 6 5`.replace(/()/g, '\t'), expected: 9}
];

test(getChecksum, testSuite1);
test(getChecksumPart2, testSuite2);
