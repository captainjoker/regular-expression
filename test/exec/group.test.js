const RegularExpression = require('../../src');


describe('exec', () => {

  it('a(b)c{1,3}c -> abcccc', () => {
    expect(new RegularExpression('a(b)c{1,3}c').exec('abcccc')).toEqual([ 'abcccc', 'b' ]);
  });

  it('a(b)(c)c -> abcccc', () => {
    expect(new RegularExpression('a(b)(c)c').exec('abcccc')).toEqual([ 'abcc', 'b', 'c' ]);
  });

  it('d((a)(b))f -> dabf', () => {
    expect(new RegularExpression('d((a)(b))f').exec('dabf')).toEqual([ 'dabf', 'ab', 'a', 'b' ]);
  });

  it('d((a)(b){1,3})f -> dabbfcd', () => {
    expect(new RegularExpression('d((a)(b){1,3})f').exec('dabbfcd')).toEqual([ 'dabbf', 'abb', 'a', 'b' ]);
  });

  it('d((a)(b){1,3})f -> dabbccd', () => {
    expect(new RegularExpression('d((a)(b){1,3})f').exec('dabbccd')).toEqual(null);
  });

  it('d((a)(b){1,3})f -> dabfbbccd', () => {
    expect(new RegularExpression('d((a)(b){1,3}?)f').exec('dabfbbccd')).toEqual([ 'dabf', 'ab', 'a', 'b' ]);
  });

  it('d((a)(b){1,3})f -> efdabbfcd', () => {
    expect(new RegularExpression('d((a)(b){1,3})f').exec('efdabbfcd')).toEqual([ 'dabbf', 'abb', 'a', 'b' ]);
  });

  it('d((a)(b){1,3})f -> dabbbbfcd', () => {
    expect(new RegularExpression('d((a)(b){1,3})f').exec('dabbbbfcd')).toEqual(null);
  });

  it('d((?:a)(b){1,3})f -> efdabbfcd', () => {
    expect(new RegularExpression('d((?:a)(b){1,3})f').exec('efdabbfcd')).toEqual([ 'dabbf', 'abb', 'b' ]);
  });

  it('d((?:a)(b){1,3}){1,2}f -> efdabbfcd', () => {
    expect(new RegularExpression('d((?:a)(b){1,3}){1,2}f').exec('efdabbabbfcd')).toEqual([ 'dabbabbf', 'abb', 'b' ]);
  });

  it('d((a)(b){1,3})\\2f -> dabbbafcd', () => {
    expect(new RegularExpression('d((a)(b){1,3})\\2f').exec('dabbbafcd')).toEqual([ 'dabbbaf', 'abbb', 'a', 'b' ]);
  });

  it('d((a)(b){1,3})\\1f -> dabbbabbbfcd', () => {
    expect(new RegularExpression('d((a)(b){1,3})\\1f').exec('dabbbabbbfcd')).toEqual([ 'dabbbabbbf', 'abbb', 'a', 'b' ]);
  });

  it('d\\2((a)(b){1,3})f -> dabbbfcd', () => {
    expect(new RegularExpression('d\\2((a)(b){1,3})f').exec('dabbbfcd')).toEqual([ 'dabbbf', 'abbb', 'a', 'b' ]);
  });

});