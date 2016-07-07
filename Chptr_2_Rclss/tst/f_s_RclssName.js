/**
 * f_s_RclssName.js
 *  160705
 *  @1245 SIMPLE TESTS STABLE
 *  @0855 RENAMED rClssName() TO f_s_RclssName(): STABLE
 *  @0850 RENAMED file FROM transfrm_Chpt2Rclss.js
 *      CREATED sub dir: Chptr_2_Rclss
 *          which will hold code to INTENT: using R.evolve,
 *          CRAFT  Style transforms directly  FROM Chpt CSD: ndx, sibs TO Rclss CSD: ndx, sibs
 *  160705  was classByIndex_tests.js in project: C_Script_FP
 */

/**
 * THINKING: what want? what tests?
 *  want set module.export to make rClssName available.
 *  tests: old style tests are adequate.
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

var ltBeg = (dict)=>(i)=> R.lt(i, dict.begNdx);//D -> N -> Bool
var gtEnd = (dict)=>(i)=> R.gt(i, dict.endNdx);//D -> N -> Bool
var tweenBegEnd = (dict)=>(i)=> R.gte(i, dict.begNdx) && R.lte(i, dict.endNdx);//D -> N -> Bool
// var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
// var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
// var isCur = (dict) => tweenBegEnd(dict);
/**
 *      f_s_RclssName:: D:curRnge -> N:i -> S:rClss name
 * @param d_Range >  the cChptr.range of used to establish the rClss 'cur'rent verses.
 *  EXPECTS d_Range KEYS: begNdx and endNdx.
 * @param i > the cChptr.index.
 *
 */
const f_s_RclssName = R.curry((d_Range, i) =>
    ltBeg(d_Range)(i) ? 'pst' :
        tweenBegEnd(d_Range)(i) ? 'cur' :
        gtEnd(d_Range)(i) ? 'fut' :
                `f_s_RclssName() is broken. 
                Were the range dict keys: begNdx && endNdx?`);

module.exports = f_s_RclssName;

/**
 *      -------------------------- INVOKE and TESTS
 */

var test = require('tape');
isPst_isCur_isFut_tests();
function isPst_isCur_isFut_tests() {
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` f_s_RclssName.js\ `;
    var stubList, stub_curRngeD;
    stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    // TESTS
    test(` #0:beg:3, end:4, `, function (t) {
        stub_curRngeD = {begNdx: 3, endNdx: 4};
        TST =f_s_RclssName(stub_curRngeD);
        t.equals(TST(0), 'pst');
        t.equals(TST(1), 'pst');
        t.equals(TST(2), 'pst');
        t.equals(TST(3), 'cur');
        t.equals(TST(4), 'cur');
        t.equals(TST(5), 'fut');
        t.equals(TST(6), 'fut');
        t.end();
    });
    test(` #1:beg:0, end:1, `, function (t) {
        stub_curRngeD = {begNdx: 0, endNdx: 1};
        TST =f_s_RclssName(stub_curRngeD);
        t.equals(TST(0), 'cur');
        t.equals(TST(3), 'fut');
        t.equals(TST(4), 'fut');
        t.equals(TST(7), 'fut');
        t.end();
    });
    test(` #2:beg:1, end:7, `, function (t) {
        stub_curRngeD = {begNdx: 0, endNdx: 7};
        TST =f_s_RclssName(stub_curRngeD);
        t.equals(TST(0), 'cur');
        t.equals(TST(3), 'cur');
        t.equals(TST(4), 'cur');
        t.equals(TST(7), 'cur');
        t.end();
    });// final Msg
    MSG += `
    finished f_s_RclssName::D->N->S`;
    console.log(MSG);
}

