module.exports = {
  env : {
    browser : true,
    node : true,
    es2021 : true,
    jest : true
  },
  extends : 'eslint:recommended',
  overrides : [
  ],
  parserOptions : {
    ecmaVersion : 'latest',
    sourceType : 'module'
  },
  rules : {
    'indent' : [ 2, 2, { SwitchCase: 1 } ],
    'quotes' : [ 2, 'single', { allowTemplateLiterals: true, avoidEscape: true } ], 
    'quote-props' : [ 2, 'consistent-as-needed' ],
    'semi' : [ 2, 'always' ],
    'comma-spacing' : [ 2, { before: false, after: true } ],
    'semi-spacing' : [ 2, { before: false, after: true } ],
    'computed-property-spacing' : [ 2, 'never' ],
    'block-spacing' : [ 2, 'always' ],
    'func-call-spacing' : [ 2, 'never' ],
    'key-spacing' : [ 2, { 
      singleLine : {
        beforeColon : false,
        afterColon : true
      },
      multiLine : {
        beforeColon : true,
        afterColon : true
      }
    } ],
    'keyword-spacing' : [ 2, { before: true, after: true } ],
    'object-curly-spacing' : [ 2, 'always', { objectsInObjects: true } ],
    'array-bracket-spacing' : [ 2, 'always' ],
    'arrow-spacing' : 2,
    'rest-spread-spacing' : 2,
    'space-infix-ops' : 2,
    'space-in-parens' : 2,
    'space-unary-ops' : 2,
    'switch-colon-spacing' : 2,
  }
};
