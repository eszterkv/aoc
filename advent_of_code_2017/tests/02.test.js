module.exports = {
  suite1: [
    {input: `5 1 9 5
7 5 3
2 4 6 8`.replace(/( )/g, '\t'), expected: 18},
  ],

  suite2: [
    {input: `5 9 2 8
9 4 7 3
3 8 6 5`.replace(/()/g, '\t'), expected: 9},
  ],
};
