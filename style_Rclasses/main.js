/**
 *  _rClss_Wter/main.js
 *  160704
 *  @1115   ADDED new structure: \src && \fut AND TEST  f_n_Wter is STABLE
 *  160702
 *      @2141 REFACTED names of weighter file and require in main. Now all use f_n_Wter.
 *      @2122 ADDED var nWt_ = require('./f_n_a_Wter.js') STABLE WORKS
 * 160701  develop getting L:[] -> L[L:pst], [L:cur], [L:pst]]
 *  @10:55  trying to test main but do not know how to apply test to main
 *  @1016 Std setup and first commit
 */
var R = require('ramda');

/**
 *      requires( the equivalent of f_n_Wter() FROM './f_n_Wter_'
 * @type {f_n_Wter_}
 * @private
 */
var Wter = require('./src/f_n_Wter_');

var test = require('tape');
test("*********** _n_Wter_('fut')->", function (t) {
    t.equals(Wter.f_n_Wter_('fut')([0, 1, 3], 0), 1);
    t.end();
});