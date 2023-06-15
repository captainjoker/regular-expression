const RegularExpression = require('../../src');

describe('exec assertions', () => {
  it('a(?=123) - a2', () => {
    expect(new RegularExpression('a(?=123)').exec('a2')).toEqual(null);
  });

  it('a(?!123) - a2', () => {
    expect(new RegularExpression('a(?!123)').exec('a2')).toEqual([ 'a' ]);
  });

  it('a(?=123) - a123', () => {
    expect(new RegularExpression('a(?=123)').exec('a123')).toEqual([ 'a' ]);
  });

  it('a(?!123) - a123', () => {
    expect(new RegularExpression('a(?!123)').exec('a123')).toEqual(null);
  });

  
  it('a(?=123)12 - a123', () => {
    expect(new RegularExpression('a(?=123)12').exec('a123')).toEqual([ 'a12' ]);
  });

  it('a(?!123)23 - a23', () => {
    expect(new RegularExpression('a(?!123)23').exec('a23')).toEqual([ 'a23' ]);
  });

  it('ab{1,3}c(?=12{2,4}3) - abc1223', () => {
    expect(new RegularExpression('ab{1,3}c(?=12{2,4}3)').exec('abc1223')).toEqual([ 'abc' ]);
  });

  it('ab{1,3}c(?=123) - abc1223', () => {
    expect(new RegularExpression('abb{1,3}c(?=123)').exec('abc1223')).toEqual(null);
  });

  it('ab{1,3}c(?=123) - abbc1223', () => {
    expect(new RegularExpression('abb{1,3}c(?=123)').exec('abbc1223')).toEqual(null);
  });

  it('ab{1,3}c(?!123) - abbc1223', () => {
    expect(new RegularExpression('abb{1,3}c(?!123)').exec('abbc1223')).toEqual([ 'abbc' ]);
  });

  it('ab{1,3}c(?!12{1,3}3) - abbc1223', () => {
    expect(new RegularExpression('abb{1,3}c(?!12{1,3}3)').exec('abbc1223')).toEqual(null);
  });

  it('ab{1,3}c(?!12{1,3}3) - abbc122223', () => {
    expect(new RegularExpression('abb{1,3}c(?!12{1,3}3)').exec('abbc122223')).toEqual([ 'abbc' ]);
  });

  it('ab{1,3}c(?!12{3,4}3) - abbc1223', () => {
    expect(new RegularExpression('abb{1,3}c(?!12{3,4}3)').exec('abbc1223')).toEqual([ 'abbc' ]);
  });
});