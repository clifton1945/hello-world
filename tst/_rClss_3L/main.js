/**
 *  * tst/_rClss_3L/main.js
 * 160701  develop getting L:[] -> L[L:pst], [L:cur], [L:pst]]
 *  @10:55  trying to test main but do not know how to apply test to main
 *  @1016 Std setup and first commit
 */

var R = require('ramda');
var test = require('./rClssTester');

module.exports = function _curSpan (dict) { return dict.end - dict.beg};
