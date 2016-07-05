/**
 * crntLimits.js (D:rClss:cur limits:beg, end) -> ()-> {}
 *  160705
 *  @0830 MOVED file FROM root  TO \tst\
 * 160701
 *  @1442 partial conversion to ramda
 */
var R = require('ramda');

module.exports = {
    _beg: R.prop('beg'), // D -> {D -> N}
    _end: R.prop('end'), // D -> {D -> N}
    _span: dict => dict.end - dict.beg
};