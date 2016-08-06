/**
 * \src\refresh_Rclsses.js  -> L:elem->D:d_scope->L:[[pst],[cur],[pst]]
 * 160806   @0640   -> adapt to Chptr_2_Rclss project
 * was \style_Rclss\src\f_l_Rclss.js
 *  USE:   L:elem -> D:d_scope -> L:[[pst],[cur],[pst]]
 */

var R = require('ramda');

/**
 *      f_l_Rclss:: L:elem->D:d_scope->L:[[pst],[cur],[pst]] a L of the current chapters three Rclss verses.
 *      RESETS the 3 Rclss contents for a new d_scope.
 *      the params ARE FLIPPED because
 *      the Scope dict CHANGES a lot: each key event
 *      BUT
 *      the Chptr Elem list IS static for the most part
 *              UNTIL there is a new Chapter
 * @param l_elem
 * @param d_scope
 * @return {*}
 */
var f_l_Rclss = (l_elem, d_scope) => {
    RET = [];
    var CUT1 = R.splitAt(d_scope.end)(l_elem);      // N:end -> L:chptr -> L[La, Lb]
    var fut = CUT1[1];                              // Lb:l_fut
    var CUT2 = R.splitAt(d_scope.beg)(CUT1[0]);     // N:beg -> La -> L[Lc, Ld]
    var cur = CUT2[1];                              // Ld:cur
    var pst = CUT2[0];                              // Lc:pst
    return [pst, cur, fut];                         // L:[Lc,Ld,Lb]
};
module.exports = f_l_Rclss;


// // test data
test = require('tape');
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var RET;//, EXP, CUT, limits, SKIP={skip:false};
//
test(`exp f_l_Rclss.length -> 3 un flattened, 9 flattened.`, function (t) {
    RET = f_l_Rclss(stubList, {beg: 111, end: 222});
    t.equal(RET.length, 3, 'w/o flattening exp 3 lists of verses:pst.cur,fut');
    t.equal(R.flatten(RET).length, 9, 'w/ flattening exp all 9 verses.');
    t.end();
});
test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 0, end: 2})}`,
    function (t) {
        RET = f_l_Rclss(stubList, {beg: 0, end: 2});
        EXP = 0;
        t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
        EXP = 2;
        t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
        EXP = 7;
        t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
        t.end();
    });
// limits = {beg: 3, end: 6};
// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 3, end: 6})}`,
//     function (t) {
//         RET = f_l_Rclss(stubList, {beg: 3, end: 6});
//         EXP = 3;
//         t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
//         EXP = 3;
//         t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
//         EXP = 3;
//         t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
//         t.end();
//     });
// limits = {beg: 7, end: 9};
// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 7, end: 9})}`,
//     function (t) {
//         RET = f_l_Rclss(stubList, {beg: 7, end: 9});
//         EXP = 7;
//         t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
//         EXP = 2;
//         t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
//         EXP = 0;
//         t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
//         t.end();
//     });
