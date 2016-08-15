/**
 * set_CSD_valu:: N_wt -> CSD_init ->_CSD_opacity(N) ->CSD_fontSize(N)  ->  CSD
 * 160815   @0932   -> test for refactored
 * IN THE END -> set_CSD_valu.js  N:wt
 */
"use strict";
//
// // requires
// var R = require('ramda');
// // var myTap = require('./h').myTap;
// var _N_Fixed_BY_N = require('./h').N_TO_N_Fixed_BY_N;
//
// /**
//  *      _lineHeightFrmttr:: N_valu -> S_valu
//  *      _lineHeightFrmttr (N_valu) -> reduces to 3/4 of the fontSize
//  *      formats lineHeight N_valu. Typically from a previous _calcWt call.
//  *      TRANSFORM [.3
//  // * @param f_calcWt
//  * @private
//  */
// const _lineHeightFrmttr = R.compose(R.flip(R.concat)('%'), _N_Fixed_BY_N(0), R.multiply(75));// N_valu -> S_valu
// /**
//  *      _opacityFrmttr:: N_valu -> S_valu
//  *      formats opacity N_valu. Typically from a previous _calcWt call.
//  // * @param f_calcWt
//  * @private
//  */
// const _opacityFrmttr = _N_Fixed_BY_N(3);// N_valu -> S_valu
// /**
//  *      _fontSizeFrmttr:: N_valu -> S_valu
//  *       formats opacity N_valu. Typically from a previous _calcWt call.
//  *       TRANSFORM: [
//  * @param f_calcWt
//  * @private
//  */
// const _fontSizeFrmttr = R.compose(R.flip(R.concat)('%'), _N_Fixed_BY_N(0), R.multiply(100)); // N_valu -> S_valu
//
// let _opacityLens = R.lensProp('opacity');//         -> Lens
// let _fontSizeLens = R.lensProp('fontSize');//       -> Lens
// // let _lineHeightLens = R.lensProp('lineHeight');//    -> Lens
//
// //              NEW BASE FUNCTIONS
// const _CSD_opacity_w_ =  N => R.set(_opacityLens, _opacityFrmttr(N));// N -> CSD -> CSD
// const _CSD_fontSize_w_ = N => R.set(_fontSizeLens, _fontSizeFrmttr(N));// N -> CSD -> CSD
// /**
//  *      ---- CSD_to_CSD_weighted_w_:: (N) -> (CSD)  ->  CSD
//  *  weights CSD.keys [opacity: and fontSize:] ADDING them to a NOT OPTIONAL D
//  *  CSD:: CSSStyleDeclaration
//  * @param N_wt
//  * @param CSD
//  * @constructor
//  */
// const CSD_to_CSD_weighted_w_ = N_wt => R.compose( _CSD_opacity_w_(N_wt), _CSD_fontSize_w_(N_wt));// N_wt->CSD -> CSD

/**
 * -----------------------  EXPORTS --------------------
 */
var _CSD_to_CSD_weighted_w_ = require('../src/set_CSD_valu')._CSD_to_CSD_weighted_w_;

//asserts
//     var CUT, RET;
var assert = require('assert');
    assert.equal(_CSD_to_CSD_weighted_w_(.6)({}).fontSize, "60%", '(N)(D) -> _CSD_to_CSD_weighted_w_.fontSize');
    assert.equal(_CSD_to_CSD_weighted_w_(.6)({}).opacity, "0.600", '(N)(D) STABLE  _CSD_to_CSD_weighted_w_.opacity');
    // EDGE || CALL tests
    assert.notEqual(_CSD_to_CSD_weighted_w_(.6, {}).opacity, "0.600", '(N,D) BREAKS _CSD_to_CSD_weighted_w_.opacity');
    assert.equal(_CSD_to_CSD_weighted_w_(.6)({tst:1234}).tst, 1234, 'ADD another CSD.key: tst. _CSD_to_CSD_weighted_w_(N)({tst:1234}');
    assert.notEqual(_CSD_to_CSD_weighted_w_(.6).fontSize, "60%", 'CALLED w/(N) BUT w/o (D)-> _CSD_to_CSD_weighted_w_.fontSize');


