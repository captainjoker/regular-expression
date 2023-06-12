const RegularExpression = require('../../src');


describe('exec logicOr', () => {
  it('ab|cd - ab', () => {
    expect(new RegularExpression('ab|cd').exec('ab')).toEqual([ 'ab' ]);
  });

  it('ab|cd - cd', () => {
    expect(new RegularExpression('ab|cd').exec('cd')).toEqual([ 'cd' ]);
  });

  it('(ab|cd)123 - cd123', () => {
    expect(new RegularExpression('(ab|cd)123').exec('cd123')).toEqual([ 'cd123', 'cd' ]);
  });

  it('(ab|c1d)123 - cd123', () => {
    expect(new RegularExpression('(ab|c1d)123').exec('cd123')).toEqual(null);
  });

  it('(ab|c(ef)d)123 - cefd123', () => {
    expect(new RegularExpression('(ab|c(ef)d)123').exec('cefd123')).toEqual([ 'cefd123', 'cefd', 'ef' ]);
  });

  it('23(ab|cd)123 - 23cd123', () => {
    expect(new RegularExpression('23(ab|cd)123').exec('23cd123')).toEqual([ '23cd123', 'cd' ]);
  });

  it('23(?:ab|cd)123 - 23cd123', () => {
    expect(new RegularExpression('23(?:ab|cd)123').exec('23cd123')).toEqual([ '23cd123' ]);
  });

  it('ab|cd - c1d', () => {
    expect(new RegularExpression('ab|cd').exec('c1d')).toEqual(null);
  });
  
});