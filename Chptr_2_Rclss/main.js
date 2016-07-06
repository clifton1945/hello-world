/**
 *  Chptr_2_Rclss/main.js
 *  160706
 *      @0635  required _s_RclssName works and stable
 *  160705 @1252  new file
 */
var R = require('ramda');
var _s_RclssName  = require('./tst/f_s_RclssName');
var h = require('./src/h');
// tests
var test = require('tape');
test("***** Chptr_2_Rclss/main ****** >", function (t) {
    var TST = h.isPst({begNdx:2, endNdx:4});
    t.equals(TST(0), true, 'ndx:0->isPst');
    t.end();
});
