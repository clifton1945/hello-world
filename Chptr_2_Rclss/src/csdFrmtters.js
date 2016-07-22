/**
 * csdFrmttrs::
 * 160722   @1805 -> REMOVED _calcWt. This exports just the Formatters; NAME CHANGED from  csdWters.js
 * @1600 -> weighter that need an updated _calcWt()
 * _opacityFrmttr::     N:ndx -> S:wt
 * _fontSizeFrmttr::    N:ndx -> S:wt
 *
 * IN FILE: csdFrmttrs.js
 */
// requires
var R = require('ramda');
var assert = require('assert');
var myTap = require('./h').myTap;
var my_toFixed = require('./h').my_toFixed;

/**
 *      _opacityFrmttr:: N:ndx -> S:wt
 *      formats opacity _calcWt return
 * @param f_calcWt
 * @private
 */
var _opacityFrmttr =  my_toFixed(3);// N:ndx -> S:wt
/**
 *      _fontSizeFrmttr:: N:ndx -> S:wt
 *      formats fontSize _calcWt return
 * @param f_calcWt
 * @private
 */
var _fontSizeFrmttr = R.compose(
    // myTap,
    R.flip(R.concat)('%'),
    // myTap,
    my_toFixed(0),
    R.multiply(100)
); // N:ndx -> S:wt

assert.equal(_opacityFrmttr(0.6334), "0.633", '_opacityFrmttr(0.6334) -> "0.633"');
assert.equal(_fontSizeFrmttr(0.6334), "63%", '_fontSizeFrmttr(0.6334) -> "63%"');

// module.exports
module.exports = {_opacityFrmttr, _fontSizeFrmttr};