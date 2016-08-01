/**
 * set_N_valu:: (D,L)->N -> N.  (D_csdLmtsL: L_elemList), N_elemNdx):: -> N_valu
 * 160730   1518 -> removed _n_calcWt()
 *          AND just recognized that the D_csdLmts ARE A FUNCTION of Rclss. I'll need REFACT then.
 *  @1224 -> quick test in main.js shows set_N_valu WORKS as a compose.
 *  @1000 -> RENAMED set_N_valu([D:csdSpan, L_fam]) -> N_elemNdx  --> N_valu
 * IN FILE: set_N_valu.js -> CALCULATE a weighting factor AS a function of a Verse Context/Space parameters: csd D_csdSpan, familyL, itsNdxN.
 */
"use strict";
let R = require('ramda');

/**
 *      f_set_N_valu(D_csdLmtsL: L_elemList, N_elemNdx):: -> N_valu
 *      USED: typically used to weight element property CSD: e.g. opacity, fontSize, etc
 *      typically the L:fam and N:elemNdx will be returned by indexedMaps.
 * @param D_csdSpan   -> {smlWt:a, lrgWt:a}   style Property beg and end limits
 * @param L_fam  -> [a] list of this elements family
 * @param N_ndx  -> a the index of this elem in the family lis
 * @returns {*} -> an Element weight for this context.
 * @private
 */
let f_set_N_valu = R.curry(function f_set_N_valu(D_csdSpan, L_fam, N_ndx) {
    var smlWt = D_csdSpan.smlWt;
    var lrgWt = D_csdSpan.lrgWt;
    var len = L_fam.length - 1;
    return len > 0 ? -(lrgWt - smlWt) / len * N_ndx + lrgWt : lrgWt; // always lrgWt
}); // D->L -> N -> N:wt

/**
 *  set_N_valu([D_csdSpan, L_fam]):: N_elemNdx -> N_valu
 * @param D_csdSpan
 * @param L_fam
 * @private
 */
const set_N_valu = R.partial(f_set_N_valu);//:: L:[D_csdSpan, L_fam] -> N_elemNdx -> N_valu

// MODULES.EXPORT
// set_N_valu([D_csdSpan, L_fam]):: N_elemNdx -> N_valu
module.exports = {set_N_valu, f_set_N_valu};

// CODE UNDER TEST: set_N_valu:: N_ndx -> N_valu
var csdLimitsD = {smlWt: 0.5, lrgWt: 0.9};
var stub = [0, 1, 2, 3, 4, 5, 6];
var fn = set_N_valu([csdLimitsD, stub]);

var assert = require("assert");
assert.equal(fn(0), 0.9, 'exp: 0.9 FROM assert set_N_valu(0)');
assert.equal(fn(6), 0.5, 'exp: 0.5 FROM assert set_N_valu(6)');
assert.equal(f_set_N_valu({smlWt: 0.5, lrgWt: 0.9}, stub, 4), 0.6333333333333333, 'exp: 0.633... FROM assert set_N_valu(4)');