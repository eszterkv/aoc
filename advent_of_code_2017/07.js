const fs = require('fs');
const test = require('./test');

fs.readFile('./07.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${findRootProgram(input)}`);
});

function findRootProgram(input) {
  const programs = input.split('\n')
                        .map((line) => new Program(line))
                        .filter((p) => !!p.children);
  const children = programs.map((p) => p.children)
                           .reduce((prev, curr) => prev.concat(curr));
  return programs.filter((p) => children.indexOf(p.name) === -1)[0].name;
}

class Program {
  constructor(programDef) {
    this.name = programDef.split(' ')[0];
    this.weight = parseInt(programDef.split('(')[1].split(')')[0]);
    this.children = this.createChildrenOrNone(programDef);
  }

  createChildrenOrNone(programDef) {
    return programDef.indexOf('->') > -1
      ? programDef.split('-> ')[1].split(', ') : null;
  }
}

function findRootProgramPart2(input) {
  // part 2 goes here
}

const testSuite1 = [
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

test(findRootProgram, testSuite1);
// run_tests(findRootProgramPart2, testSuite2)
