/**
 *  f_d_evolveTrnsfrms.js
 * 160714 @1311 stable test("0  *****  R.partial(_scaleN) -> _ndxd_scaleN  *****"
 *  @1029 -> NEW f_d_evolveTrnsfrms branched from f_d_transforms.js branched from f_evolve_Trnsfrms.js
 */
"use strict";
let R = require('ramda');
var stubScale = R.identity(.5); // why not just use .5????
var stubOffset = R.identity(-0.6);
// these are the base transform functions named for convenience:
// fix maybe should use R.partial on the 3 below
const _setScale = f => f(stubScale);
const _set = (f) => (n) => f(n);
const xD = {
    _scaleN: (f) => (n) => f(n),
    _offsetN: (f) => (n) => f(n),
};
// these are my base transform functions named for convenience:
const _scaleN = R.multiply;// N -> N -> N
const _offsetN = R.add; // N -> N -> N
// ---------------------- Code Under Test: f_evolve_Trnsfrms
const transformsD = {
    scale: _scaleN,
    offset: _offsetN
};

/**
 *      f_evolve_Trnsfrms:: F:{k:{v->v}} -> D:{k:v} -> D:{k:v}
 *      D:{k:v}transformsD, D:dCSD, N:nScale -> D:dCSD
 *  scales CSD properties hardcoded into this D:: transformsD
 *  some configurations of this might include:
 *      transformsD as parameter,
 * @param dCSD ->
 * @return dCSD
 * @param transformsD
 */
// const f_evolve_Trnsfrms = function f_evolve_Trnsfrms(transformsD, dCSD) {
//     return R.evolve(_set(.5), transformsD); //F:{k:{v->v}} -> D:{k:v} -> D:{k:v}
// };


// ---------------------- test: f_evolve_Trnsfrms
let test = require('tape');
test("0  *****  R.partial(_scaleN) :f_evolve_Trnsfrms *****", function (t) {
    // var _ndxd_scaleN = R.partial(_scaleN, [.5]); // preload/partial
    var _ndxd_scaleN = R.partial(_scaleN); // preload/partial
    t.deepEquals(_ndxd_scaleN([.5])('1'), .5, " _ndxd_scaleN:'1'->'0.5'");
    t.end();
});
// test("1  *****  R.evolve(_scaleN) :f_evolve_Trnsfrms *****", function (t) {
//     var trnsfrms4_CsdD = {scale: _scaleN, offset: _offsetN}; //
//     var trnsfrms4_Trnsfrms = {_scaleN: };
//     var _ndxd_scaleN = R.partial(_scaleN)([.5]); // preload/partial
//     var CUT = R.evolve(()=> {
//     })(transformsD);
//     t.deepEquals(_ndxd_scaleN('1'), .5, " _ndxd_scaleN:'1'->'0.5'");
//     t.end();
// });
// --------------------- ON HOLD BUT DO NOT FORGET
// var _scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);


