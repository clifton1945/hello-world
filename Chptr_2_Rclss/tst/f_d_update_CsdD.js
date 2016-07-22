/**
 * f_set_trgt_CSDs_D::
 * 160722  @1004 -> ADDING fontSize weighting and formatting and short assert tests
 *  @ 0935 -> REFACT (1) using _n_calcWt=require.. -> _calcWt() (2) REFACTING the opacity formatter
 * IN: f_d_update_CsdD.js -> PROVIDE functions TO set all Verse CSDs as a function of their Space parameters.
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
let myTap = require('../src/h').myTap;
let my_toFixed = require('../src/h').my_toFixed;

// ---------------------- CODE UNDER TEST: f_set_trgt_CSDs_D
const f_set_trgt_CSDs_D = R.curry((lens, dfltD, propValN) => R.set(lens, propValN, dfltD));// Lens->D->Fn -> CSD

// The PROCESS of developing f_set_trgt_CSDs_D
//************ first a simple confirm fn: f_set_trgt_CSDs_D WORKS
//      USING a Property CSD: Opacity
var opacityLens = R.lensProp("opacity");// -> F:lens
var dflt_CSDs_D = {opacity: "1", fontSize: '100%'};

//SO NOW I can define a narrower s
// CODE UNDER TEST
var stub_propValN = "0.987";
var newCsdD1 = f_set_trgt_CSDs_D(opacityLens, dflt_CSDs_D)(stub_propValN);

// the Basic CONFIRMATION that f_set_trgt_CSDs_D WORKS
assert.equal(newCsdD1.opacity, 0.987, 'opacity:: 1 -> .987. NOTE: NOT Formatted TO "0987" ');

//  NOW a little more real USING _n_calcWt -> _calcWt and FORMATTING THE calcWt
const _n_calcWt = require('../src/calcWt');

//  USE these two stub spanD and famL
var spanD = {smlWt: 0.5, lrgWt: 0.9};
var famL = [0, 1, 2, 3, 4, 5, 6];
var _calcWt = _n_calcWt(spanD)(famL);

// now ADD a formatted Opacity weight
// var _opacityWter = R.compose(my_toFixed(3), myTap, _calcWt);// N:ndx -> S:wt
var _opacityWter = R.compose(my_toFixed(3), _calcWt);// N:ndx -> S:wt
assert.equal(_opacityWter(4), "0.633", '_opacityWter(4) -> "0.633"');

// And shorten / partial f_set_trgt_CSDs_D() -> _set_trgt_opacityCsdD()
const _set_trgt_opacityCsdD = ndxN => f_set_trgt_CSDs_D(opacityLens)(dflt_CSDs_D)(_opacityWter(ndxN));
assert.equal(_set_trgt_opacityCsdD(0).opacity, "0.900", ' ndx:0 EXP: opacity:"1" SET TO "0.900"');

// now ADD a formatted fontSize weight
var _fontSizeWter = R.compose(
    // myTap,
    R.flip(R.concat)('%'),
    // myTap,
    my_toFixed(0),
    R.multiply(100),
    _calcWt); // N:ndx -> S:wt
assert.equal(_fontSizeWter(4), "63%", '_fontSizeWter(4) -> "63%"');

// And shorten / partial f_set_trgt_CSDs_D() -> _set_trgt_fontSizeCsdD()
var fontSizeLens = R.lensProp("fontSize");// -> F:lens
const _set_trgt_fontSizeCsdD = ndxN => f_set_trgt_CSDs_D(fontSizeLens)(dflt_CSDs_D)(_fontSizeWter(ndxN));
assert.equal(_set_trgt_fontSizeCsdD(0).fontSize, "90%", ' ndx:0 EXP: fontSize:"1" SET TO "90%"');

// test(`IN f_d_update_CsdD.js
// 2 **** _trgt_fontSizeCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
//     {skip: false}, function (t) {
//         t.deepEquals(_trgt_fontSizeCSDs_D(0), "90%", ' ndx:0 EXP: fontSize:"100%" SET TO "90%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(6), "50%", ' ndx:6 EXP: fontSize:"100%" SET TO "50%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(4), "63%", ' ndx;4 EXP: fontSize:"100%" SET TO "63%"');
//         t.end();
//     });

//  * -----------------------  EXPORTS --------------------
//  */
// var _trgt_CSDs_D = f_set_trgt_CSDs_D;
// module.exports = {_trgt_CSDs_D, _trgt_fontSizeCSDs_D, _trgt_opacityCSDs_D};
