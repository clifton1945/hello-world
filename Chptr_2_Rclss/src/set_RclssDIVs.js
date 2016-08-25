/**
 *  set_RclssDIVs:: N_curSiz, L_elem, N_ndxBegCur) -> L:[L,L,L]
 *  160825 @ 0905 STABLE simple TESTED
 *      @ 0755 -> visual output of three: pst, cur, fut Rclss DIV children
 * FILE: slice_Spans.js
 */
"use strict";
var h = require('./h');
var C_It = h.C_It;
C_It("< IN  set_RclssDIVs.js");
// ------------------    REQUIRES
var R = require('ramda');
var assert = require('assert');
var L = [0, 1, 2, 3, 4, 5];
var CUT, RET, EXP;
var jsonS = x => JSON.stringify(x);

/**
 *      -----   f_set_RclssDIVs::(N,L,N) -> L
 * @param sizcur: Num of cur Rclss Spans
 * @param l: List of all Spans
 * @param beg: N ndx of th first/beginning cur Rclss Span
 */
var f_set_RclssDIVs = (sizcur, l, beg) => {
    return [
        l.slice(0, beg),
        l.slice(beg, beg + sizcur),
        l.slice(beg + sizcur, l.length)
    ];
};
var set_RclssDIVs = beg => f_set_RclssDIVs(2, L, beg);// N -> L

/**
 *      --------------------- TESTS: VISUAL --------------------
 */
CUT = set_RclssDIVs;// N -> L
// test 0
var n_ndx = 0;
RET = CUT(n_ndx);
EXP = "[[],[0,1],[2,3,4,5]]";
assert.deepEqual(jsonS(RET), EXP, `RET: ${jsonS(RET)} NOT EXP:${EXP} FROM CUT(${n_ndx})`);
// test 1
n_ndx = 1;
RET = CUT(n_ndx);
EXP = "[[0],[1,2],[3,4,5]]";
assert.equal(jsonS(RET), EXP, `RET: ${jsonS(RET)} NOT EXP:${EXP} FROM CUT(${n_ndx})`);

// test 5
n_ndx = 5;
RET = CUT(n_ndx);
EXP = "[[0,1,2,3,4],[5],[]]";
assert.equal(jsonS(RET), EXP, `RET: ${jsonS(RET)} NOT EXP:${EXP} FROM CUT(${n_ndx})`);


// jsonS("\nthe next set:5/1/0");
// set_RclssDIVs(5);

C_It("  OUT set_RclssDIVs.js>");
//      --------------- DEPR -------------------
// var DEPR_f_set_RclssDIVs = (sizcur, l, beg) => {
//     jsonS('pst:' + l.slice(0, beg));
//     jsonS('cur:' + l.slice(beg, beg + sizcur));
//     jsonS('fut:' + l.slice(beg + sizcur, l.length));
// };




