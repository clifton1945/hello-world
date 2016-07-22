/**
 * csdWters:: _opacityWter:: N:dx
 * 160722   @1600 -> weighter that need an updated _calcWt()
 * _opacityWter:: F:(*->a) -> N:ndx -> S:wt
 * _fontSizeWter:: F:(*->a) -> N:ndx -> S:wt
 *
 * IN FILE: csdWters.js
 */

// requires
var R = require('ramda');
var assert = require('assert');
var myTap = require('./h').myTap;
var my_toFixed = require('./h').my_toFixed;
var _n_calcWt = require('./calcWt')._n_calcWt; //  (D, L) -> N:ndx -> N:wt

//  USE these two stub spanD and famL
var spanD = {smlWt: 0.5, lrgWt: 0.9};
var famL = [0, 1, 2, 3, 4, 5, 6];
var _calcWt = _n_calcWt(spanD, famL);

// now ADD a formatted Opacity weight
/**
 *      _opacityWter:: F:(*->a) -> N:ndx -> S:wt
 *      formats opacity _calcWt return
 * @param f_calcWt
 * @private
 */
var _opacityWter = f_calcWt => R.compose(my_toFixed(3), f_calcWt);// Fn:calcWt -> N:ndx -> S:wt
// var _opacityWter = f_calcWt => R.compose(my_toFixed(3), f_calcWt);// N:ndx -> S:wt
// var _opacityWter = R.compose(my_toFixed(3), _calcWt);// N:ndx -> S:wt
assert.equal(_opacityWter(_calcWt)(4), "0.633", '_opacityWter(4) -> "0.633"');
// assert.equal(_opacityWter(_calcWt)(4), "0.633", '_opacityWter(4) -> "0.633"');

// now ADD a formatted fontSize weight
/**
 *      _fontSizeWter:: F:(*->a) -> N:ndx -> S:wt
 *      formats fontSize _calcWt return
 * @param f_calcWt
 * @private
 */
var _fontSizeWter = f_calcWt => R.compose(
    // myTap,
    R.flip(R.concat)('%'),
    // myTap,
    my_toFixed(0),
    R.multiply(100),
    f_calcWt); // N:ndx -> S:wt
assert.equal(_fontSizeWter(_calcWt)(4), "63%", '_fontSizeWter(4) -> "63%"');
// _opacityWter:: F:(*->a) -> N:ndx -> S:wt
// _fontSizeWter:: F:(*->a) -> N:ndx -> S:wt
module.exports = {_opacityWter, _fontSizeWter};