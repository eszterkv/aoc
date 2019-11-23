function test(fn, testSuite,  ...rest) {
  const testResults = testSuite.map((testCase) => {
    const actual = fn(testCase.input, ...rest);
    if (actual !== testCase.expected)
      console.log(`Error with input ${testCase.input}: expected ${testCase.expected}, got ${actual}`);
    return actual === testCase.expected;
  });
  const errorCount = testResults.filter((r) => !r).length;
  console.log(`Done with ${errorCount} error${errorCount == 1 ? '' : 's'}.\n`)
}

module.exports = test;
