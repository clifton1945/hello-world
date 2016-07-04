/**
 * f_l_Rclss.js  -> [[pst],[cur],[fut]]
 * 160704
 *  @0752 FIXED f_n_Rclss()   STABLE && TESTED
 *  @0549 REFACT f_n_Rclss NOT BROKE for now
 *  @0525 COPY OF _rClss_3L.js
 */

// var crnt = require('./crnt_limits.js');
var test = require('tape');
var R = require('ramda');

/**
 *      f_n_Rclass:: L->D->L:[[pst],[cur],[pst]] a L of the current chapters three Rclss verses.
 * @param chptVerses
 * @param crntLmts
 * @return {*}
 */
var f_n_Rclass = (chptVerses, crntLmts) => {
    RET = [];
    var CUT1 = R.splitAt(crntLmts.end)(chptVerses);
    var fut = CUT1[1];
    var CUT2 = R.splitAt(crntLmts.beg)(CUT1[0]);
    var cur = CUT2[1];
    var pst = CUT2[0];
    return [pst,cur,fut]
};
module.exports =f_n_Rclass;
// test data
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var RET, EXP, CUT, limits, SKIP={skip:false};
// test code:

test(`exp f_n_Rclass.length -> 3 un flattened, 9 flattened.`, SKIP,
    function (t) {
    RET = f_n_Rclass(stubVerses, {beg: 111, end: 222});
    t.equal(RET.length, 3, 'w/o flattening exp 3 lists of verses:pst.cur,fut');
    t.equal(R.flatten(RET).length, 9, 'w/ flattening exp all 9 verses.');
    t.end();
});
// limits = {beg: 0, end: 2};
test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 0, end: 2})}`,
    function (t) {
    RET = f_n_Rclass(stubVerses, {beg: 0, end: 2});
    EXP = 0;
    t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
    EXP = 2;
    t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
    EXP = 7;
    t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
    t.end();
});
limits = {beg: 3, end: 6};
test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 3, end: 6})}`,
    function (t) {
        RET = f_n_Rclass(stubVerses, {beg: 3, end: 6});
        EXP = 3;
        t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
        EXP = 3;
        t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
        EXP = 3;
        t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
        t.end();
    });
limits = {beg: 7, end: 9};
test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 7, end: 9})}`,
    function (t) {
        RET = f_n_Rclass(stubVerses, {beg: 7, end: 9});
        EXP = 7;
        t.equal(RET[0].length, EXP, ` > pst:${EXP}`);
        EXP = 2;
        t.equal(RET[1].length, EXP, ` > cur:${EXP}`);
        EXP = 0;
        t.equal(RET[2].length, EXP, ` > fut:${EXP}`);
        t.end();
    });
