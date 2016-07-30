/**
 * _CSD_values_set  HAS _a_CSD_valu_opacity() AND _a_CSD_valu_fontSize()
 * 160730   @1416   -> STABLE &&  RENAMED brought CSDfRMTTERS.JS into THIS
 *      @1350 STABLE revamped as composition given N_valu from _calc_N_valu()
 *      @1330  WIP. revamp as composition given N_valu from _calc_N_valu()
 *  the process pipe: for a CSD_S_name
 *      N_valu -> _frmt_CSD_op(S_name_frmttr) -> S_valu -> _set_CSD_valu(S_nameLens, {}) -> CSD_valu
 * 160723   @1715 -> STABLE  module.exports = { _a_CSD_valu_opacity, _a_CSD_valu_fontSize}
 * IN THE END -> _CSD_values_set.js produces Fn:: N:wt -> D:inCsd -> D:outCsd
 */
"use strict";

// requires
var R = require('ramda');
var assert = require('assert');
// var myTap = require('./h').myTap;
var my_toFixed = require('./h').my_toFixed;

/**
 *      _opacityFrmttr:: N:wt -> S:wt
 *      formats opacity N:wt. Typically from a previous _calcWt call.
 // * @param f_calcWt
 * @private
 */
const _opacityFrmttr = my_toFixed(3);// N:wt -> S:wt
/**
 *      _fontSizeFrmttr:: N:wt -> S:wt
 *       formats opacity N:wt. Typically from a previous _calcWt call.
 * @param f_calcWt
 * @private
 */
const _fontSizeFrmttr = R.compose(R.flip(R.concat)('%'), my_toFixed(0), R.multiply(100)); // N:wt -> S:wt
let _opacityLens = R.lensProp('opacity');//         -> Lens
let _fontSizeLens = R.lensProp('fontSize');//       -> Lens
//  TEST DATA
var stub_N_ndx = 0;
var stub_L_fam = [0, 1, 2, 3, 4, 5, 6];

// BASE && HELPER FUNCTIONS
const set_CSD_opacityValu = R.set(_opacityLens, R.__, {});// S_valu -> CSD_valu
const set_CSD_fontSizeValu = R.set(_fontSizeLens, R.__, {});// S_valu -> CSD_valu

/**
 * -----------------------  EXPORTS --------------------
 */
const _a_CSD_valu_opacity = R.compose(set_CSD_opacityValu, _opacityFrmttr);//    N:wt -> D:inD -> D:outD
const _a_CSD_valu_fontSize = R.compose(set_CSD_fontSizeValu, _fontSizeFrmttr);//    N:wt -> D:inD -> D:outD
module.exports = {_a_CSD_valu_opacity, _a_CSD_valu_fontSize};

//asserts
assert.equal(_a_CSD_valu_opacity(.6).opacity, "0.600", '_a_CSD_valu_opacity');
assert.equal(_a_CSD_valu_fontSize(.6).fontSize, "60%", '_a_CSD_valu_fontSize');

