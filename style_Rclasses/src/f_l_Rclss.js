/**
 * \src\f_l_Rclss.js  -> [[pst],[cur],[fut]]
 * 160704
 *  @1045 STRUCTURED code: \src\.. and  \tst\.. &&  STABLE TESTS
 *  @0855 SPLIT tst and src versions && FIXED conflict of names: f_l_Rclss  NOT f_n_Rclss;
 *  @0752 FIXED f_l_Rclss()   STABLE && TESTED
 *  @0549 REFACT f_l_Rclss NOT BROKE for now
 *  @0525 COPY OF _rClss_3L.js
 */

var R = require('ramda');

/**
 *      f_l_Rclss:: L->D->L:[[pst],[cur],[pst]] a L of the current chapters three Rclss verses.
 * @param chptVerses
 * @param crntLmts
 * @return {*}
 */
var f_l_Rclss = (chptVerses, crntLmts) => {
    RET = [];
    var CUT1 = R.splitAt(crntLmts.end)(chptVerses);
    var fut = CUT1[1];
    var CUT2 = R.splitAt(crntLmts.beg)(CUT1[0]);
    var cur = CUT2[1];
    var pst = CUT2[0];
    return [pst,cur,fut]
};
module.exports = f_l_Rclss;
// // test data
// var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
// var stubVerses = stubList;
// var RET, EXP, CUT, limits, SKIP={skip:false};
// // test code:
//
// test(`exp f_l_Rclss.length -> 3 un flattened, 9 flattened.`, SKIP,
//     function (t) {
//     RET = f_l_Rclss(stubVerses, {beg: 111, end: 222});
//     t.equal(RET.length, 3, 'w/o flattening exp 3 lists of verses:pst.cur,fut');
//     t.equal(R.flatten(RET).length, 9, 'w/ flattening exp all 9 verses.');
//     t.end();
// });
// // limits = {beg: 0, end: 2};
// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 0, end: 2})}`,
//     function (t) {
//     RET = f_l_Rclss(stubVerses, {beg: 0, end: 2});
//     EXP = 0;
//     t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
//     EXP = 2;
//     t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
//     EXP = 7;
//     t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
//     t.end();
// });
// limits = {beg: 3, end: 6};
// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 3, end: 6})}`,
//     function (t) {
//         RET = f_l_Rclss(stubVerses, {beg: 3, end: 6});
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
//         RET = f_l_Rclss(stubVerses, {beg: 7, end: 9});
//         EXP = 7;
//         t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
//         EXP = 2;
//         t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
//         EXP = 0;
//         t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
//         t.end();
//     });
