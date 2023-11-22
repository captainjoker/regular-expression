const RegularExpression = require('../src');

describe('exec rangeCharSet', () => {
  it('abc[a-z] - abcd', () => {
    expect(new RegularExpression('abc[a-z]').exec('abcd')).toEqual([ 'abcd' ]);
  });

  it('abc[[a-z] - abc[d', () => {
    expect(new RegularExpression('abc[[a-z]').exec('abc[d')).toEqual([ 'abc[' ]);
  });

  it('abc[1231-9a-z] - abc2', () => {
    expect(new RegularExpression('abc[1231-9a-z]').exec('abc2')).toEqual([ 'abc2' ]);
  });

  it('abc[1231-9a-z] - abcf', () => {
    expect(new RegularExpression('abc[1231-9a-z]').exec('abcf')).toEqual([ 'abcf' ]);
  });

  it('abc[a-d] - abcf', () => {
    expect(new RegularExpression('abc[a-d]').exec('abcf')).toEqual(null);
  });

  it('abc[a-d]{1,4} - abca', () => {
    expect(new RegularExpression('abc[a-d]{1,4}').exec('abca')).toEqual([ 'abca' ]);
  });

  it('abc[a-d]{1,4} - abcbc', () => {
    expect(new RegularExpression('abc[a-d]{1,4}').exec('abcbc')).toEqual([ 'abcbc' ]);
  });

  it('abc[a-d]{1,4} - abcbcbcbc', () => {
    expect(new RegularExpression('abc[a-d]{1,4}').exec('abcbcbcbc')).toEqual([ 'abcbcbc' ]);
  });

  it('abc[a-d]{1,4} - abc', () => {
    expect(new RegularExpression('abc[a-d]{1,4}').exec('abc')).toEqual(null);
  });
});