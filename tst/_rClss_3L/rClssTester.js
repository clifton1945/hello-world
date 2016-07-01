/**
 * _rClss_3L/tests.js
 * 160701
 *  @1706 new _rCls_Lsts()   STABLE & TESTED
 *  @1525 NOTBROKE - tests 3-5 break because there is no function YET to recompute the three lists
 *  @1500 STABLE and TESTS requiring(crnt_limits.js)
 *  @1349 using requires for current rClass beg and end.
 *  @1055  trying to test main but do not know how to apply test to main
 */

var crnt = require('./crnt_limits.js');
var test = require('tape');
var R = require('ramda');

// test data
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var stub_cL = {beg: 3, end: 4};// stub_crntLimits`
// test code
var _rCls_Lsts = chptVerses => crntLmts => {
    var RET = [];
    var CUT = R.splitAt(crnt._beg(crntLmts))(chptVerses);
    var pst = R.flatten(CUT[0]) ;
    var cf = R.flatten(CUT[1]) ;
    CUT = R.splitAt(crnt._span(crntLmts))(cf);
    var cur = R.flatten(CUT[0]);
    var fut =R.flatten(CUT[1]);
    RET = R.append(pst)(RET); //pst
    RET = R.append(cur, RET);
    RET = R.append(fut, RET);
    return RET
};
var noop;

test('exp pst,cur,end for{beg:3, end:4}', function (t) {
    stub_cL = {beg: 3, end: 4};
    RET = _rCls_Lsts(stubVerses)(stub_cL);
    t.equal(RET[0].length, crnt._beg(stub_cL));
    t.equal(RET[1].length, crnt._span(stub_cL));
    t.equal(RET[2].length, stubList.length - crnt._end(stub_cL));
    t.end();
});
test('exp pst,cur,end for{beg:6, end:8}', function (t) {
    stub_cL = {beg: 6, end: 8};
    RET = _rCls_Lsts(stubVerses)(stub_cL);
    t.equal(RET[0].length, crnt._beg(stub_cL));
    t.equal(RET[1].length, crnt._span(stub_cL));
    t.equal(RET[2].length, stubList.length - crnt._end(stub_cL));
    t.end();
});
