const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/04.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/04.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  const guards = parseGuards(input);
  const sleepyGuard = Object.keys(guards)
    .map(g => ({id: g, sleeps: guards[g], total: sum(guards[g])}))
    .sort((a, b) => b.total - a.total)
    [0];
  return sleepyGuard.id * sleepyGuard.sleeps.indexOf(Math.max.apply(null, sleepyGuard.sleeps));
}


function solve2(input) {
  const guards = parseGuards(input);
  const sleepyGuard = Object.keys(guards)
    .map(g => ({
      id: g,
      timesAsleep: Math.max.apply(null, guards[g]),
      sleepyMinute: guards[g].indexOf(Math.max.apply(null, guards[g]))
    }))
    .sort((a, b) => b.timesAsleep - a.timesAsleep)
    [0];
  return sleepyGuard.id * sleepyGuard.sleepyMinute;
}

function parseGuards(input) {
  const sortedEntries = input.split('\n').sort((a, b) => timestamp(a) - timestamp(b));
  const guards = {};
  let currentGuard,
      sleepsAt = 0,
      wakesAt = 0;

  sortedEntries.forEach(e => {
    if (e.indexOf('#') > -1) {
      currentGuard = parseInt(e.split('#')[1].split(' ')[0]);
      if (!guards.hasOwnProperty(currentGuard)) {
        guards[currentGuard] = Array(60).fill(0);
      }
    } else {
      const min = parseInt(e.substring(15, 17));
      if (e.indexOf('falls asleep') > -1) {
        sleepsAt = min;
      } else if (e.indexOf('wakes up') > -1) {
        wakesAt = min;
        for (let i = sleepsAt; i < wakesAt; i++) {
          guards[currentGuard][i]++;
        }
      }
    }
  });

  return guards;
}

function timestamp(entry) {
  return new Date(entry.substr(1, 16));
}

function minute(entry) {
  return parseInt(entry.substring(15, 17));
}

function sum(arr) {
  return arr.reduce((sum, n) => sum + n, 0);
}
