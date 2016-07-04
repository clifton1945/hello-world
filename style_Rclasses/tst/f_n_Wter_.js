/**
 * \src\... && \tst\f_n_Wter_.js
 *  160704
 *      @1045 STRUCTURED code: \src\.. and  \tst\.. &&  STABLE TESTS
 *      @0957 MOVED TO tst\
 *      @0822 TEST true TABLE
 */
"use strict";

// CODE UNDER TEST aka CUT
var R = require('ramda');
var Wter = require('../src/f_n_Wter_');
// var denom = require('../src/f_n_Wter_');
// TESTS
var test = require('tape');
var skip = {skip: false};
test("Wter.f_n_Len::-> N ", skip, function (t) {
    // referenceError:    f_n_Len is not defined
    t.equals(Wter.f_n_Len ([0, 1, 2, 3, 4, 5]), 6, "n_Len w/ L:[,,,,,] ");
    t.end();
});
test("Wter.f_n_Wter_('pst')::(L,N)-> N. ", skip, function (t) {
    t.equals(Wter.f_n_Wter_('pst')([], 0), 1, "([],0)->1");
    t.equals(Wter.f_n_Wter_('pst')([0, 1, 2, 3], 0), 0.25, "([0,1,2,3],0)->1/4");
    t.equals(Wter.f_n_Wter_('pst')([0, 1, 2, 3], 3), 1, "([0,1,2,3],3)->1");
    t.end();
});
test("Wter.f_n_Wter__fut::(L,N)-> N. ", skip, function (t) {
    t.equals(Wter.f_n_Wter_('fut')([], 0), 1, "([],0)->1");
    t.equals(Wter.f_n_Wter_('fut')([0, 1, 2, 3], 0), 1, "([0,1,2,3],0)->1");
    t.equals(Wter.f_n_Wter_('fut')([0, 1, 2, 3], 3), 0.25, "([0,1,2,3],3)->1/4");
    t.end();
});

