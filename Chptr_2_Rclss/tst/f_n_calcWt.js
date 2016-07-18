/**
 * f_n_calcWt.js -> CALCULATE a weighting factor AS a function of Space parameters FOR a Verse default Csd.
 * 160718
 *  @1530 -> STABLE: test ("*** 0 confirming calcWt(sObj, vObj) DOES "
 *  MAKE a calcWt function for use in  f_d_update_Csd_D.js
 * It IS a condensed contents of C:/Users/CLIF/Projects/WS_Prjs/C_Script_FP/src/objects.js.
 */
"use strict";
let R = require('ramda');

/**
 *              TST_StyleObj: still Active  IN ramda_tests
 * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, 1: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, 0: {name: string, smlWt: number, lrgWt: number, calcWt: Function}}}
 */
const TST_StyleObj = {
    2: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .8
        // , calcWt: (d_rng, d_cntxt) => {
        //     //noinspection JSUnusedLocalSymbols
        //     let {ver, ndx, ary} = d_cntxt;
        //     let {smlWt, lrgWt} = d_rng;
        //     let len = ary.length - 1;
        //     return (len > 0)
        //         ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
        //         : lrgWt;  // always lrgWt
        // }
    },
    1: {
        name: 'cur',
        smlWt: 1.0,
        lrgWt: 1.0,
        // calcWt: (d_rng, d_cntxt) => {
        //     // using es6 destructuring
        //     let {ver, ndx, ary} = d_cntxt;
        //     let {smlWt, lrgWt} = d_rng;
        //     let len = ary.length - 1;
        //     return (len > 0)
        //         ? ((lrgWt - smlWt) / len * ndx + smlWt)
        //         : lrgWt;  // always lrgWt
        // }
    },
    0: {
        name: 'pst'
        , smlWt: 0.3
        , lrgWt: 0.8
        // , calcWt: (d_rng, d_cntxt) => {
        //     let {ver, ndx, ary} = d_cntxt;
        //     let {smlWt, lrgWt} = d_rng;
        //     let len = ary.length - 1;
        //     let delta = lrgWt - smlWt;
        //     return (len > 0)
        //         ? (delta / len * ndx + smlWt)
        //         : lrgWt;  // start small grow larger.
        // }
    }
};

var calcWt = (smlWt, lrgWt, ndx, ary) => {
    // this was a Rclss.fut calcWt method
    let len = ary.length - 1;
    let delta = lrgWt - smlWt;
    return (len > 0)
        ? lrgWt + (-delta / len * ndx )
        : lrgWt;  // always lrgWt
};

calcWt = (sObj, vObj) => {
    //noinspection JSUnusedLocalSymbols
    let {smlWt, lrgWt} = sObj;
    let {ver, ndx, ary} = vObj;
    let len = ary.length - 1;
    return (len > 0)
        ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
        : lrgWt;  // always lrgWt
};

let test = require('tape');
test ("*** 0 confirming calcWt(sObj, vObj) DOES ", function (t) {
    const rng = {smlWt:5, lrgWt:9};
    const cntxt = {ver:'hi, i am me', ndx:3, ary:[0,1,2,3,4,5,6]};
    cntxt.ndx = 0;
    t.equals(calcWt(rng, cntxt), 9, '5,9,0,ary -> 9');
    cntxt.ndx = 3;
    t.equals(calcWt(rng, cntxt), 7, '5,9,3,ary -> 7');
    cntxt.ndx = 6;
    t.equals(calcWt(rng, cntxt), 5, '5,9,6,ary -> 5');
    t.end();
});