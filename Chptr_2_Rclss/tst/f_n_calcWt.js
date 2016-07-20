/**
 * f_n_calcWt:: D:begN, endN Range -> L:list of Element family -> N:Element Index -> N:weight Value
 *  160720 @ 0840 ADDED test of recurring decimal output. ndx==4;
 * 160719
 *  @0952 -> COMMENTED OUT test 0 to not see IN f_d_update_CsdD.js
 * 160718
 *  @1835 -> COMMENTED OUT test 0 to not see IN f_d_update_CsdD.js
 *  @1558 -> STABLE test ("*** 0 confirming new signature calcWt(sObj, l_fam, n-ndx) DOES !! "
 *  @1530 -> STABLE test ("*** 0 confirming calcWt(sObj, vObj) DOES "
 * This file IS a condensed contents of C:/Users/CLIF/Projects/WS_Prjs/C_Script_FP/src/objects.js.
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
var calcWt = function calcWt(sObj, l_fam, n_ndx) {
    var smlWt = sObj.smlWt;
    var lrgWt = sObj.lrgWt;
    var len = l_fam.length - 1;
    return len > 0 ? -(lrgWt - smlWt) / len * n_ndx + lrgWt : lrgWt; // always lrgWt
};
var _calcWt = R.curry(calcWt);

let test = require('tape');
test (`IN f_n_calcWt.js
*** 0 confirming new signature calcWt(sObj, l_fam, n-ndx) WORKS `,
    {skip:true}, function (t) {
    const rng = {smlWt:5, lrgWt:9};
    const ary = [0,1,2,3,4,5,6];
    t.equals(calcWt(rng, ary, 0), 9, '5,9, ary, 0 -> 9');
    t.equals(calcWt(rng, ary, 4),  6.333333333333334, '5,9, ary, 4 -> 6.33...');
    t.equals(calcWt(rng, ary, 6), 5, '5,9, ary, 6 -> 5');
    t.end();
});

// MODULES.EXPORT
module.exports = _calcWt;