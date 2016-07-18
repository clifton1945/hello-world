/**
 * f_n_calcWt.js -> CALCULATE a weighting factor AS a function of Space parameters FOR a Verse default Csd.
 * 160718 ->  MAKE a calcWt function for use in  f_d_update_Csd_D.js
 * It IS a condensed contents of C:/Users/CLIF/Projects/WS_Prjs/C_Script_FP/src/objects.js.
 */
"use strict";
/**
 *              TST_StyleObj: still Active  IN ramda_tests
 * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, 1: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, 0: {name: string, smlWt: number, lrgWt: number, calcWt: Function}}}
 */
const TST_StyleObj = {
    2: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .8
        , calcWt: (sObj, vObj) => {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
    },
    1: {
        name: 'cur',
        smlWt: 1.0,
        lrgWt: 1.0,
        calcWt: (sObj, vObj) => {
            // using es6 destructuring
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? ((lrgWt - smlWt) / len * ndx + smlWt)
                : lrgWt;  // always lrgWt
        }
    },
    0: {
        name: 'pst'
        , smlWt: 0.3
        , lrgWt: 0.8
        , calcWt: (sObj, vObj) => {
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            let delta = lrgWt - smlWt;
            return (len > 0)
                ? (delta / len * ndx + smlWt)
                : lrgWt;  // start small grow larger.
        }
    }
};