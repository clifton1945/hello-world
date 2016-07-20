/**
 * f_n_calcWt:: D->L->N->N
 * D:begN, endN Range -> L:list of Element family -> N:Element Index -> N:weight Value
 * 160720
 *  @1645 -> ADDED node.assert in addition to node.tape; they do not bleed through to requires
 *  @0840 -> ADDED test of recurring decimal output. ndx==4;
 *  @0952 -> COMMENTED OUT test 0 to not see IN f_d_update_CsdD.js
 * f_n_calcWt.js -> CALCULATE a weighting factor AS a function of Space parameters FOR a Verse default Csd.
 */
"use strict";
let R = require('ramda');

/**
 *      calcWt():: ( D:spanCsd -> L:famlElem) -> N:ndxElem -> N: wter
 *      USED: typically to weight element property CSD: e.g. opacity, fontSize, etc
 *          the L:fam and N:ndx will be returned by indexedMaps typically
 *
 * @param sObj  -> {smlWt:a, lrgWt:a}   style Property beg and end limits
 * @param l_fam -> [a] list of this elements family
 * @param n_ndx -> a the index of this elem in the family list
 * @returns {*} -> an Element weight for this context.
 */
var f_n_calcWt = R.curry(function f_n_calcWt(sObj, l_fam, n_ndx) {
    var smlWt = sObj.smlWt;
    var lrgWt = sObj.lrgWt;
    var len = l_fam.length - 1;
    return len > 0 ? -(lrgWt - smlWt) / len * n_ndx + lrgWt : lrgWt; // always lrgWt
});

// SMALL test of Concept
var assert = require("assert");
// CODE UNDER TEST: _calcWt()//N:ndx -> N:wt
var d = {smlWt:0.5, lrgWt:0.9};
var l = [0, 1, 2, 3, 4, 5, 6];
var n = 3;
var _d = R.identity(d);
var _l = R.identity(l);
var _n = R.identity(n);
var _calcWt = f_n_calcWt( _d, _l); // (F:(*->n) -> F:(*->n) -> N
assert.equal(_calcWt(0), 0.9, 'FAILED assert _calcWt(0)');
assert.equal(_calcWt(6), 0.5, 'FAILED assert _calcWt(6)');
assert.equal(_calcWt(4), 0.6333333333333333, 'FAILED assert _calcWt(4');

// let test = require('tape');
// test (`IN f_n_calcWt.js
// *** 0 confirming new signature f_n_calcWt(sObj, l_fam, n-ndx) WORKS `,
//     {skip:false}, function (t) {
//     const rng = {smlWt:5, lrgWt:9};
//     const ary = [0,1,2,3,4,5,6];
//     t.equals(f_n_calcWt(rng, ary, 0), 9, '5,9, ary, 0 -> 9');
//     t.equals(f_n_calcWt(rng, ary, 4),  6.333333333333334, '5,9, ary, 4 -> 6.33...');
//     t.equals(f_n_calcWt(rng, ary, 6), 5, '5,9, ary, 6 -> 5');
//     t.end();
// });

// MODULES.EXPORT
module.exports = f_n_calcWt;