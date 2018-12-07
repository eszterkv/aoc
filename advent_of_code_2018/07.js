const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/07.test');

runTest(solve, tests.suite1);
// runTest(solve2, tests.suite2);

fs.readFile('./inputs/07.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
//  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  const steps = input.split('\n').map(line => ({req: line.split(' ')[1], step: line.split(' ')[7]}));
  const sequences = [];
  steps.forEach(s => {
    let found = false;
    if (sequences.length === 0) {
      sequences.push(s.req + s.step);
    } else {
      sequences.forEach((seq, idx) => {
        if (seq[seq.length - 1] === s.req) {
          sequences[idx] = seq + s.step;
          found = true;
        }
        if (seq[0] === s.step) {
          sequences[idx] = s.req + seq;
          found = true;
        }
      });
      if (!found) {
        sequences.push(s.req + s.step);
      }
    }
  });
  steps.forEach(s => {
    sequences.forEach((seq, idx) => {
      if (seq[seq.length - 1] === s.req) {
        sequences[idx] = seq + s.step;
      }
      if (seq[0] === s.step) {
        sequences[idx] = s.req + seq;
      }
    });
  });

  let solution = sequences[0];
  for (let i = 1; i < sequences.length; i++) {
    const s = sequences[i];
    console.log('trying to add', s, 'to', solution);
    for (let j = 0; j < s.length; j++) {
      if (solution.indexOf(s[j]) === -1) {
        const from = solution.indexOf(s[j - 1]) + 1,
              to = solution.indexOf(s[j + 1]);
        let inserted = false;
        for (let k = from; k < to; k++) {
          if (solution[k], s[j] < solution[k]) {
            solution = solution.substring(0, k) + s[j] + solution.substring(k);
            inserted = true;
            break;
          };
        }
        if (!inserted) solution = solution.substring(0, to) + s[j] + solution.substring(to);
        console.log('-->', solution);
      };
    }
  };
  return solution;
}


function solve2(input) {
}
