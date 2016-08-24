/**
 *  f_set_SPAN_Style:: weights opacity && fontSize CSD using Rclss Constants: D_wtRange && family List length
 *  160822  @2100 -> STABLE w/ minimum test after major REFACT
 *      @0900   -> REFACT this to
 *  (1) use the new set_a_weightedSPAN_CSD in main &&
 *  (2) FIGURE OUT AND SIMPLIFY THE CODE
 *  160819  @1900 -> exports a new Fn: set_SPAN_Style() which need REFACT
 *  IN FILE: set_anElement_Style.js -> SET each Verse CSD as a function of their Space parameters
 */
"use strict";
// requires
var R = require('ramda');
var h = require('./h');
var tapThis = h.myTap;
// ----------------- HELPERS -----------------------
// set_wtN(D_csdLmts -> N_famLen -> N_elemNdx  ->   N_wt
var set_wtN = R.curry(require('./set_N_wt').set_wtN);// D -> N -> N  ->  N

// set_weighted_CSD::  CSD -> N_wt  ->  CSD
var set_weighted_CSD = R.curry(require('./set_weightedSPAN_CSD').set_weighted_CSD);// CSD -> N_wt  ->  CSD

// set_aSpan_Style (SPAN, CSD)  ->  SPAN
var set_aSpan_Style = h.Elm_TO_Elm_style_BY_CSD;

// begin
console.log("IN  set_anElem_Style.js.");

const f_set_SPAN_Style = (d_wtRng, n_fmly)=> {// (D, N) -> Fn:( E, N, L ) -> E
    return function ndxN_to_SPAN_by_ndx (e_e, n_ndx, l_fam)
    {// Fn::(e_e -> n_ndx)  -> e_e
        return R.compose(
            set_aSpan_Style(e_e), // (SPAN) -> CSD -> SPAN
            // tapThis, // it is a function wanting a CSD
            set_weighted_CSD({}), //  CSD -> N_wt  ->  CSD TODO ADD a static CSD parameter
            // tapThis,
            set_wtN(d_wtRng, n_fmly) // N -> N
        )(n_ndx);// which by now has been mutated with a new CSD
    };
};
/**
 *      ---------------- exports: set_SPAN_Style:: (D, N) -> Fn:( (E, N, L) -> E))
 */
exports.set_SPAN_Style = R.curry(f_set_SPAN_Style);

// OK a few tests
var RET, CUT = R.curry(f_set_SPAN_Style);

// TEST CONSTANTS
var csdLimitsD = {endWt:0.4, begWt:0.90};
var stubList = [0,1,2,3,4,6];
var assert = require('assert');
// confirm functions valances
assert.ok(CUT instanceof Function, `set_SPAN_Style -> IS a Function.`);
assert.equal(CUT.length, 2, `set_SPAN_Style.length==2`);
assert.ok(CUT(csdLimitsD, stubList.length) instanceof Function, `set_SPAN_Style(D,N) -> IS a Function.`);
assert.equal(CUT(csdLimitsD, stubList.length).length, 3, `set_SPAN_Style(csdLimitsD, stubList.length).length==3`);
// confirm N_ndx -> N_wt
var callback = CUT(csdLimitsD, stubList.length);
var elem = {style: 'nothing'};
var n_ndx = 2;
var l_fam = [];
RET = callback(elem, n_ndx, l_fam);
assert.equal(RET.fontSize, '70%', `${RET} is NOT '70%'??`);

console.log("OUT set_anElem_Style.js.");