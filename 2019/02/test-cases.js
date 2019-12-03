module.exports = {
  suite1: [
    {
      input: `1,9,10,3,2,3,11,0,99,30,40,50`,
      expected: 3500,
    }, {
      input: `1,0,0,0,99`,
      expected: 2,
    }, {
      input: `2,3,0,3,99`,
      expected: 2,
    }, {
      input: `1,1,1,4,99,5,6,0,99`,
      expected: 30,
    },
  ],

  suite2: [
    {
      input: ``,
      expected: undefined,
    },
  ],
};
