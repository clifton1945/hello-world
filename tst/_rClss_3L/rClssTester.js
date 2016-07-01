/**
 * _rClss_3L/tests.js
 * 160701
 *  @1500 STABLE and TESTS requiring(crnt_limits.js)
 *  @1349 using requires for current rClass beg and end.
 *  @1055  trying to test main but do not know how to apply test to main
 */

var test = require('tape');
var R = require('ramda');
var crnt  = require('./crnt_limits.js');
// test data
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var stub_crntLimits =  {beg: 3, end: 4};
var stub_crntBeg = crnt._beg(stub_crntLimits);
var stub_crntEnd = crnt._end(stub_crntLimits);
var stub_crntSpan = crnt._span(stub_crntLimits);
// test code

var CUT = R.splitAt(stub_crntBeg)( stubVerses);
var pst = CUT[0];
test.pst = pst;
CUT = R.splitAt(stub_crntSpan)(CUT[1]);
var cur = CUT[0];
var fut = CUT[1];
var noop;
test('exp pst:3, cur:1, fut:5', function (t) {
    t.equal(pst.length, stub_crntBeg);
    t.equal(cur.length, 1);
    t.equal(fut.length, 5);
    t.end();
});
