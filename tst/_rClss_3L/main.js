/**
 *  * tst/_rClss_3L/main.js
 *  160702
 *      @2122 ADDED var nWt_ = require('./f_n_a_Wter.js') STABLE WORKS
 * 160701  develop getting L:[] -> L[L:pst], [L:cur], [L:pst]]
 *  @10:55  trying to test main but do not know how to apply test to main
 *  @1016 Std setup and first commit
 */

var R = require('ramda');
var test = require('tape');

// var test = require('./rClssTester.js');

var nWt_ = require('./f_a_Wter.js');

test("*********** _n_Wter_('fut')->", function (t) {
    t.equals(nWt_('fut')([0, 1, 3], 0), 1);
    t.end();
});