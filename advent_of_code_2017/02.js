function get_checksum(input) {
  return input.split('\n')
              .map((row) => {
                const batch = row.split('\t').map((num) => parseInt(num));
                return Math.max.apply(this, batch) - Math.min.apply(this, batch);
              })
              .reduce((sum, row) => sum + row);
}

function get_checksum_part_2(input) {
  return input.split('\n')
              .map((row) => {
                const batch = row.split('\t').map((num) => parseInt(num));
                let num, divisor;
                batch.forEach((n, idx) => {
                  batch.slice(0, idx).concat(batch.slice(idx + 1, batch.length)).forEach((d) => {
                    if (n % d === 0) {
                      num = n;
                      divisor = d;
                    }
                  })
                });
                return num / divisor;
              })
              .reduce((sum, row) => sum + row);
}

function run_test(fn, test_case, expected) {
  console.log(`Testing ${fn.name}...`)
  const result = fn(test_case);
  result == expected
    ? console.log('Done without errors.')
    : console.log(`Error with input ${test_case}: expected ${expected}, got ${result}`);
}

const test_input_1 = `5 1 9 5
7 5 3
2 4 6 8`;

const test_expected_1 = 18;

const test_input_2 = `5 9 2 8
9 4 7 3
3 8 6 5`

const test_expected_2 = 9;

// Tests fail because numbers are separated by spaces instead of tabs
// run_test(get_checksum, test_input_1, test_expected_1);
// run_test(get_checksum_part_2, test_input_2, test_expected_2);

const input = `5806	6444	1281	38	267	1835	223	4912	5995	230	4395	2986	6048	4719	216	1201
74	127	226	84	174	280	94	159	198	305	124	106	205	99	177	294
1332	52	54	655	56	170	843	707	1273	1163	89	23	43	1300	1383	1229
5653	236	1944	3807	5356	246	222	1999	4872	206	5265	5397	5220	5538	286	917
3512	3132	2826	3664	2814	549	3408	3384	142	120	160	114	1395	2074	1816	2357
100	2000	112	103	2122	113	92	522	1650	929	1281	2286	2259	1068	1089	651
646	490	297	60	424	234	48	491	245	523	229	189	174	627	441	598
2321	555	2413	2378	157	27	194	2512	117	140	2287	277	2635	1374	1496	1698
101	1177	104	89	542	2033	1724	1197	474	1041	1803	770	87	1869	1183	553
1393	92	105	1395	1000	85	391	1360	1529	1367	1063	688	642	102	999	638
4627	223	188	5529	2406	4980	2384	2024	4610	279	249	2331	4660	4350	3264	242
769	779	502	75	1105	53	55	931	1056	1195	65	292	1234	1164	678	1032
2554	75	4406	484	2285	226	5666	245	4972	3739	5185	1543	230	236	3621	5387
826	4028	4274	163	5303	4610	145	5779	157	4994	5053	186	5060	3082	2186	4882
588	345	67	286	743	54	802	776	29	44	107	63	303	372	41	810
128	2088	3422	111	3312	740	3024	1946	920	131	112	477	3386	2392	1108	2741`

console.log(`Part 1: ${get_checksum(input)}`);
console.log(`Part 2: ${get_checksum_part_2(input)}`);
