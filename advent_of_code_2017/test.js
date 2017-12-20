function test(fn, testSuite) {
  console.log(`Testing ${fn.name}...`)
  const testResults = testSuite.map((testCase) => {
    const actual = fn(testCase.input);
    if (actual !== testCase.expected)
      console.log(`Error with input ${testCase.input}: expected ${testCase.expected}, got ${actual}`);
    return actual === testCase.expected;
  });
  console.log(`Done with ${testResults.filter((r) => !r).length} errors.\n`)
}

module.exports = test;
