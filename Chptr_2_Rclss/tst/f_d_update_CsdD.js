/**
 * f_d_update_CsdD.js
 * 160720   @0725 -> STABLE: 2 **** _trgt_fontSizeCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`
 *                   STABLE: 1 **** _trgt_opacityCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`
 * 160718   @0950 -> STABLE: 1 **** USE calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`
 *      still need refact to combine         _calcWt = and  _d_trgt_CSDs_D =
 *      @1830 -> ADDED calcWt FROM f_n_calcWt-compiled.js AND
 *      test("1  ***** USING calcWt WITH .lensProp&&.over to update trgt_CSDs_D ******" IS STABLE
 * f_d_update_CsdD.js -> update all Verse default Csds as a function of Space parameters.
 */
"use strict";
let R = require('ramda');
let calcWt = require('./f_n_calcWt');//// (D, L, N) -> D
let f_d_calcWt = R.curry(calcWt); // D -> L -> N -> D
// SMALL test of Concept
var assert = require("assert");
// CODE UNDER TEST: _calcWt()//N:ndx -> N:wt
var f_calcWt = R.curry(calcWt); // (D, L, N) -> D
var d = {smlWt:0.5, lrgWt:0.9};
var l = [0, 1, 2, 3, 4, 5, 6];
var n = 3;
var _d = R.identity(d);
var _l = R.identity(l);
var _n = R.identity(n);
var _calcWt = f_calcWt( _d, _l); // (F:(*->n) -> F:(*->n) -> N
assert.equal(_calcWt(0), 0.9, 'FAILED assert _calcWt(0)');
assert.equal(_calcWt(6), 0.5, 'FAILED assert _calcWt(6)');
assert.equal(_calcWt(3), 0.7, 'FAILED assert _calcWt(3');

// ---------------------- test: UPDATE a property Csd
let test = require('tape');

// CODE UNDER TEST
let f_d_trgt_CSDs_D = R.curry((lens, dfltD, calcWtF) => R.set(lens, calcWtF, dfltD));//
var _d_trgt_CSDs_D;
// CSD constants
var dflt_CSDs_D = {opacity: "1", fontSize: '100%'};
// NOW JUST Opacity
var opacityLens = R.lensProp("opacity");// -> F:lens
var _opacityWter = R.compose(R.toString, _calcWt); // N:ndx -> S:wt
// NOW JUST fontSize
// GENERIC
var csdDict = R.identity(dflt_CSDs_D);
var csdLens = R.identity(opacityLens);
var csdWter = R.identity(_opacityWter);
_d_trgt_CSDs_D = f_d_trgt_CSDs_D(csdLens, csdDict, csdWter) ; // N:ndx -> S:csdD

//CUT:: _trgt_opacityCSDs_D
var _trgt_opacityCSDs_D = _d_trgt_CSDs_D.opacity;
test(`IN f_d_update_CsdD.js
1 **** _trgt_opacityCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
    {skip: false}, function (t) {
        t.deepEquals(_trgt_opacityCSDs_D(0), "0.9", ' ndx:0 EXP: opacity:"1" SET TO "0.9"');
        t.deepEquals(_trgt_opacityCSDs_D(6), "0.5", ' ndx:6 EXP: opacity:"1" SET TO "0.5"');
        t.deepEquals(_trgt_opacityCSDs_D(3), "0.7", ' ndx;3 EXP: opacity:"1" SET TO "0.7"');
        t.end();
    });

//CUT:: _trgt_fontSizeCSDs_D
// NOW JUST fontSize
var fontSizeLens = R.lensProp("fontSize");// -> F:lens
var _fontSizeWter = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(100), _calcWt); // N:ndx -> S:wt


// GENERICcsdDict = R.identity(dflt_CSDs_D);
csdDict = R.identity(dflt_CSDs_D);
csdLens = R.identity(fontSizeLens);
csdWter = R.identity(_fontSizeWter);
_d_trgt_CSDs_D = f_d_trgt_CSDs_D(csdLens, csdDict, csdWter) ; // N:ndx -> S:csdD
var _trgt_fontSizeCSDs_D = _d_trgt_CSDs_D.fontSize;

test(`IN f_d_update_CsdD.js
2 **** _trgt_fontSizeCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
    {skip: false}, function (t) {
        t.deepEquals(_trgt_fontSizeCSDs_D(0), "90%", ' ndx:0 EXP: fontSize:"100%" SET TO "90%"');
        t.deepEquals(_trgt_fontSizeCSDs_D(6), "50%", ' ndx:6 EXP: fontSize:"100%" SET TO "50%"');
        t.deepEquals(_trgt_fontSizeCSDs_D(3), "70%", ' ndx;3 EXP: fontSize:"100%" SET TO "70%"');
        t.end();
    });

/**
 * -----------------------  EXPORTS --------------------
 */
module.exports = {_trgt_fontSizeCSDs_D, _trgt_opacityCSDs_D};
