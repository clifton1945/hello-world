/**
 * f_s_RclssName.js 
 *  160705
 *  @0850 RENAMED file FROM transfrm_Chpt2Rclss.js
 *      CREATED sub dir: Chptr_2_Rclss
 *          which will hold code to INTENT: using R.evolve,
 *          CRAFT  Style transforms directly  FROM Chpt CSD: ndx, sibs TO Rclss CSD: ndx, sibs
 *  160705  was classByIndex_tests.js in project: C_Script_FP
 */

/**
 * THINKING: what want? what tests?
 */
"use strict";
/**
 *       --------------------------DATA:
 */
/**
 *      -------------------------- CodeUnderTest and HELPERS
 */

var R = require('ramda');
var assert = require('assert');

var ltBeg = (dict)=>(i)=> R.lt(i, dict.beg);//D -> N -> Bool
var gtEnd = (dict)=>(i)=> R.gt(i, dict.end);//D -> N -> Bool
var tweenBegEnd = (dict)=>(i)=> R.gte(i, dict.beg) && R.lte(i, dict.end);//D -> N -> Bool
var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
var isCur = (dict) => tweenBegEnd(dict);
/**
 *      _rClssName:: D:curRnge -> N:i -> S:rClss name
 *
 * @param rngD >  the cChptr.range of : beg and end indexes, used to establish the rClss 'cur'rent verses.
 * @param i > the cChptr.index. It will be tranformed into the rClss.index
 */
// var rClssByChptrElem = R.curry((rngD, i) =>
const _rClssName = R.curry((rngD, i) =>
    ltBeg(rngD)(i) ? 'pst' :
        gtEnd(rngD)(i) ? 'fut' :
            tweenBegEnd(rngD)(i) ? 'cur' :
                'hey, _rClssName() is broken.');
/**
 *      -------------------------- INVOKE and TESTS
 */
isPst_isCur_isFut_tests();
function isPst_isCur_isFut_tests() {
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` cBI_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    // var stubVerses = curChptVerse_NL;
    var stub_curRngeD = {beg: 4, end: 5};
    // CUT
    // var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
    // var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
    // var isCur = (dict) => tweenBegEnd(dict);
    // TESTS
    MSG += ` #1:isPst, `;
    TST = R.map(i => isPst(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [true, false, false]
    assert([true, false, false, false], TST, MSG);
    MSG += ` #2:isCur, `;
    TST = R.map(i => isCur(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, true, true, false], TST, MSG);

    MSG += ` #3:isFut, `;
    TST = R.map(i => isFut(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, false, false, true], TST, MSG);

// final Msg
    MSG += `
    finished classByIndex_tests`;
    console.log(MSG);
}

