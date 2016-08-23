/**
 * f_set_wtN:: (D, N)-> N -> N.  (D_csdLmtsL: N_elemFaml), N_elemNdx):: -> N_wt
 *  160822  @2050   STABLE w/ TESTS ->  REFACT to just one function set_wtN/
 * IN FILE: set_N_wt.js -> CALCULATE a weighting factor AS a function of a Verse Context/Space parameters:
 */
"use strict";
let R = require('ramda');

/**
 *      f_set_wtN(D_csdLmts ->  N_famLen -> N_elemNdx  ->   N_wt
 *      USED: typically used to weight element property CSD: e.g. opacity, fontSize, etc
 *      typically the L:fam and N:elemNdx will be returned by indexedMaps.
 * @param D_csdSpan   -> {smlWt:a, lrgWt:a}   style Property beg and end limits
 * @param L_fam  -> [a] list of this elements family
 * @param N_ndx  -> a the index of this elem in the family lis
 * @returns {*} -> an Element weight for this context.
 * @private
 */
let f_set_wtN = R.curry(function f_set_N_wt(D_csdSpan, N_famLen, N_ndx) {
    var smlWt = D_csdSpan.smlWt;
    var lrgWt = D_csdSpan.lrgWt;
    var len = N_famLen - 1;
    return len > 0 ? -(lrgWt - smlWt) / len * N_ndx + lrgWt : lrgWt; // always lrgWt
}); // D->N -> N -> N:wt

/**
 *          ---------- EXPORTS ---------
 */
/**
 *  set_wtN([D_csdSpan, N_famLen) -> N_elemNdx -> N_wt
 * @param D_csdSpan
 * @param N_famLen
 * @private
 */
exports.set_wtN = R.curry(f_set_wtN);//:: [D_csdSpan, L_fam] -> N_elemNdx -> N_wt

/**
 *          ----------------  CODE UNDER TEST: set_wtN:: N_ndx -> N_wt -----------
 * @type {{smlWt: number, lrgWt: number}}
 */
var CUT, RET;
// TEST CONSTANTS
var csdLimitsD = {smlWt: 0.5, lrgWt: 0.9};
var stub = [0, 1, 2, 3, 4, 5, 6];
// CUT
CUT = R.curry(f_set_wtN(csdLimitsD, stub.length));// N -> N
// ACCEPTABLE
var assert = require("assert");
assert.equal(CUT(0), 0.9, 'exp: 0.9 FROM assert set_N_wt(0)');
assert.equal(CUT(6), 0.5, 'exp: 0.5 FROM assert set_N_wt(6)');
assert.equal(f_set_wtN({smlWt: 0.5, lrgWt: 0.9}, stub.length, 4), 0.6333333333333333, 'exp: 0.633... FROM assert set_N_wt(4)');
// NOT ACCEPTABLE
assert.notEqual(CUT(), 0.9, 'FAIL_with NO argument set_N_wt()');
