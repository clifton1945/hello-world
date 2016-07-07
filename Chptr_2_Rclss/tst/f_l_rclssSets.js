/**
 * f_n_RclssNdx
 * 160707
 *  @1151   plans for next
 *  @0857 f_d_set_currentRclss() STABLE to reset the limits of a current Rclss.
 *  @0625 will filter doc elements into three sets: pst, cur, fut
 */

"use strict";
/**
 *       --------------------------DATA:
 */
/**
 *      -------------------------- CodeUnderTest and HELPERS
 */

var R = require('ramda');
// var h = require('../src/h');

let d_curLimits = {beg: 0, end: 1}; // default
// let d = R.always(d_curLimits);
let begLens = R.lensProp('beg');
let endLens = R.lensProp('end');
// let n_curBeg = R.identity(d_curLimits.beg);
// let n_curEnd = R.identity(d_curLimits.end);
let f_d_set_beg = R.set(begLens);// N:a -> D:{k:*} -> D:{k:a
let f_d_set_end = R.set(endLens);// N:a -> D:{k:*} -> D:{k:a

var ltBeg = (beg, end)=>(i)=> R.lt(i, beg);//D -> N -> Bool
var gtEnd = (beg, end)=>(i)=> R.gt(i, end);//D -> N -> Bool
var tweenBegEnd = (beg, end)=>(i)=> R.gte(i, beg) && R.lte(i, end);//D -> N -> Bool
//filters
var isPst = beg => end => ltBeg(beg, end); //:-> N:i -> Bool
var isCur = beg => end => tweenBegEnd(beg, end); //:-> N:i -> Bool
var isFut = beg => end => gtEnd(beg, end); //:-> N:i -> Bool

/**
 *      f_l_RclssSets :: F:(f_fltr)-> (el, ndx, sibs) -> L[L..]
 */
const f_l_RclssSets = R.curry((d_Range, i) =>
    ltBeg(d_Range)(i) ? 'pst' :
        tweenBegEnd(d_Range)(i) ? 'cur' :
            gtEnd(d_Range)(i) ? 'fut' :
                `f_s_RclssName() is broken. 
                Were the range dict keys: begNdx && endNdx?`
);

module.exports = f_l_RclssSets;

/**
 *      -------------------------- INVOKE and TESTS
 */
var test = require('tape');
f_l_rClssSets();
function f_l_rClssSets() {
    var NUM, CUT, RET, EXP, MSG, TST;
    MSG = ` f_l_RclssSets.js\ `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubD = R.clone(d_curLimits);
    //CUT
    // TESTS
    test(` #0:f_d_set_beg|end, `, function (t) {
        t.deepEquals(stubD, {beg: 0, end: 1}, 'default {beg:0, end:1');
        stubD = f_d_set_beg(333)(stubD);
        t.deepEquals(stubD, {beg: 333, end: 1}, '-> beg:333, end:1');
        stubD = f_d_set_end(44)(stubD);
        t.deepEquals(stubD, {beg: 333, end: 44}, '->{beg:333, end:44}');
        t.end();
    });

    test(` #1:???f_d_set_beg|end, `, function (t) {
    // ok I can change the current Rclss boundaries/limits
    //    Given cur Boundaries set the isPst, isCur.... (param: beg, end
    //  then use the ChptNdx and  booleans to fill a Set
    // and put the three sets in one List
        // stubD = f_d_set_beg(333)(stubD);
        // t.deepEquals(stubD, { beg:333, end: 1 }, '-> beg:333, end:1');
        t.end();
    });
// final Msg
    MSG += `
    finished f_s_RclssName::D->N->S`;
    console.log(MSG);
}


