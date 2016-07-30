/**
 * _N_valu_set:: (D,L)->N -> N.  (D_csdLmtsL: L_elemList), N_elemNdx):: -> N_valu
 * 160730   1518 -> removed _n_calcWt()
 *          AND just recognized that the D_csdLmts ARE A FUNCTION of Rclss. I'll need REFACT then.
 *  @1224 -> quick test in main.js shows _N_valu_set WORKS as a compose.
 *  @1000 -> RENAMED _N_valu_set([D:csdSpan, L_fam]) -> N_elemNdx  --> N_valu
 * IN FILE: _N_valu_set.js -> CALCULATE a weighting factor AS a function of a Verse Context/Space parameters: csd D_csdSpan, familyL, itsNdxN.
 */
"use strict";
let R = require('ramda');

    /**
     *      f_N_valu_set(D_csdLmtsL: L_elemList, N_elemNdx):: -> N_valu
     *      USED: typically used to weight element property CSD: e.g. opacity, fontSize, etc
     *      typically the L:fam and N:elemNdx will be returned by indexedMaps.
     * @param D_csdSpan   -> {smlWt:a, lrgWt:a}   style Property beg and end limits
     * @param L_fam  -> [a] list of this elements family
     * @param N_ndx  -> a the index of this elem in the family lis
     * @returns {*} -> an Element weight for this context.
     * @private
     */
let f_N_valu_set = R.curry(function f_N_valu_set(D_csdSpan, L_fam, N_ndx) {
        var smlWt = D_csdSpan.smlWt;
        var lrgWt = D_csdSpan.lrgWt;
        var len = L_fam.length - 1;
        return len > 0 ? -(lrgWt - smlWt) / len * N_ndx + lrgWt : lrgWt; // always lrgWt
    }); // D->L -> N -> N:wt

 /**
 *  _N_valu_set([D_csdSpan, L_fam]):: N_elemNdx -> N_valu
 * @param D_csdSpan
 * @param L_fam
 * @private
 */
const _N_valu_set = R.partial(f_N_valu_set);//:: L:[D_csdSpan, L_fam] -> N_elemNdx -> N_valu

// MODULES.EXPORT
// _N_valu_set([D_csdSpan, L_fam]):: N_elemNdx -> N_valu
module.exports =  {_N_valu_set};

// CODE UNDER TEST: _N_valu_set:: N_ndx -> N_valu
var stub = [0, 1, 2, 3, 4, 5, 6];
var fn = _N_valu_set([{smlWt:0.5, lrgWt:0.9}, stub]);

var assert = require("assert");
assert.equal(fn(0), 0.9, 'exp: 0.9 FROM assert _N_valu_set(0)');
assert.equal(fn(6), 0.5, 'exp: 0.5 FROM assert _N_valu_set(6)');
assert.equal(fn(4), 0.6333333333333333, 'exp: 0.633... FROM assert _N_valu_set(4)');



// //************************** probably DEPRECATE 160730 ********************
// /**
//  *      f_n_calcWt():: ( D:spanCsd -> L:famElem) -> N:elemNdx -> N: wter
//  *      USED: typically to weight element property CSD: e.g. opacity, fontSize, etc
//  *          the L:fam and N:elemNdx will be returned by indexedMaps typically
//  *
//  * @param sObj  -> {smlWt:a, lrgWt:a}   style Property beg and end limits
//  * @param l_fam -> [a] list of this elements family
//  * @param n_ndx -> a the index of this elem in the family list
//  * @returns {*} -> an Element weight for this context.
//  */
// var f_n_calcWt = R.curry(function f_n_calcWt(spanD, famL, ndxN) {
//     var smlWt = spanD.smlWt;
//     var lrgWt = spanD.lrgWt;
//     var len = famL.length - 1;
//     return len > 0 ? -(lrgWt - smlWt) / len * ndxN + lrgWt : lrgWt; // always lrgWt
// }); // D->L->N -> N:wt
//
// /**
// *      _n_calcWt:: D:lmntD -> L:fam -> Fn:(N:elemNdx -> N:wt)
// *      Partials _calc_Nvalu
//  */
// const _n_calcWt = R.curry(function _n_calcWt(lmntD, L_fam) {
//     return f_n_calcWt(lmntD, L_fam)
// });// N:elemNdx -> N:wt
//
// // CODE UNDER TEST: _n_calcWt()//N:elemNdx -> N:wt
// // var assert = require("assert");
// fn = _n_calcWt({smlWt:0.5, lrgWt:0.9})([0, 1, 2, 3, 4, 5, 6]);
// assert.equal(fn(0), 0.9, 'FAILED assert _calcWt(0)');
// assert.equal(fn(6), 0.5, 'FAILED assert _calcWt(6)');
// assert.equal(fn(4), 0.6333333333333333, 'FAILED assert _calcWt(4');
//
//
//
// /**
// *      calcWt():: ( D:spanCsd -> L:famlElem) -> N:elemNdx -> N: wter
// *      USED: typically to weight element property CSD: e.g. opacity, fontSize, etc
// *          the L:fam and N:elemNdx will be returned by indexedMaps typically
// *
// * @param sObj  -> {smlWt:a, lrgWt:a}   style Property beg and end limits
// * @param l_fam -> [a] list of this elements family
// * @param n_ndx -> a the index of this elem in the family list
// * @returns {*} -> an Element weight for this context.
// */