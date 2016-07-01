/**
 * _rClss_3L/tests.js
 * 160701
 *  @1525 BROKEN - tests 3-5 break because there is no function YET to recompute the three lists
 *  @1500 STABLE and TESTS requiring(crnt_limits.js)
 *  @1349 using requires for current rClass beg and end.
 *  @1055  trying to test main but do not know how to apply test to main
 */

var crnt  = require('./crnt_limits.js');
var test = require('tape');
var R = require('ramda');

// test data
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var stub_cL =  {beg: 3, end: 4};// stub_crntLimits`
// test code

var CUT = R.splitAt(crnt._beg(stub_cL))( stubVerses);
var pst = CUT[0];
CUT = R.splitAt(crnt._span(stub_cL))(CUT[1]);
var cur = CUT[0];
var fut = CUT[1];
var noop;

test('exp pst,cur,end for{beg:3, end:4}', function (t) {
    stub_cL =  {beg: 3, end: 4};
    t.equal(pst.length, crnt._beg(stub_cL));
    t.equal(cur.length, crnt._span(stub_cL));
    t.equal(fut.length, stubList.length - crnt._end(stub_cL) );
    t.end();
});
test('exp pst,cur,end for{beg:6, end:8}', function (t) {
    stub_cL =  {beg: 6, end: 8};
    t.equal(pst.length, crnt._beg(stub_cL));
    t.equal(cur.length, crnt._span(stub_cL));
    t.equal(fut.length, stubList.length - crnt._end(stub_cL) );
    t.end();
});
