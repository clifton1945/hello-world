/**
 * f_d_curChptScope.js
 * 160708 @ 1125 -> REFACT f_d_Chpt_curScope_set_ beg & end NOW HAVE d_curScope BUILT IN. 
 *          USING the _Chpt_curScope form directly changes the dict.
 * @0945 ADDED thisTest TO modules.export
 * @0805 MOVED f_d_set_key TO h.js FROM here
 * @ 0740 > usable f_d_set_beg & .._end
 * @ 0623 was in f_d_Chpt_curScope.js
 */

"use strict";
/**
 *      -------------------------- CodeUnderTest and HELPERS
 */
var R = require('ramda');

let d_curScope = require('../src/d_Chptr_curScope');// -> {beg: 0, end: 1}; // default

/**
 * NOTE:  USE the Named f_d_set-functions below NOT f_d_set_key()
 * USING f_d_set_key() DEFEATS the purpose of making the distinct d_curScope two keys Private.
 */
var f = require('../src/h.js');

/**
 *      f_d_set_beg:: D:{key:val} -> N:val -> D:{key:val}
 *      USAGE: setting d_curScope at the Chptr level.
 *      TESTS in tst/f_d_Chptr_curScope.js
 * @param dict
 * @param val
 */
let f_d_set_beg = f._d_set_key('beg');// D:{k:a} -> N:v -> D:{k:v}
// let f_d_Chpt_curScope_set_beg = f._d_set_key('beg')(d_curScope);//  N:v -> D:{k:v}
/**
 *      f_d_set_end:: D:{key:val} -> N:val -> D:{key:val}
 *      USAGE: setting d_curScope at the Chptr level.
 *      TESTS in tst/f_d_Chptr_curScope.js
 * @param dict
 * @param val
 */
let f_d_set_end = f._d_set_key('end');// D:{k:a} -> N:v -> D:{k:v}
// EXPORT
//ADD here
// let f_d_Chpt_curScope_set_end = f._d_set_key('end')(d_curScope);// N:v -> D:{k:v}

var thisTest= test_f_d_Chpt_curScope;
module.exports = {f_d_set_beg, f_d_set_end, thisTest};
// module.exports = {f_d_Chpt_curScope_set_beg, f_d_Chpt_curScope_set_end, thisTest};

/**
 *      -------------------------- INVOKE and TESTS
 */
var test = require('tape');

test_f_d_Chpt_curScope();
function test_f_d_Chpt_curScope() {
    var MSG;
    // var NUM, CUT, RET, EXP, TST;
    MSG = ` f_d_Chpt_curScope.js\ `;
    // var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubD;
    // CUT
    // TESTS
    test(` #0:f_d_set_beg|end, `, function (t) {
        stubD = R.clone(d_curScope);
        t.deepEquals(stubD, {beg: 0, end: 1}, 'default {beg:0, end:1');
        stubD = f_d_set_beg(stubD)(333);
        t.deepEquals(stubD, {beg: 333, end: 1}, '-> beg:333, end:1');
        stubD = f_d_set_end(stubD)(44);
        t.deepEquals(stubD, {beg: 333, end: 44}, '->{beg:333, end:44}');
        t.end();
    });
// final Msg
    MSG += `
    finished f_d_curChptScope::D->N->S`;
    console.log(MSG);
}

