/**
 * f_d_curChptScope.js
 * 160708 @ 0740 > usable f_d_curScope_set_beg & .._end 
 * @ 0623 was in f_d_Chpt_curScope.js
 */

"use strict";
/**
 *      -------------------------- CodeUnderTest and HELPERS
 */
var R = require('ramda');

let d_curScope = {beg: 0, end: 1}; // default


    /**
     *      f_d_set_key:: S:key -> D:{key:val} -> N:val -> D:{key:val}
     *      USAGE: setting d_curScope at the Chptr level.
     *      TESTS in tst/f_d_Chptr_curScope.js
     * @param key
     * @param dict
     * @param val
     */
const f_d_set_key = R.curry(
    (key, dict, val)=> R.set(R.lensProp(key), val, dict)
);// S:k -> D:{k:v} -> N:v ->  D:{k:v}
// NOTE:  USE the Named f_d_set-functions below NOT f_d_set_key()
// USING f_d_set_key() DEFEATS the purpose of fixing the distinct d_curScope two keys.
let f_d_curScope_set_beg = f_d_set_key('beg');// D:{k:a} -> N:v -> D:{k:v}
let f_d_curScope_set_end = f_d_set_key('end');// D:{k:a} -> N:v -> D:{k:v}

/**
 *      -------------------------- INVOKE and TESTS
 */
var test = require('tape');
f_d_Chpt_curScope();
function f_d_Chpt_curScope() {
    var MSG;
    // var NUM, CUT, RET, EXP, TST;
    MSG = ` f_d_Chpt_curScope.js\ `;
    // var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubD = R.clone(d_curScope);
    // CUT
    // TESTS
    test(` #0:f_d_curScope_set_beg|end, `, function (t) {
        t.deepEquals(stubD, {beg: 0, end: 1}, 'default {beg:0, end:1');
        stubD = f_d_curScope_set_beg(stubD)(333);
        t.deepEquals(stubD, {beg: 333, end: 1}, '-> beg:333, end:1');
        stubD = f_d_curScope_set_end(stubD)(44);
        t.deepEquals(stubD, {beg: 333, end: 44}, '->{beg:333, end:44}');
        t.end();
    });
// final Msg
    MSG += `
    finished f_d_curChptScope::D->N->S`;
    console.log(MSG);
}



