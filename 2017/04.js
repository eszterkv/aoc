const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/04.test');

runTest(validateNoDuplicates, tests.noDuplicates);
runTest(validateNoAnagrams, tests.noAnagrams);

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
