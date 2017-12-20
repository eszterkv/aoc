const fs = require('fs');
const test = require('./test');

fs.readFile('./01.input', 'utf8', (err, data) => {
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

const testSuite1 = [
  {input: 1122, expected: 3},
  {input: 1111, expected: 4},
  {input: 1234, expected: 0},
  {input: 91212129, expected: 9},
];

const testSuite2 = [
  {input: 1212, expected: 6},
  {input: 1221, expected: 0},
  {input: 123425, expected: 4},
  {input: 123123, expected: 12},
  {input: 12131415, expected: 4},
]

test(sumDigits, testSuite1);
test(sumDigitsPt2, testSuite2);
