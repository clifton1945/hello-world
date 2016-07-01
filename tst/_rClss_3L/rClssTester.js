/**
 * _rClss_3L/tests.js
 * 160701
 *  @1349 using requires for current rClass beg and end.
 *  @1055  trying to test main but do not know how to apply test to main
 */

var test = require('tape');
var R = require('ramda');
var crnt  = require('./_rClss_Lists.js');

var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var stub_curRngeD = {beg: 3, end: 4};

var CUT = R.splitAt(crnt._curBeg(stub_curRngeD))( stubVerses);
var pst = CUT[0];
test.pst = pst;
var span = crnt._curSpan(stub_curRngeD);
CUT = R.splitAt(span)(CUT[1]);
var cur = CUT[0];
var fut = CUT[1];
var noop;
test('exp pst:3, cur:1, fut:5', function (t) {
    t.equal(pst.length, 3);
    t.equal(cur.length, 1);
    t.equal(fut.length, 5);
    t.end();
});
