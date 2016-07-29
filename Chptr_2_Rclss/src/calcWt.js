/**
 * 160729   @0745 -> REFACT var names
 * _n_calcWt:: (D->L) -> N:elemNdx -> N:wt
 * 160722  @0605 -> BUILT a usable fn: _n_calcWt(D, N) which returns a fn(N:elemNdx) -> N:wt
 * IN FILE: calcWt.js -> CALCULATE a weighting factor AS a function of a Verse Context/Space parameters: csd spanD, familyL, itsNdxN.
 */
"use strict";
let R = require('ramda');

/**
 *      f_n_calcWt():: ( D:spanCsd -> L:famElem) -> N:elemNdx -> N: wter
 *      USED: typically to weight element property CSD: e.g. opacity, fontSize, etc
 *          the L:fam and N:elemNdx will be returned by indexedMaps typically
 *
 * @param sObj  -> {smlWt:a, lrgWt:a}   style Property beg and end limits
 * @param l_fam -> [a] list of this elements family
 * @param n_ndx -> a the index of this elem in the family list
 * @returns {*} -> an Element weight for this context.
 */
var f_n_calcWt = R.curry(function f_n_calcWt(spanD, famL, ndxN) {
    var smlWt = spanD.smlWt;
    var lrgWt = spanD.lrgWt;
    var len = famL.length - 1;
    return len > 0 ? -(lrgWt - smlWt) / len * ndxN + lrgWt : lrgWt; // always lrgWt
}); // D->L->N -> N:wt

/**
*      _n_calcWt:: D:lmntD -> L:fam -> Fn:(N:elemNdx -> N:wt)
*      Partials f_n_calcWt
 */
const _n_calcWt = R.curry(function _n_calcWt(lmntD, famL) {
    return f_n_calcWt(lmntD, famL)
});// N:elemNdx -> N:wt

// CODE UNDER TEST: _n_calcWt()//N:elemNdx -> N:wt
var assert = require("assert");

var fn = _n_calcWt({smlWt:0.5, lrgWt:0.9})([0, 1, 2, 3, 4, 5, 6]);
assert.equal(fn(0), 0.9, 'FAILED assert _calcWt(0)');
assert.equal(fn(6), 0.5, 'FAILED assert _calcWt(6)');
assert.equal(fn(4), 0.6333333333333333, 'FAILED assert _calcWt(4');

// MODULES.EXPORT
// f_n_calcWt():: ( D:spanCsd -> L:famElem) -> N:elemNdx -> N: wter
// _n_calcWt:: D:lmntD -> L:fam -> Fn:(N:elemNdx -> N:wt)
module.exports =  {_n_calcWt, f_n_calcWt};



/**
*      calcWt():: ( D:spanCsd -> L:famlElem) -> N:elemNdx -> N: wter
*      USED: typically to weight element property CSD: e.g. opacity, fontSize, etc
*          the L:fam and N:elemNdx will be returned by indexedMaps typically
*
* @param sObj  -> {smlWt:a, lrgWt:a}   style Property beg and end limits
* @param l_fam -> [a] list of this elements family
* @param n_ndx -> a the index of this elem in the family list
* @returns {*} -> an Element weight for this context.
*/