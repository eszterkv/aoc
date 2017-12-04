function spiral_memory(input) {
  const ring_size = get_ring_size(input);
  return Math.floor(ring_size / 2) * 2 - Math.abs(get_closest_corner(input, ring_size) - input);
}

function get_ring_size(num) {
  const ceil_sqrt = Math.ceil(Math.sqrt(num));
  return ceil_sqrt % 2 == 1 ? ceil_sqrt : ceil_sqrt + 1;
}

function get_closest_corner(input, ring_size) {
  const last_corner = Math.pow(ring_size, 2);
  return [0, 1, 2, 3].map((n) => last_corner - n * (ring_size - 1))
         .sort((a, b) => Math.abs(a - input) - Math.abs(b - input))[0];
}

function spiral_memory_part_2(input) {
  let last_square = 1;
  let idx = 1;
  let matrix = [];
  const size = 100;
  for (let i = 0; i < size; i++) {
    matrix[i] = Array.apply(null, Array(size)).map(Number.prototype.valueOf, 0);
  }
  const center = size / 2;
  let x = center;
  let y = center;
  matrix[x][y] = last_square;
  while (last_square < input + 1) {
    idx++;
    ring_size = get_ring_size(idx);
    const corners = [0, 1, 2, 3].map((n) => Math.pow(ring_size, 2) - n * (ring_size - 1)).reverse();

    if (idx == Math.pow(ring_size - 2, 2) + 1) {
      y++;
    } else if (idx <= corners[0]) {
      x--;
    } else if (idx <= corners[1]) {
      y--;
    } else if (idx <= corners[2]) {
      x++;
    } else {
      y++;
    }

    last_square = [
      matrix[x-1][y-1],
      matrix[x-1][y],
      matrix[x-1][y+1],
      matrix[x][y-1],
      matrix[x][y+1],
      matrix[x+1][y-1],
      matrix[x+1][y],
      matrix[x+1][y+1]
    ].reduce((sum, val) => sum + val);

    matrix[x][y] = last_square;
  }
  return last_square;
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
  {input: 1, expected: 0},
  {input: 12, expected: 3},
  {input: 23, expected: 2},
  {input: 1024, expected: 31},
];

const test_suite_2 = [
  {input: 12, expected: 23},
  {input: 747, expected: 806},
];

run_tests(spiral_memory, test_suite_1)
run_tests(spiral_memory_part_2, test_suite_2)

const input = 361527;

console.log(`Part 1: ${spiral_memory(input)}`);
console.log(`Part 2: ${spiral_memory_part_2(input)}`);
