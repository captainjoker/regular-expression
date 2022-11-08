const RegularExpression = require('../../src');


describe('exec boundary', () => {
  it('^abcd - abcd', () => {
    expect(new RegularExpression('^abcd').exec('abcd')).toEqual([ 'abcd' ]);
  });

  it('^abcd - 2abcd', () => {
    expect(new RegularExpression('^abcd').exec('2abcd')).toEqual(null);
  });

  it('abcd$ - abcd', () => {
    expect(new RegularExpression('abcd$').exec('abcd')).toEqual([ 'abcd' ]);
  });

  it('abcd$ - abcde', () => {
    expect(new RegularExpression('abcd$').exec('abcde')).toEqual(null);
  });

  it('^abcd$ - abcd', () => {
    expect(new RegularExpression('^abcd$').exec('abcd')).toEqual([ 'abcd' ]);
  });

  it('^abcd$ - eabcd', () => {
    expect(new RegularExpression('^abcd$').exec('eabcd')).toEqual(null);
  });

  it('^ab(cd$)1 - abcd1', () => {
    expect(new RegularExpression('^ab(cd$)1').exec('abcd1')).toEqual(null);
  });

  it('word\\b - wordyes', () => {
    expect(new RegularExpression('word\\b').exec('wordyes')).toEqual(null);
  });

  it('word\\b - word', () => {
    expect(new RegularExpression('word\\b').exec('word')).toEqual([ 'word' ]);
  });

  it('word\\B - word', () => {
    expect(new RegularExpression('word\\B').exec('word')).toEqual(null);
  });

  it('word\\B - wordyes', () => {
    expect(new RegularExpression('word\\B').exec('wordyes')).toEqual([ 'word' ]);
  });

  it('\\bword - wordyes', () => {
    expect(new RegularExpression('\\bword').exec('wordyes')).toEqual([ 'word' ]);
  });

});