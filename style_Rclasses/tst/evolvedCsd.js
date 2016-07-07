/**
 * evolvedCSD.js
 * 160705
 *  @0820 REFACTORED FOR require  - 'ramda' and 'tepe'
 * 160704
 *  @1717 renamed func TO f_evolve_a_d_Csd
 *      was in project: C_Script_FP/....tst/evolve_CSD_tests.js
 * 160624
 */
"use strict";

let R = require('ramda');

// ---------------------- Code Under Test: f_evolve_a_d_Csd
/**
 *      f_evolve_a_d_Csd: D:csd, N:fctr -> D:csd
 *  REFACT: RENAMED FROM evolve_CSD_tests ??
 */
const f_evolve_a_d_Csd = R.curry(function (csd, fctr) {
    var wt_opacity = R.compose(R.toString, R.multiply(fctr), parseFloat);
    var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(fctr), parseFloat);
    var transform = {
        opacity: wt_opacity,
        fontSize: wt_fontSize
    };
    return R.evolve(transform, csd); //=> D->N->D
});
module.exports ={f_evolve_a_d_Csd};
// ---------------------- test: f_evolve_a_d_Csd
let assert = require('assert');
//GLOBAL:
var CUT, RET, MSG = ``;
tst_f_evolve_a_d_Csd_tests();
function tst_f_evolve_a_d_Csd_tests() {
    MSG = `_transform_CSD-> `;
    var stub_csd = {opacity: '76', fontSize: '80%'};
    var stub_col = [1, 2, 3, 4];
    var stub_fctr = 1 / 2;
    var stub_wtER = R.multiply(stub_fctr);

    RET = f_evolve_a_d_Csd(stub_csd, stub_fctr);
    MSG += '#1 isString, ';
    assert(true, R.is(String, RET.opacity), MSG);
    MSG += '#2 opacity: wter:1/2, ';
    assert('38', RET.opacity, MSG);
    MSG += '#3 fontSize: wter:1/2, ';
    assert('40%', RET.fontSize, MSG);
    MSG += '#4 fontSize: wter:1, ';
    RET = f_evolve_a_d_Csd(stub_csd, 1);
    assert('80%', RET.fontSize, MSG);
    MSG += `
      f_evolve_a_d_Csd_tests: DONE`;
    console.log(MSG);
}