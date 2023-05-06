const RegularExpression = require('../../src');


describe('exec logicOr', () => {
  it('ab|cd - ab', () => {
    expect(new RegularExpression('ab|cd').exec('ab')).toEqual([ 'ab' ]);
  });

  
});