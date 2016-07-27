/**
 * update_CsdD.js
 * 160723  @0830 -> _set_trgt_Csds:: Fn:(* -> N:wt) -> N:ndx -> D:inCsd -> D:outCSD WORKS!
 *  @0715 ->  trying Unsuccessfully to ADD f_calcWt parameter
 *  @0648 _set_trgt_Csds::
 * 160722  @1910 introducing universal fn:  const _set_trgt_Csd_ BUT it needs to be FIXED
 *  @1544 -> RENAMED
 *   _opacityWter :: Fn:calcWt -> N:ndx -> S:wt
 *   _fontSizeWter :: Fn:calcWt -> N:ndx -> S:wt
 *  @1004 -> ADDING fontSize weighting and formatting and short assert tests
 *  @ 0935 -> REFACT (1) using _n_calcWt=require.. -> _calcWt() (2) REFACTING the opacity formatter
 * IN: _update_CsdD.js -> PROVIDE functions TO set each Verse CSD as a function of its Space/Context.
 *  IN THE END Two parameters - thisElem.ndx and thisPropName - mutate the
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
// let myTap = require('../src/h').myTap;
var _n_calcWt = require('./calcWt')._n_calcWt; //  (D, L) -> N:ndx -> N:wt
let _opacityFrmttr = require('./csdFrmtters')._opacityFrmttr;//        N:ndx -> S:wt
let _fontSizeFrmttr = require('./csdFrmtters')._fontSizeFrmttr; //     N:ndx -> S:wt

//  NEED TO PARTIAL _n_calcWt(spanD)(famL) -> _calcWt:: N:ndx -> N:wt  BY INVOKING the 2 of 3 params: current spanDict and family List ON required _n_calcWt.
var spanD = {smlWt: 0.5, lrgWt: 0.9}; //        -> D
var famL = [0, 1, 2, 3, 4, 5, 6]; //            ->L
var _calcWt = _n_calcWt(spanD)(famL);// N:ndx   -> N:wt
// an initial CsdD
var stub ={};

// NOW PARTIAL 2/3 R.set function's:;
/**
 *      _set_trgt_opacityCsdD:: F:(*-> N) -> N:ndx -> D:inCsd -> D:outCsd
 * @private
 * @param f_calcWt
 * @param ndxN
 */
const _set_trgt_opacityCsdD =  R.curry(function (f_calcWt, ndxN, csdD) {
    return R.set(R.lensProp('opacity'), R.compose(_opacityFrmttr, f_calcWt)(ndxN), csdD)
});
// /**
//  *      _trgt_opacity:: N:ndx -> D:inCsd -> D:outCsd
//  */
// const _trgt_opacity = _set_trgt_opacityCsdD(_calcWt);
// // asserts
    assert.equal(_set_trgt_opacityCsdD(_calcWt, 0)(stub).opacity, "0.900", ' ndx:0 EXP: opacity:"()" SET TO "0.900"');
// assert.equal(_trgt_opacity(0)(stub).opacity, "0.900", ' ndx:0 EXP: opacity:"()" SET TO "0.900"');
/**
 *      _set_trgt_fontSizeCsdD::  F:(*-> N) -> N:ndx -> D:inCsd -> D:outCsd
 * @param ndxN
 * @private
 */
const _set_trgt_fontSizeCsdD = R.curry(function(f_calcWt, ndxN, csdD) {
    return R.set(R.lensProp("fontSize"), R.compose(_fontSizeFrmttr, f_calcWt)(ndxN), csdD)
}); // F -> N -> D
// /**
//  *      _trgt_fontSize:: N:ndx -> D:inCsd -> D:outCsd
//  */
// const _trgt_fontSize = _set_trgt_fontSizeCsdD(_calcWt);
//asserts
// assert.equal(_trgt_fontSize(0, {}).fontSize, "90%", ' ndx:0 EXP: fontSize:"{}" SET TO "90%"');

// NOW CHAIN THE TWO:  _set_trgt_fontSizeCsdD, _set_trgt_opacityCsdD
/**
 *      _set_trgt_Csds:: Fn:(* -> N:wt) -> N:ndx -> D:inCsd -> D:outCSD
 *      USES: _trgt_Csds = _set_trgt_Csds(_calcWt) WHERE _calcWt IS a PARTIAL just needing N:ndx -> D:csd -> N:wt
 * @param f_wter
 * @param ndxN
 * @private
 */
const _set_trgt_Csds =  R.curry(function (f_wter, ndxN) {
    return R.compose(_set_trgt_fontSizeCsdD(f_wter)(ndxN), _set_trgt_opacityCsdD(f_wter)(ndxN));
});
/**
 *      _trgt_Csds:: N:ndx -> D:inCsd -> D:outCsd
 *      USES: this weights the two csd properties: fontSize and opacity.
 *      the _calcWt(N) IS REQUIRED to be arity 1, NOT the full f_n_calcWt arity 3: (D, N, L)
 */
const _trgt_Csds = _set_trgt_Csds(_calcWt);// N:ndx -> D:inCsd -> D:outCsd

// asserts
let trgt_Csds = _trgt_Csds(6)({backgroundColor: 'lightGreen'});
assert.equal(trgt_Csds.fontSize, "50%", ' _set_trgt_Csds.fontSize -> "50%"');
assert.equal(trgt_Csds.opacity, "0.500", "_set_trgt_Csds.opacity -> '0.500' ");
assert.equal(trgt_Csds.backgroundColor, 'lightGreen', "_set_trgt_Csds.backgroundColor -> 'lightGreen' ");

// test(`IN f_d_update_CsdD.js
// 2 **** _trgt_fontSizeCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
//     {skip: false}, function (t) {
//         t.deepEquals(_set_trgt_CsdsCsd_('fontSize', 0)(), "90%", ' ndx:0 EXP: fontSize:"100%" SET TO "90%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(6), "50%", ' ndx:6 EXP: fontSize:"100%" SET TO "50%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(4), "63%", ' ndx;4 EXP: fontSize:"100%" SET TO "63%"');
//         t.end();
//     });

 /**
  * -----------------------  EXPORTS --------------------
 */
module.exports = { _set_trgt_Csds};//
