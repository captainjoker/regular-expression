const RegularExpression = require('../src');

describe('sum', () => {
  it(' 1 + 1 = 2', () => {
    expect(RegularExpression.test(1, 1)).toEqual(2);
  });
});