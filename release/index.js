'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports['default'] = assertAhead;

var _Promise = require('bluebird');

var _Promise2 = _interopRequireDefault(_Promise);

var _git = require('git-child');

var _git2 = _interopRequireDefault(_git);

'use strict';

function assertAhead(branch) {
  return _Promise2['default'].resolve(branch || _git2['default'].revParse({
    abbrevRef: true,
    _: 'HEAD'
  })).call('trim').then(function (b) {
    branch = b;
    return _git2['default'].revList({
      _: '' + branch + '..origin/' + branch,
      count: true
    }).call('trim').then(parseInt);
  }).then(function (count) {
    if (count) throw new Error('origin/' + branch + ' is ahead of local branch');
  });
}

module.exports = exports['default'];