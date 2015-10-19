
module.exports = function (config) {
  config.registerRule(Rule);
}

var Rule = function(){}

Rule.prototype = {

  getOptionName: function() {
    return 'requireImportSpaces';
  },

  configure: function(options) {
  },

  check: function(file, errors) {
    file.iterateNodesByType(['ImportDeclaration'], function(node) {
      var firstSpecTok = file.getFirstNodeToken(node.specifiers[0]);
      var openTok = file.getPrevToken(firstSpecTok);
      if (openTok.type === 'Punctuator' && openTok.value === '{') {
        errors.assert.spacesBetween({
          token: openTok,
          nextToken: firstSpecTok,
          exactly: 1,
          message: 'One space required after { in import'
        });
      } else {
        return;
      }

      var lastSpec = node.specifiers[node.specifiers.length - 1];
      var lastSpecTok = file.getLastNodeToken(lastSpec);
      var closeTok = file.getNextToken(lastSpecTok);
      errors.assert.spacesBetween({
        token: lastSpecTok,
        nextToken: closeTok,
        exactly: 1,
        message: 'One space required before } in import'
      });
    });
  },
};
