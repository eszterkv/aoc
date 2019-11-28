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
  const instructions = input
    .split('\n')
    .map(instruction => instruction.match(/(?<= )(\w)(?= )/g))
    .sort((a, b) => a[1].localeCompare(b[1]));

  const graph = new Map();
  for (const i of instructions) {
    const [dependency, step] = i;
    if (graph.has(step))
      graph.set(step, new Set([...graph.get(step), dependency]));
    else
      graph.set(step, new Set(dependency));
  }

  const allSteps = [...new Set(instructions.reduce((all, curr) => [...all, ...curr], []))];
  allSteps.sort().forEach(step => {
    if (!graph.has(step))
      graph.set(step, new Set());
  });

  let sequence = '';

  while (graph.size > 0) {
    const availableSteps = Array.from(graph.entries())
      .filter(([step, deps]) => deps.size === 0)
      .sort((a, b) => a[0].localeCompare(b[0]));

    const nextStep = availableSteps[0];
      const [step, deps] = availableSteps[0];
        sequence += step;
        graph.delete(step);

        for (const otherStep of graph.keys())
          if (graph.get(otherStep).has(step))
            graph.get(otherStep).delete(step);
  }

  return sequence;
}

function solve2(input) {
}
