/**
 * f_n_RclssNdx -> 160708 @ 0813  Test is broken because I changed the export from h.js
 * 160707
 *  @0835 stable and tested I think. May no use in it entirety 
 *
 */
"use strict";
var R = require('ramda');
var h = require('../src/h');

let f_n_cur_RclssNdx = function (n_beg, n_end, n_ndx){
  return 3
};

/**
 *      f_n_RclssNdx:: (D:curScope, N:chptNdx) -> N:rclssNdx
 *
 */
const f_n_RclssNdx = R.curry(function f_n_RclssNdx(d_curScope, n_chptNdx) {
    return h.isPst(d_curScope)(n_chptNdx) ? n_chptNdx :
        h.isCur(d_curScope)(n_chptNdx) ? 1 + n_chptNdx - d_curScope.endNdx :
            h.isFut(d_curScope)(n_chptNdx) ? 2 + n_chptNdx  - d_curScope.endNdx - d_curScope.begNdx :
                `f_n_RclssNdx() is broken. 
                d_curScope dict keys must be "begNdx" && "endNdx" `
});
var test = require('tape');

var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
// TESTS
test(` #0 :beg:3, end:4, `, function (t) {
    var stub_curRngeD = {begNdx: 3, endNdx: 4};
    var TST = f_n_RclssNdx(stub_curRngeD, R.__);
    t.equals(TST(0), 0);
    t.equals(TST(1), 1);
    t.equals(TST(2), 2);
    t.equals(TST(3), 0);
    t.equals(TST(4), 1);
    t.equals(TST(5), 0);
    t.equals(TST(6), 1);
    t.end();
});

