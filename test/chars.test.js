const RegularExpression = require('../src');


describe('exec chars', () => {
  it('abcd - abccd', () => {
    expect(new RegularExpression('abcd').exec('abccd')).toEqual(null);
  });

  it('abcd - abcdfg', () => {
    expect(new RegularExpression('abcd').exec('abcdfg')).toEqual([ 'abcd' ]);
  });

  it('abcd - dfgabcdfg', () => {
    expect(new RegularExpression('abcd').exec('dfgabcdfg')).toEqual([ 'abcd' ]);
  });

  it('dfgabcdfg - dfgabcd', () => {
    expect(new RegularExpression('dfgabcdfg').exec('dfgabcd')).toEqual(null);
  });

});