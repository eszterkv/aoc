module.exports = {
  suite1: [
    {input: `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`, expected: 12},
  ],

  suite2: [
    {input: `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`, expected: 'fgij'},
  ],
};
