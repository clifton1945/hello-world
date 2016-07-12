/**
 * f_d_evolveDict.js
 * 160712 -> @1235 ADDED wt_fontSize_prcnt && for the future wt_fontSize_px && test.2
 * 160707
 *  WIP STABLE and 1st test
 */
"use strict";
let R = require('ramda');

// ---------------------- Code Under Test: f_d_evolveDict
/**
 *      f_d_evolveDict: D:dObj, N:nScaler -> D:dObj
 */
const f_d_evolveDict = R.curry(function (dObj, n_Scale) {
    var wt_opacity = R.compose(R.toString, R.multiply(n_Scale), parseFloat);
    var wt_fontSize_prcnt = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(n_Scale), parseFloat);
    // below: wt_fontSize_px is used in getComputerStyles CSD's
    // var wt_fontSize_px = R.compose(R.flip(R.concat)('px'), R.toString, R.multiply(n_Scale), parseFloat);
    var transform = {
        opacity: wt_opacity,
        fontSize: wt_fontSize_prcnt
    };
    return R.evolve(transform, dObj); //=> D->N->D
});
module.exports ={f_d_evolveDict};
// ---------------------- test: f_d_evolveDict
let test = require('tape');
test("0 f_d_evolveDict/ opacity:1->'0.5'", function(t) {
    t.deepEquals(f_d_evolveDict({opacity:"1"}, 0.5), {opacity: "0.5"}, '> opacity:".5"');
    t.deepEquals(f_d_evolveDict({fontSize:"100%"}, 0.5), {fontSize: "50%"}, '> fontSize:"50%"');
    t.end();
});
