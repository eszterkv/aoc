module.exports = {
  parse: input => input.trim().split(/\n/),
  sum: arr => arr.reduce((acc, num) => acc + num, 0),
}
