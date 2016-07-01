/**
 *  * tst/_rClss_3L/main.js
 * 160701  develop getting L:[] -> L[L:pst], [L:cur], [L:pst]]
 *  @1016 Std setup and first commit
 */

var R = require('ramda');
var test = require('./tests');

var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var stubVerses = stubList;
var stub_curRngeD = {beg: 4, end: 5};
CUT = R.splitAt(stub_curRngeD.beg)( stubVerses);

