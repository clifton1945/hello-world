/**
 * csdFrmttrs::
 * 160728   @0617 -> refact parameter Name: TO wt FROM ndx.
 *      Reflecting the next REFACT in update_CsdD.js: REMOVING dependence on passing _calcWt; just use a Wt,
 * 160722   @1805 -> REMOVED _calcWt. This exports just the Formatters; NAME CHANGED from  csdWters.js
 * @1600 -> weighter that need an updated _calcWt()
 * _opacityFrmttr::     N:wt -> S:wt
 * _fontSizeFrmttr::    N:wt -> S:wt
 *
 * IN FILE: csdFrmttrs.js
 */
// requires
var R = require('ramda');
var assert = require('assert');
var myTap = require('./h').myTap;
var my_toFixed = require('./h').my_toFixed;

/**
 *      _opacityFrmttr:: N:wt -> S:wt
 *      formats opacity N:wt. Typically from a previous _calcWt call.
 // * @param f_calcWt
 * @private
 */
var _opacityFrmttr =  my_toFixed(3);// N:wt -> S:wt
/**
 *      _fontSizeFrmttr:: N:wt -> S:wt
 *       formats opacity N:wt. Typically from a previous _calcWt call.
 * @param f_calcWt
 * @private
 */
var _fontSizeFrmttr = R.compose(
    // myTap,
    R.flip(R.concat)('%'),
    // myTap,
    my_toFixed(0),
    R.multiply(100)
); // N:wt -> S:wt

assert.equal(_opacityFrmttr(0.6334), "0.633", '_opacityFrmttr(0.6334) -> "0.633"');
assert.equal(_fontSizeFrmttr(0.6334), "63%", '_fontSizeFrmttr(0.6334) -> "63%"');

// module.exports
module.exports = {_opacityFrmttr, _fontSizeFrmttr};