function challenge(input) {
  // part 1 goes here
}

function challenge_part_2(input) {
  // part 2 goes here
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

const test_suite_1 = [
  {input: true, expected: true},
];

const test_suite_2 = [
  {input: true, expected: true},
];

run_tests(challenge, test_suite_1);
run_tests(challenge_part_2, test_suite_2)

const input = true;

console.log(`Part 1: ${challenge(input)}`);
console.log(`Part 2: ${challenge_part_2(input)}`);
