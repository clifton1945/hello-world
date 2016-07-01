/**
 * crntLimits.js (D:rClss:cur limits:beg, end) -> ()-> {}
 * 160701
 *  @1442 partial conversion to ramda
 */
var R = require('ramda');
module.exports = {
    _curBeg: R.prop('beg'), // D -> {D -> N}
    _crntEnd: R.prop('end'), // D -> {D -> N}
    _curSpan: dict => dict.end - dict.beg
};