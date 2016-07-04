/**
 * f_l_Rclss.js  -> [[pst],[cur],[fut]]
 * 160704
 *  @0549 REFACT f_n_Rclss BROKEN for now
 *  @0525 COPY OF _rClss_3L.js
 */

var crnt = require('./crnt_limits.js');
var test = require('tape');
var R = require('ramda');

// test data
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var RET, EXP, CUT;
// test code
/**
 *      f_n_Rclass:: L->D->L:[[pst],[cur],[pst]] a L of the current chapters three Rclss verses.
 * @param chptVerses
 * @param crntLmts
 * @return {*}
 */
var f_n_Rclass = (chptVerses, crntLmts) => {
    RET = [];
    var CUT1 = R.splitAt(crnt._end(crntLmts))(chptVerses);
    var fut = R.flatten(CUT1[1]);
    var cf = R.flatten(CUT1[0]);
    var CUT2 = R.splitAt(crnt._beg(crntLmts))(cf);
    var cur = R.flatten(CUT2[1]);
    var pst = R.flatten(CUT2[0]);
    RET = R.append(pst)(RET); //pst
    RET = R.append(cur, RET);
    RET = R.append(fut, RET);
    return RET
};
CUT = {beg: 111, end: 222};
test(`exp _rClss_Lsts lengths: unflattened:3, flattened:9 `, function (t) {
    RET = f_n_Rclass(stubVerses)(CUT);
    t.equal(RET.length, 3, 'w/o flattening exp 3:pst.cur,fut');
    RET = R.flatten(RET);
    t.equal(RET.length, 9, 'w/ flattening exp all 9 verses.');
    t.end();
});
CUT = {beg: 0, end: 2};
test(`EXP pst,cur,end FOR ${JSON.stringify(CUT)}`, function (t) {
    RET = f_n_Rclass(stubVerses)(CUT);
    EXP = crnt._beg(CUT);
    // t.equal(R.flatten(RET[0]).length, EXP, ` > pst:${EXP}`);
    t.equal(R.flatten(RET[0]).length, 0, ` > pst:${EXP}`);
    EXP = crnt._span(CUT);
    // t.equal(R.flatten(RET[1]).length, EXP, ` > cur:${EXP}`);
    t.equal(R.flatten(RET[1]).length, 2, ` > cur:${EXP}`);
    EXP = stubList.length - crnt._end(CUT);
    // t.equal(R.flatten(RET[2]).length, EXP, ` > fut:${EXP}`);
    t.equal(R.flatten(RET[2]).length, 7, ` > fut:${EXP}`);
    t.end();
});
CUT = {beg: 3, end: 6};
test(`EXP pst,cur,end FOR ${JSON.stringify(CUT)}`, function (t) {
    RET = f_n_Rclass(stubVerses)(CUT);
    EXP = crnt._beg(CUT);
    t.equal(R.flatten(RET[0]).length, EXP, ` > pst:${EXP}`);
    EXP = crnt._span(CUT);
    t.equal(R.flatten(RET[1]).length, EXP, ` > cur:${EXP}`);
    EXP = stubList.length - crnt._end(CUT);
    t.equal(R.flatten(RET[2]).length, EXP, ` > fut:${EXP}`);
    t.end();
});
CUT = {beg: 7, end: 9};
test(`EXP pst,cur,end FOR ${JSON.stringify(CUT)}`, function (t) {
    RET = f_n_Rclass(stubVerses)(CUT);
    EXP = crnt._beg(CUT);
    t.equal(R.flatten(RET[0]).length, EXP, ` > pst:${EXP}`);
    EXP = crnt._span(CUT);
    t.equal(R.flatten(RET[1]).length, EXP, ` > cur:${EXP}`);
    EXP = stubList.length - crnt._end(CUT);
    t.equal(R.flatten(RET[2]).length, EXP, ` > fut:${EXP}`);
    t.end();
});

