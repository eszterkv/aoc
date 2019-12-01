const dir = process.argv.slice(2)[0];
const { part1, part2 } = require(`./${dir}/index`);
const { suite1, suite2 } = require(`./${dir}/test-cases`);

if (!dir) {
  console.warn('Please tell me what to test.');
  return;
}

test(part1, suite1, '1');
test(part2, suite2, '2');

function test(fn, suite, part) {
  console.log(`Testing part ${part}…`);
  let errors = 0;
  suite.forEach(testCase => {
    const actual = fn(testCase.input);
    if (actual !== testCase.expected) {
      console.error(`❌ Error with input ${testCase.input}: expected ${testCase.expected}, got ${actual}`);
      errors++;
    }
    else {
      console.log('✅ OK');
    }
  });

  console.log(`Done with ${errors} error${errors == 1 ? '' : 's'}.\n`)
}
