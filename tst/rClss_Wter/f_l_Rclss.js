/**
 * f_l_Rclss.js  -> [[pst],[cur],[fut]]
 * 160704
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
var _rCls_Lsts = chptVerses => crntLmts => {
    RET = [];
    var CUT1 = R.splitAt(crnt._beg(crntLmts))(chptVerses);
    var pst = R.flatten(CUT1[0]);
    var cf = R.flatten(CUT1[1]);
    var CUT2 = R.splitAt(crnt._span(crntLmts))(cf);
    var cur = R.flatten(CUT2[0]);
    var fut = R.flatten(CUT2[1]);
    RET = R.append(pst)(RET); //pst
    RET = R.append(cur, RET);
    RET = R.append(fut, RET);
    return RET
};
CUT = {beg: 111, end: 222};
test(`exp _rClss_Lsts lengths: unflattened:3, flattened:9 `, function (t) {
    RET = _rCls_Lsts(stubVerses)(CUT);
    t.equal(RET.length, 3, 'w/o flattening exp 3:pst.cur,fut');
    RET = R.flatten(RET);
    t.equal(RET.length, 9, 'w/ flattening exp all 9 verses.');
    t.end();
});
CUT = {beg: 0, end: 2};
test(`EXP pst,cur,end FOR ${JSON.stringify(CUT)}`, function (t) {
    RET = _rCls_Lsts(stubVerses)(CUT);
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
    RET = _rCls_Lsts(stubVerses)(CUT);
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
    RET = _rCls_Lsts(stubVerses)(CUT);
    EXP = crnt._beg(CUT);
    t.equal(R.flatten(RET[0]).length, EXP, ` > pst:${EXP}`);
    EXP = crnt._span(CUT);
    t.equal(R.flatten(RET[1]).length, EXP, ` > cur:${EXP}`);
    EXP = stubList.length - crnt._end(CUT);
    t.equal(R.flatten(RET[2]).length, EXP, ` > fut:${EXP}`);
    t.end();
});

