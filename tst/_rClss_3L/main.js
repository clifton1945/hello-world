/**
 *  * tst/_rClss_3L/main.js
 * 160701  develop getting L:[] -> L[L:pst], [L:cur], [L:pst]]
 *  @10:55  trying to test main but do not know how to apply test to main
 *  @1016 Std setup and first commit
 */

var R = require('ramda');
var test = require('./tests');

var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var stub_curRngeD = {beg: 3, end: 4};
CUT = R.splitAt(stub_curRngeD.beg)( stubVerses);
var pst = CUT[0];
var span = stub_curRngeD.end - stub_curRngeD.beg;
var CUT = R.splitAt(span)(CUT[1]);
var cur = CUT[0];
var fut = CUT[1];
test.test; // NG  how call tests ??
var noop;

