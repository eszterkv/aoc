const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/01.test');

runTest(sumDigits, tests.suite1);
runTest(sumDigitsPt2, tests.suite2);

fs.readFile('./inputs/01.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${sumDigits(input)}`);
  console.log(`Part 2: ${sumDigitsPt2(input)}`);
});

function sumDigits(input) {
  digits = String(input).split('').map((d) => parseInt(d));
  return digits.map((d, idx) => {
    return d === (idx < digits.length - 1 ? digits[idx + 1] : digits[0]) && d;
  }).reduce((sum, digit) => sum + digit);
}

function sumDigitsPt2(input) {
  digits = String(input).split('').map((d) => parseInt(d));
  return digits.map((d, idx) => {
    const offset = digits.length / 2;
    const next = idx + offset < digits.length - 1
      ? digits[idx + offset]
      : digits[(idx + offset) % digits.length];
    return d === next && d;
  }).reduce((sum, digit) => sum + digit);
}
