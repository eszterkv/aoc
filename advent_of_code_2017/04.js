const fs = require('fs');
const test = require('./test');

fs.readFile('./inputs/04.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${countValidPassphrases(input, validateNoDuplicates)}`);
  console.log(`Part 2: ${countValidPassphrases(input, validateNoAnagrams)}`);
});

function countValidPassphrases(input, validationFn) {
  return input.split('\n').filter((pp) => validationFn(pp)).length;
}

function validateNoDuplicates(passphrase) {
  const words = passphrase.split(' ');
  return words.length === words.filter((word, idx, arr) => idx === arr.indexOf(word)).length;
}

function validateNoAnagrams(passphrase) {
  const words = passphrase.split(' ');
  return words.length === words.map((word) => word.split('').sort().join(''))
                               .filter((word, idx, arr) => idx === arr.indexOf(word)).length;
}

const testSuiteNoDuplicates = [
  {input: 'aa bb cc dd ee', expected: true},
  {input: 'aa bb cc dd aa', expected: false},
  {input: 'aa bb cc dd aaa', expected: true},
];

const testSuiteNoAnagrams = [
  {input: 'abcde fghij', expected: true},
  {input: 'abcde xyz ecdab', expected: false},
  {input: 'a ab abc abd abf abj', expected: true},
  {input: 'iiii oiii ooii oooi oooo', expected: true},
  {input: 'oiii ioii iioi iiio', expected: false},
];

test(validateNoDuplicates, testSuiteNoDuplicates);
test(validateNoAnagrams, testSuiteNoAnagrams);
