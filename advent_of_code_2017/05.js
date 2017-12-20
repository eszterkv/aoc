const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/05.test');

runTest(jump, tests.suite1);
runTest(jumpPart2, tests.suite2);

fs.readFile('./inputs/05.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${jump(input)}`);
  console.log(`Part 2: ${jumpPart2(input)}`);
});

function jump(input) {
  let stepList = input.split('\n').map((step) => parseInt(step));
  let idx = 0;
  let stepCount = 0;
  while (idx < stepList.length) {
    const prevIdx = idx;
    idx += stepList[prevIdx];
    stepList[prevIdx] += 1;
    stepCount++;
  }
  return stepCount;
}

function jumpPart2(input) {
  let stepList = input.split('\n').map((step) => parseInt(step));
  let idx = 0;
  let stepCount = 0;
  while (idx < stepList.length) {
    const prevIdx = idx;
    idx += stepList[prevIdx];
    stepList[prevIdx] += (stepList[prevIdx] >= 3 ? -1 : 1);
    stepCount++;
  }
  return stepCount;
}
