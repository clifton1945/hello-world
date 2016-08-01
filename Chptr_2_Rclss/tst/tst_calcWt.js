/**
 * tst_calcWt.js
 * 160722  @0612 -> STABLE two tests of fn: _n_calcWt IN src/calcWt.js
 */
"use strict";
let R = require('ramda');

// CODE UNDER TEST: CREATE __calcWt = _n_calcWt(D, L):: N:ndx -> N:wt
var spanD1 = {smlWt:0.5, lrgWt:0.9}; //NOTE::  THIS d is 0.5 & 0.9
var famL1 = [0, 1, 2, 3, 4, 5, 6];
let _n_calcWt = require('../src/set_N_valu')._n_calcWt;
var _calcWt = _n_calcWt(spanD1)(famL1);

// SMALL test of Concept
var assert = require("assert");
assert.equal(_calcWt(0), 0.9, 'FAILED assert _calcWt(0)');
assert.equal(_calcWt(6), 0.5, 'FAILED assert _calcWt(6)');
assert.equal(_calcWt(4), 0.6333333333333333, 'FAILED assert _calcWt(4');

// BIGGER ish test WITH different _famL NOT SAME AS ABOVE
let test = require('tape');
test (`IN f_n_calcWt.js
*** 0 confirming new signature f_n_calcWt(sObj, l_fam, n-ndx) WORKS `,
    {skip:false}, function (t) {
// CODE UNDER TEST:NEW require fn()//N:ndx -> N:wt
    let _n_calcWt = require('../src/set_N_valu')._n_calcWt;
    var spanD2 = {smlWt:5, lrgWt:9};
    var famL2 = [0,1,2,3,4,5,6];
    let _calcWt = _n_calcWt(spanD2, famL2);

    t.equals(_calcWt(0), 9, '5,9,ary ndx(0) -> 9');
    t.equals(_calcWt(4),  6.333333333333334, '5,9, ary, ndx(4) -> 6.33...');
    t.equals(_calcWt(6), 5, '5,9, ary, ndx(6) -> 5');
    t.end();
});