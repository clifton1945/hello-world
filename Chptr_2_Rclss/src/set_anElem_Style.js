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
// set_wtN(D_csdLmts -> N_famLen -> N_elemNdx  ->   N_wt
var set_wtN = R.curry(require('./set_N_wt').set_wtN);// D -> N -> N  ->  N
// set_the_weightedCSD(D -> N ) -> CSD  -> CSD
var set_the_weightedCSD = R.curry(require('./set_weightedSPAN_CSD').set_the_weightedCSD);//(D->N) -> CSD -> CSD
// set_aSpan_Style (SPAN, CSD)  ->  SPAN
var set_aSpan_Style = h.Elm_TO_Elm_style_BY_CSD;
// begin
console.log("IN  set_anElem_Style.js.");

const f_set_SPAN_Style = (d_wtRng, n_fmly)=> {// (D, N) -> Fn:( E, N, L ) -> E
    return function ndxN_to_SPAN_by_ndx (e_e, n_ndx, l_fam)
    {// Fn::(e_e -> n_ndx)  -> e_e
        R.compose(
            set_aSpan_Style(e_e), // (SPAN) -> CSD -> SPAN
            set_the_weightedCSD(d_wtRng, n_fmly), // (D, N) -> N  -> CSD
            set_wtN // N -> N
        )(n_ndx);// which by now has been mutated with a new CSD
    };
};
/**
 *      ---------------- exports: set_SPAN_Style:: (D, N) -> Fn:( (E, N, L) -> E))
 */
exports.set_SPAN_Style = R.curry(f_set_SPAN_Style);

// OK a few tests
var CUT = R.curry(f_set_SPAN_Style);

// TEST CONSTANTS
var csdLimitsD = {smlWt:0.4, lrgWt:0.90};
var stubList = [0,1,2,3,4];
var assert = require('assert');
assert.ok(CUT(csdLimitsD, stubList.length) instanceof Function, `csdLimitsD(D,N) -> IS a Function.`);


console.log("OUT set_anElem_Style.js.");