/**
 *  set_RclssDIVs:: N_curSiz, L_elem, N_ndxBegCur) -> L:[L,L,L]
 *  160825 @1606 -> REFACT export and tests
 *      @1230 STABLE w/ changed exports && naming
 *      @ 0905 STABLE simple TESTED
 *      @ 0755 -> visual output of three: pst, cur, fut Rclss DIV children
 * FILE: slice_Spans.js
 */
"use strict";

// ------------------    REQUIRES
var h = require('./h');
var C_It = h.C_It;
C_It("< IN  set_RclssDIVs.js");
var R = require('ramda');
var assert = require('assert');

var L = [0, 1, 2, 3, 4, 5];
var CUT, RET, EXP;
var jsonS = x => JSON.stringify(x);

var f_set_RclssDIVs = function f_set_RclssDIVs(sizcur, l, beg) {
    return [
        l.slice(0, beg),
        l.slice(beg, beg + sizcur),
        l.slice(beg + sizcur, l.length)
    ];
};
/**
 *      -----   set_RclssDIVs::(N_curRclssSize,L_spans,N_curBegNdx) -> L
 * @param sizcur: Num of cur Rclss Spans
 * @param l: List of all Spans
 * @param beg: N ndx of the first/beginning cur Rclss Span
 * @return l: List of 3 RclssLists of its SPANs
 */
module.exports.set_RclssDIVs = R.curry(f_set_RclssDIVs);
// ---------------------- EXPORTS ---------------------------

/**
 *      --------------------- TESTS: VISUAL --------------------
 */
CUT = R.curry(f_set_RclssDIVs)(2, L);// N size of current DIV -> L of all spans
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

C_It("  OUT set_RclssDIVs.js>");




