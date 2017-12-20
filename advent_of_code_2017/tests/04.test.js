module.exports = {
  noDuplicates: [
    {input: 'aa bb cc dd ee', expected: true},
    {input: 'aa bb cc dd aa', expected: false},
    {input: 'aa bb cc dd aaa', expected: true},
  ],

  noAnagrams: [
    {input: 'abcde fghij', expected: true},
    {input: 'abcde xyz ecdab', expected: false},
    {input: 'a ab abc abd abf abj', expected: true},
    {input: 'iiii oiii ooii oooi oooo', expected: true},
    {input: 'oiii ioii iioi iiio', expected: false},
  ],
};
