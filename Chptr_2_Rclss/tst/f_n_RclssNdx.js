/**
 * f_n_RclssNdx
 * 7/6/2016 @ 0706 create
 *  @0835 structure set and pseudo test set up. Now ADD the 3 ChptNdx -> RclssNdx functions
 * this will transform n_ChptNdx -> n_RclssNdx.
 *
 */
"use strict";
var R = require('ramda');
var h = require('../src/h');

let x;

/**
 *      f_n_RclssNdx:: (D:curScope, N:chptNdx) -> N:rclssNdx
 *
 */
const f_n_RclssNdx = R.curry(function f_n_RclssNdx(d_curScope, n_chptNdx) {
    return h.isPst(d_curScope)(n_chptNdx) ? 'pst' :
        h.isCur(d_curScope)(n_chptNdx) ? 'cur' :
            h.isFut(d_curScope)(n_chptNdx) ? 'fut' :
                `f_n_RclssNdx() is broken. 
                d_curScope dict keys must be "begNdx" && "endNdx" `
});
var test = require('tape');

var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
// TESTS
test(` #0 :beg:3, end:4, `, function (t) {
    var stub_curRngeD = {begNdx: 3, endNdx: 4};
    var TST = f_n_RclssNdx(stub_curRngeD, R.__);
    t.equals(TST(0), 'pst');
    t.equals(TST(3), 'cur');
    t.equals(TST(4), 'cur');
    t.equals(TST(7), 'fut');
    t.end();
});

