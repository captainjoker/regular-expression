const generateNode = require('../src/generateNode');
const ExpNodeError = require('../src/generateNode/ExpNodeError');
const { CharsNode, GroupNode, GroupIdNode, AssertionsNode, BoundaryNode, CharSetNode, RangeCharSetNode, PresetCharSetNode, QuantifierNode, LogicOrNode } = require('../src/generateNode/expNode');


describe('generateNode CharsNode', () => {
  it('abc', () => {
    expect(generateNode('abc')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
      ],
      groupNum : 0
    });
  });
});

describe('generateNode CharsetNode', () => {
  it('abc[123]', () => {
    expect(generateNode('abc[123]')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        CharSetNode([
          CharsNode('123'),
        ])
      ],
      groupNum : 0
    });
  });

  it('abc[^123]', () => {
    expect(generateNode('abc[^123]')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        CharSetNode([
          CharsNode('123'),
        ], true)
      ],
      groupNum : 0
    });
  });

  it('abc[\\[123]', () => {
    expect(generateNode('abc[\\[123]')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        CharSetNode([
          CharsNode('[123'),
        ])
      ],
      groupNum : 0
    });
  });
});

describe('generateNode PresetNode', () => {
  it('abc\\w123', () => {
    expect(generateNode('abc\\w123')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        PresetCharSetNode('w'),
        CharsNode('123'),
      ],
      groupNum : 0
    });
  });

  it('abc.123', () => {
    expect(generateNode('abc.123')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        PresetCharSetNode('.'),
        CharsNode('123'),
      ],
      groupNum : 0
    });
  });
});

describe('generateNode RangeCharSetNode', () => {
  it('abc[1231-9a-z]', () => {
    expect(generateNode('abc[1231-9a-z]')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        CharSetNode([
          CharsNode('123'),
          RangeCharSetNode(49, 57),
          RangeCharSetNode(97, 122)
        ]),
      ],
      groupNum : 0
    });
  });

  it('abc[[a-z]', () => {
    expect(generateNode('abc[[a-z]')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        CharSetNode([
          CharsNode('['),
          RangeCharSetNode(97, 122),
        ]),
      ],
      groupNum : 0
    });
  });
  it('abc[[a-z]]-', () => {
    expect(generateNode('abc[[a-z]]-')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        CharSetNode([
          CharsNode('['),
          RangeCharSetNode(97, 122),
        ]),
        CharsNode(']-'),
      ],
      groupNum : 0
    });
  });

  it('abc[[a-z123', () => {
    expect(() => {
      generateNode('abc[[a-z123');
    }).toThrow(ExpNodeError);
  });

  it('abc[z-a]', () => {
    expect(() => {
      generateNode('abc[z-a]');
    }).toThrow(ExpNodeError);
  });
});

describe('generateNode BoundaryNode', () => {
  it('^abc$', () => {
    expect(generateNode('^abc$')).toEqual({ 
      expNodeList : [
        BoundaryNode('^'),
        CharsNode('abc'),
        BoundaryNode('$'),
      ],
      groupNum : 0
    });
  });

  it('\\babc\\B', () => {
    expect(generateNode('\\babc\\B')).toEqual({ 
      expNodeList : [
        BoundaryNode('b'),
        CharsNode('abc'),
        BoundaryNode('B'),
      ],
      groupNum : 0
    });
  });
});

describe('generateNode QuantifierNode', () => {
  it('abc{1,3}', () => {
    expect(generateNode('abc{1,3}')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(1, 3))
      ],
      groupNum : 0
    });
  });

  it('abc{1{,3}', () => {
    expect(generateNode('abc{1{,3}')).toEqual({ 
      expNodeList : [
        CharsNode('abc{'),
        CharsNode('1', QuantifierNode(0, 3)),
      ],
      groupNum : 0
    });
  });

  it('abc{1{a,3}', () => {
    expect(generateNode('abc{a,3}')).toEqual({ 
      expNodeList : [
        CharsNode('abc{a,3}'),
      ],
      groupNum : 0
    });
  });

  it('abc{1,3}f', () => {
    expect(generateNode('abc{1,3}f')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(1, 3)),
        CharsNode('f'),
      ],
      groupNum : 0
    });
  });

  it('abc{,3}', () => {
    expect(generateNode('abc{,3}')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(0, 3)),
      ],
      groupNum : 0
    });
  });

  it('abc{2}', () => {
    expect(generateNode('abc{2}')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(2, -1)),
      ],
      groupNum : 0
    });
  });

  it('abc{2,}', () => {
    expect(generateNode('abc{2,}')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(2, -1)),
        
      ],
      groupNum : 0
    });
  });

  it('abc{2,}?', () => {
    expect(generateNode('abc{2,}?')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(2, -1, true)),
      ],
      groupNum : 0
    });
  });

  it('abc?', () => {
    expect(generateNode('abc?')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(0, 1)),
        
      ],
      groupNum : 0
    });
  });

  it('abc+', () => {
    expect(generateNode('abc+')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(1)),
        
      ],
      groupNum : 0
    });
  });

  it('abc+?', () => {
    expect(generateNode('abc+?')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(1, -1, true)),
        
      ],
      groupNum : 0
    });
  });

  it('abc*?', () => {
    expect(generateNode('abc*?')).toEqual({ 
      expNodeList : [
        CharsNode('ab'),
        CharsNode('c', QuantifierNode(0, -1, true)),
        
      ],
      groupNum : 0
    });
  });

  it('(abc)*', () => {
    expect(generateNode('(abc)*')).toEqual({ 
      expNodeList : [
        GroupNode(1, true, [
          CharsNode('abc')
        ], QuantifierNode(0))
      ],
      groupNum : 1
    });
  });

  it('\\w*', () => {
    expect(generateNode('\\w*')).toEqual({ 
      expNodeList : [
        PresetCharSetNode('w', QuantifierNode(0))
      ],
      groupNum : 0
    });
  });

  it('[abc]*', () => {
    expect(generateNode('[abc]*')).toEqual({ 
      expNodeList : [
        CharSetNode([
          CharsNode('abc')
        ], false, QuantifierNode(0))
      ],
      groupNum : 0
    });
  });
  
  it('(abc)*|123', () => {
    expect(generateNode('(abc)*|123')).toEqual({ 
      expNodeList : [
        LogicOrNode(
          [ 
            GroupNode(1, true, [
              CharsNode('abc')
            ], QuantifierNode(0)) 
          ],
          [ CharsNode('123') ]
        )
       
      ],
      groupNum : 1
    });
  });

  it('(abc)*\\1+', () => {
    expect(generateNode('(abc)*\\1+')).toEqual({ 
      expNodeList : [
        GroupNode(1, true, [
          CharsNode('abc')
        ], QuantifierNode(0)),
        GroupIdNode(1, QuantifierNode(1))
      ],
      groupNum : 1
    });
  });
  
});


describe('generateNode GroupNode GroupIdNode ', () => {
  it('abc(123)(456(789))\\1\\2', () => {
    expect(generateNode('abc(123)(456(789))\\1\\2')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        GroupNode(1, true, [
          CharsNode('123')
        ]),
        GroupNode(2, true, [
          CharsNode('456'),
          GroupNode(3, true, [
            CharsNode('789')
          ]),
        ]),
        GroupIdNode(1),
        GroupIdNode(2),
      ],
      groupNum : 3
    });
  });

  it('abc(?123)', () => {
    expect(() => {
      generateNode('abc(?123)');
    }).toThrow(ExpNodeError);
  });

  it('abc(123', () => {
    expect(() => {
      generateNode('abc(123');
    }).toThrow(ExpNodeError);
  });

  it('abc(?:123)', () => {
    expect(generateNode('abc(?:123)')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        GroupNode(-1, false, [
          CharsNode('123')
        ]),
      ],
      groupNum : 0
    });
  });
});

describe('generateNode AssertionsNode', () => {
  it('abc(?=123)', () => {
    expect(generateNode('abc(?=123)')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        AssertionsNode([
          CharsNode('123')
        ])
      ],
      groupNum : 0
    });
  });

  it('abc(?=123[a-z])', () => {
    expect(generateNode('abc(?=123[a-z])')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        AssertionsNode([
          CharsNode('123'),
          CharSetNode([
            RangeCharSetNode(97, 122)
          ])
        ])
      ],
      groupNum : 0
    });
  });

  it('abc(?!123)', () => {
    expect(generateNode('abc(?!123)')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        AssertionsNode([
          CharsNode('123')
        ], true)
      ],
      groupNum : 0
    });
  });

  it('abc(?<=123)', () => {
    expect(generateNode('abc(?<=123)')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        AssertionsNode([
          CharsNode('123')
        ], false, false)
      ],
      groupNum : 0
    });
  });
  it('abc(?<!123)', () => {
    expect(generateNode('abc(?<!123)')).toEqual({ 
      expNodeList : [
        CharsNode('abc'),
        AssertionsNode([
          CharsNode('123')
        ], true, false)
      ],
      groupNum : 0
    });
  });
});


describe('generateNode LogicOrNode', () => {
  it('a|b', () => {
    expect(generateNode('a|b')).toEqual({ 
      expNodeList : [
        LogicOrNode([ CharsNode('a') ], [ CharsNode('b') ]),
      ],
      groupNum : 0
    });
  });

  it('ac|bd', () => {
    expect(generateNode('ac|bd')).toEqual({ 
      expNodeList : [
        LogicOrNode([ CharsNode('ac') ], [ CharsNode('bd') ]),
      ],
      groupNum : 0
    });
  });

  it('ac|bd|213', () => {
    expect(generateNode('ac|bd|213')).toEqual({ 
      expNodeList : [
        LogicOrNode(
          [ CharsNode('ac') ], 
          [ 
            LogicOrNode(
              [ CharsNode('bd') ], 
              [ CharsNode('213') ]
            )
          ]),
      ],
      groupNum : 0
    });
  });

  it('(ac|bd|213)', () => {
    expect(generateNode('(ac|bd|213)')).toEqual({ 
      expNodeList : [
        GroupNode(1, true, [
          LogicOrNode(
            [ CharsNode('ac') ], 
            [ 
              LogicOrNode(
                [ CharsNode('bd') ], 
                [ CharsNode('213') ]
              )
            ])
        ]),
      ],
      groupNum : 1
    });
  });

  it('(ac|b)d', () => {
    expect(generateNode('(ac|b)d')).toEqual({ 
      expNodeList : [
        GroupNode(1, true, [
          LogicOrNode([ CharsNode('ac') ], [ CharsNode('b') ]),
        ]),
        CharsNode('d')
      ],
      groupNum : 1
    });
  });

  it('e(ac|bd)f', () => {
    expect(generateNode('e(ac|bd)f')).toEqual({ 
      expNodeList : [
        CharsNode('e'),
        GroupNode(1, true, [
          LogicOrNode([ CharsNode('ac') ], [ CharsNode('bd') ]),
        ]),
        CharsNode('f')
      ],
      groupNum : 1
    });
  });

  it('e(ac{2,4}|bd[1-3])f', () => {
    expect(generateNode('e(ac{2,4}|bd[1-3])f')).toEqual({ 
      expNodeList : [
        CharsNode('e'),
        GroupNode(1, true, [
          LogicOrNode([ 
            CharsNode('a'),
            CharsNode('c', QuantifierNode(2, 4)),
          ], [ 
            CharsNode('bd'),
            CharSetNode([
              RangeCharSetNode(49, 51)
            ])
          ]),
        ]),
        CharsNode('f')
      ],
      groupNum : 1
    });
  });

  it('eac{2,4}|bd[1-3]f', () => {
    expect(generateNode('eac{2,4}|bd[1-3]f')).toEqual({ 
      expNodeList : [
        LogicOrNode([ 
          CharsNode('ea'),
          CharsNode('c', QuantifierNode(2, 4)),
          
        ], [ 
          CharsNode('bd'),
          CharSetNode([
            RangeCharSetNode(49, 51)
          ]),
          CharsNode('f'),
        ]),
      ],
      groupNum : 0
    });
  });

  it('e(ac{2,4}|b(d[1-3]|a+))f', () => {
    expect(generateNode('e(ac{2,4}|b(d[1-3]|a+))f')).toEqual({ 
      expNodeList : [
        CharsNode('e'),
        GroupNode(1, true, [
          LogicOrNode(
            [ 
              CharsNode('a'),
              CharsNode('c', QuantifierNode(2, 4)),
            ], 
            [ 
              CharsNode('b'),
              GroupNode(2, true, [
                LogicOrNode(
                  [ 
                    CharsNode('d'),
                    CharSetNode([
                      RangeCharSetNode(49, 51)
                    ])
                  ],
                  [
                    CharsNode('a', QuantifierNode(1)),
                  ]
                ),
              ]),
            ]
          ),
        ]),
        CharsNode('f')
      ],
      groupNum : 2
    });
  });
});