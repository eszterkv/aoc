function distribute_blocks(input) {
  let banks = input.split('\t').map((n) => parseInt(n));
  let snapshots = [String(banks)];
  while (true) {
    const blocks = Math.max.apply(null, banks);
    const largest_bank_idx = banks.indexOf(blocks);
    banks[largest_bank_idx] = 0;
    for (let i = 1; i < blocks + 1; i++) {
      banks[(largest_bank_idx + i) % banks.length] += 1;
    }
    if (snapshots.indexOf(String(banks)) > -1) {
      console.log(snapshots.length - snapshots.indexOf(String(banks)));
      return snapshots.length;
    }
    snapshots.push(String(banks));
  }
}

function run_tests(fn, test_suite) {
  console.log(`Testing ${fn.name}...`)
  const test_results = test_suite.map((test_case) => {
    const actual = fn(test_case.input);
    if (actual !== test_case.expected)
      console.log(`Error with input ${test_case.input}: expected ${test_case.expected}, got ${actual}`);
    return actual === test_case.expected;
  });
  console.log(`Done with ${test_results.filter((r) => !r).length} errors.\n`)
}

const test_suite = [
  {input: `0 2 7 0`, expected: 5},
];

// tests disabled, tabs vs spaces issue
// run_tests(distribute_blocks, test_suite);

const input = `0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11`;

console.log(`Part 1 & 2: ${distribute_blocks(input)}`);
