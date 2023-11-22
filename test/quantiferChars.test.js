const RegularExpression = require('../src');


describe('exec quantifer chars', () => {

  it('abc{1,3}d - abccd', () => {
    expect(new RegularExpression('abc{1,3}d').exec('abccd')).toEqual([ 'abccd' ]);
  });

  it('abc{1,3}?d - abccd', () => {
    expect(new RegularExpression('abc{1,3}?d').exec('abccd')).toEqual([ 'abccd' ]);
  });

  it('abc{1,3}? - abccd', () => {
    expect(new RegularExpression('abc{1,3}?').exec('abccd')).toEqual([ 'abc' ]);
  });

  it('abc{1,3}?d? - abccd', () => {
    expect(new RegularExpression('abc{1,3}?d?').exec('abccd')).toEqual([ 'abc' ]);
  });

  it('abc{1,3}d? - abccd', () => {
    expect(new RegularExpression('abc{1,3}d?').exec('abccd')).toEqual([ 'abccd' ]);
  });

  it('abc{1,3}d?? - abccd', () => {
    expect(new RegularExpression('abc{1,3}d??').exec('abccd')).toEqual([ 'abcc' ]);
  });

  it('abc+d - abccd', () => {
    expect(new RegularExpression('abc+d').exec('abccd')).toEqual([ 'abccd' ]);
  });

  it('abc+? - abccd', () => {
    expect(new RegularExpression('abc+?').exec('abccd')).toEqual([ 'abc' ]);
  });

  it('abc+ - abcccd', () => {
    expect(new RegularExpression('abc+').exec('abcccd')).toEqual([ 'abccc' ]);
  });

  it('abc? - abcccd', () => {
    expect(new RegularExpression('abc?').exec('abcccd')).toEqual([ 'abc' ]);
  });

  it('abc?? - abcccd', () => {
    expect(new RegularExpression('abc??').exec('abcccd')).toEqual([ 'ab' ]);
  });

  it('abc* - abd', () => {
    expect(new RegularExpression('abc*').exec('abd')).toEqual([ 'ab' ]);
  });

  it('abc* - abccccd', () => {
    expect(new RegularExpression('abc*').exec('abccccd')).toEqual([ 'abcccc' ]);
  });

  it('abc*? - abccccd', () => {
    expect(new RegularExpression('abc*?').exec('abccccd')).toEqual([ 'ab' ]);
  });

});