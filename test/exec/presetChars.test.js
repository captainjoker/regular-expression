const RegularExpression = require('../../src');


describe('exec chars', () => {
  it('abcd\\s - abcd', () => {
    expect(new RegularExpression('abcd\\s').exec('abcd')).toEqual(null);
  });

  it('abcd\\s - abcd ', () => {
    expect(new RegularExpression('abcd\\s').exec('abcd ')).toEqual([ 'abcd ' ]);
  });

  

});