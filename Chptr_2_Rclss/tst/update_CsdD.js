/**
 * update_CsdD.js
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
var _n_calcWt = require('../src/calcWt')._n_calcWt; //  (D, L) -> N:ndx -> N:wt
let _opacityFrmttr = require('../src/csdFrmtters')._opacityFrmttr;//        N:ndx -> S:wt
let _fontSizeFrmttr = require('../src/csdFrmtters')._fontSizeFrmttr; //     N:ndx -> S:wt

//  NEED TO SET _calcWt:: N:ndx -> N:wt  BY PARTIAL INVOKING the 2 of 3 params: current spanDict and family List ON required _n_calcWt.
var spanD = {smlWt: 0.5, lrgWt: 0.9}; //        -> D
var famL = [0, 1, 2, 3, 4, 5, 6]; //            ->L
var _calcWt = _n_calcWt(spanD)(famL);// N:ndx   -> N:wt

// THEN WITH the partial  _calcWt, PARTIAL the format Transforms:: N:dx -> S:wt  FOR 2 properties:; opacity and fontSizeWters.
var _opacityWt =R.compose(_opacityFrmttr, _calcWt); //         N:ndx -> S:wt
var _fontSizeWt = R.compose(_fontSizeFrmttr, _calcWt);//        N:ndx -> S:wt
        // two asserts
        assert.equal(_opacityWt(4), "0.633", '_opacityWter(4) -> "0.633"');
        assert.equal(_fontSizeWt(4), "63%", '_fontSizeWter(4) -> "63%"');

var initCsdD = {opacity: '1.00', fontSize: "100%"};
// NOW PARTIAL 2/3 R.set function's:;
var opacityLens = R.lensProp('opacity');
const _set_trgt_opacityCsdD = ndxN => R.set(opacityLens,_opacityWt(ndxN), initCsdD);
var RET = _set_trgt_opacityCsdD(0).opacity;
assert.equal(RET, "0.900", ' ndx:0 EXP: opacity:"1" SET TO "0.900"');

var fontSizeLens = R.lensProp("fontSize");// -> F:lens

const _set_trgt_fontSizeCsdD = ndxN => R.set(fontSizeLens, _fontSizeWt(ndxN), initCsdD);
RET = _set_trgt_fontSizeCsdD(0).fontSize;
assert.equal(RET, "90%", ' ndx:0 EXP: fontSize:"1" SET TO "90%"');

const _set_trgt_Csd_ = R.curry(
    function _set_trgt_Csd_ (propNameS, ndxN) {
        return R.set(R.lensProp(propNameS), _opacityWt(ndxN), R.__); //FIX:  propNameS MUST ALSO SET WHICH ...Wt
    });// D:inCSD -> D:outCsd
RET = _set_trgt_Csd_('opacity', 6)(initCsdD);
assert.equal(RET.opacity, "0.500", "_set_trgt_Csd_('opacity', 6, initCsdD) -> '0.500' ");


test(`IN f_d_update_CsdD.js
2 **** _trgt_fontSizeCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
    {skip: false}, function (t) {
        t.deepEquals(_set_trgt_Csd_('fontSize', 0)(), "90%", ' ndx:0 EXP: fontSize:"100%" SET TO "90%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(6), "50%", ' ndx:6 EXP: fontSize:"100%" SET TO "50%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(4), "63%", ' ndx;4 EXP: fontSize:"100%" SET TO "63%"');
        t.end();
    });

//  * -----------------------  EXPORTS --------------------
//  */
// var _trgt_CSDs_D = f_set_trgt_CSDs_D;
// module.exports = { _set_trgt_fontSizeCsdD, _set_trgt_opacityCsdD};
