const RegularExpression = require('../src');


describe('exec chars', () => {
  it('abcd\\s - abcd', () => {
    expect(new RegularExpression('abcd\\s').exec('abcd')).toEqual(null);
  });

  it('abcd\\s - abcd ', () => {
    expect(new RegularExpression('abcd\\s').exec('abcd ')).toEqual([ 'abcd ' ]);
  });
  
  it('abcd\\s - abcdx', () => {
    expect(new RegularExpression('abcd\\s').exec('abcdx')).toEqual(null);
  });

  it('abcd\\s - abcd x', () => {
    expect(new RegularExpression('abcd\\s').exec('abcd x')).toEqual([ 'abcd ' ]);
  });

  it('abcd\\S - abcd', () => {
    expect(new RegularExpression('abcd\\S').exec('abcd')).toEqual(null);
  });

  it('abcd\\S - abcd ', () => {
    expect(new RegularExpression('abcd\\S').exec('abcd ')).toEqual(null);
  });
  
  it('abcd\\S - abcdx', () => {
    expect(new RegularExpression('abcd\\S').exec('abcdx')).toEqual([ 'abcdx' ]);
  });

  it('abcd\\S - abcd x', () => {
    expect(new RegularExpression('abcd\\S').exec('abcd x')).toEqual(null);
  });

  it('abcd\\n - abcd\n', () => {
    expect(new RegularExpression('abcd\\n').exec('abcd\n')).toEqual([ 'abcd\n' ]);
  });

  it('abcd\\n - abcd\nx', () => {
    expect(new RegularExpression('abcd\\n').exec('abcd\nx')).toEqual([ 'abcd\n' ]);
  });

  it('abcd\\n - abcd', () => {
    expect(new RegularExpression('abcd\\n').exec('abcd')).toEqual(null);
  });

  it('abcd\\n - abcdx', () => {
    expect(new RegularExpression('abcd\\n').exec('abcdx')).toEqual(null);
  });

  it('abcd\\r - abcd\r', () => {
    expect(new RegularExpression('abcd\\r').exec('abcd\r')).toEqual([ 'abcd\r' ]);
  });

  it('abcd\\r - abcd\rx', () => {
    expect(new RegularExpression('abcd\\r').exec('abcd\rx')).toEqual([ 'abcd\r' ]);
  });

  it('abcd\\r - abcd', () => {
    expect(new RegularExpression('abcd\\r').exec('abcd')).toEqual(null);
  });

  it('abcd\\r - abcdx', () => {
    expect(new RegularExpression('abcd\\r').exec('abcdx')).toEqual(null);
  });

  it('abcd\\t - abcd\t', () => {
    expect(new RegularExpression('abcd\\t').exec('abcd\t')).toEqual([ 'abcd\t' ]);
  });

  it('abcd\\t - abcd\tx', () => {
    expect(new RegularExpression('abcd\\t').exec('abcd\tx')).toEqual([ 'abcd\t' ]);
  });

  it('abcd\\t - abcd', () => {
    expect(new RegularExpression('abcd\\t').exec('abcd')).toEqual(null);
  });

  it('abcd\\t - abcdx', () => {
    expect(new RegularExpression('abcd\\t').exec('abcdx')).toEqual(null);
  });

  it('abcd\\w - abcd1', () => {
    expect(new RegularExpression('abcd\\w').exec('abcd1')).toEqual([ 'abcd1' ]);
  });

  it('abcd\\w - abcda', () => {
    expect(new RegularExpression('abcd\\w').exec('abcda')).toEqual([ 'abcda' ]);
  });

  it('abcd\\w - abcd ', () => {
    expect(new RegularExpression('abcd\\w').exec('abcd ')).toEqual(null);
  });

  it('abcd\\w - abcd-', () => {
    expect(new RegularExpression('abcd\\w').exec('abcd-')).toEqual(null);
  });

  it('abcd\\W - abcd1', () => {
    expect(new RegularExpression('abcd\\W').exec('abcd1')).toEqual(null);
  });

  it('abcd\\W - abcda', () => {
    expect(new RegularExpression('abcd\\W').exec('abcda')).toEqual(null);
  });

  it('abcd\\W - abcd ', () => {
    expect(new RegularExpression('abcd\\W').exec('abcd ')).toEqual([ 'abcd ' ]);
  });

  it('abcd\\W - abcd-', () => {
    expect(new RegularExpression('abcd\\W').exec('abcd-')).toEqual([ 'abcd-' ]);
  });

  it('abcd\\d - abcd1', () => {
    expect(new RegularExpression('abcd\\d').exec('abcd1')).toEqual([ 'abcd1' ]);
  });

  it('abcd\\d - abcda', () => {
    expect(new RegularExpression('abcd\\d').exec('abcda')).toEqual(null);
  });

  it('abcd\\d - abcd ', () => {
    expect(new RegularExpression('abcd\\d').exec('abcd ')).toEqual(null);
  });

  it('abcd\\d - abcd-', () => {
    expect(new RegularExpression('abcd\\d').exec('abcd-')).toEqual(null);
  });

  it('abcd\\D - abcd1', () => {
    expect(new RegularExpression('abcd\\D').exec('abcd1')).toEqual(null);
  });

  it('abcd\\D - abcda', () => {
    expect(new RegularExpression('abcd\\D').exec('abcda')).toEqual([ 'abcda' ]);
  });

  it('abcd\\D - abcd ', () => {
    expect(new RegularExpression('abcd\\D').exec('abcd ')).toEqual([ 'abcd ' ]);
  });

  it('abcd\\D - abcd-', () => {
    expect(new RegularExpression('abcd\\D').exec('abcd-')).toEqual([ 'abcd-' ]);
  });

});