function challenge(input) {
  const lines = input.split('\n');
  progs = lines.map((line) => new Program(line));
  progs = progs.filter((p) => !!p.children);
  console.log(progs);
  console.log('-------------');
  // part 1 goes here
  // progs have {name, weight, list_of_progs_held}
}

class Program {
  constructor(program_def) {
    this.name = program_def.split(' ')[0];
    this.children = this.createChildrenOrNone(program_def);
  }

  createChildrenOrNone(program_def) {
    return program_def.indexOf('->') > -1
      ? program_def.split('-> ')[1].split(', ') : null;
  }
}

function challenge_part_2(input) {
  // part 2 goes here
}

function run_tests(fn, test_suite) {
  console.log(`Testing ${fn.name}...`)
  const test_results = test_suite.map((test_case) => {
    const actual = fn(test_case.input);
    if (actual !== test_case.expected)
      // console.log(`Error with input ${test_case.input}: expected ${test_case.expected}, got ${actual}`);
    return actual === test_case.expected;
  });
  console.log(`Done with ${test_results.filter((r) => !r).length} errors.\n`)
}

const test_suite_1 = [
  {input: `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`, expected: 'tknk'},
];

const test_suite_2 = [
  {input: true, expected: true},
];

run_tests(challenge, test_suite_1);
// run_tests(challenge_part_2, test_suite_2)

// const input = ``;

// console.log(`Part 1: ${challenge(input)}`);
// console.log(`Part 2: ${challenge_part_2(input)}`);
