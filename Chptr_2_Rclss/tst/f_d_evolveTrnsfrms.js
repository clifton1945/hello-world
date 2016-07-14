/**
 *  f_d_evolveTrnsfrms.js
 * 160714 @1710 ->  STILL DO NOT KNOW HOW TO partial a trandformation
 *  @1311 stable test("0  *****  R.partial(_scaleN) -> _ndxd_scaleN  *****"
 *  @1029 -> NEW f_d_evolveTrnsfrms branched from f_d_transforms.js branched from f_evolve_Trnsfrms.js
 */
"use strict";
let R = require('ramda');
// these are my base transform functions named for convenience:
const _scaleN = R.multiply;// N -> N -> N
const _offsetN = R.add; // N -> N -> N

// ---------------------- test: f_evolve_Trnsfrms
let test = require('tape');
test("0  *****  R.partial(_scaleN) :f_evolve_Trnsfrms *****", function (t) {
    var _ndxd_scaleN = R.partial(_scaleN); // preload/partial
    var passedInPropValu = '1';
    t.deepEquals(_ndxd_scaleN([.5])(passedInPropValu), .5, " _ndxd_scaleN:'1'->'0.5'");
    t.end();
});
test("1  *****  revolve(_scaleN) the F:_scaleN :f_evolve_Trnsfrms *****", function (t) {
    var scale_CsdD = {scale: _scaleN}; //
    // var scale_CsdD_Trnsfrms = {scale: R.tap(_scaleN)};
    var revolve = R.flip(R.evolve);// NOTE: FLIPPED evolve::(trgtDict, trgtTrnsfrm) -> trgtDict
    var CUT = revolve(scale_CsdD)( {scale: R.tap(_scaleN)}); // exp return the orig _scaleN:
    t.deepEquals(CUT.scale(1)(1), 1, " scale: tap 1 -> 1");
    // CUT = revolve(scale_CsdD)({scale: R.partial([.5])}); // BROKEN exp return the orig _scaleN:
    CUT = revolve(scale_CsdD)({scale: R.flip(R.partialRight)([.5])}); // exp .5 * 2nd param:
    t.deepEquals(CUT.scale(1), 0.5, " scale:R.flip(R.partialRight)[.5]1 -> 0.5");
    t.end();
});
test("2  *****  revolve(new_scaleN) the F:_scaleN :f_evolve_Trnsfrms *****", function (t) {
    var new_scaleN = R.curry(function new_scaleN (wt){ return R.multiply(wt)});
    var scale_CsdD = {scale: new_scaleN}; //
    // var scale_CsdD_Trnsfrms = {scale: R.tap(_scaleN)};
    var revolve = R.flip(R.evolve);// NOTE: FLIPPED evolve::param NOW (trgtDict, trgtTrnsfrm) -> trgtDict
    // var newDict = revolve(scale_CsdD)( {scale: R.tap(new_scaleN)}); // exp return the orig func
    // t.deepEquals(newDict.scale(0.8)(1), 0.8, " scale: tap 1 -> 0.8");

    var newDict = revolve(scale_CsdD)({scale: R.flip(R.partialRight)([.5])}); // exp .5 * 2nd param:
    t.deepEquals(newDict.scale(.8), 0.4, "BROKEN ???  1 -> 0.5");
    t.end();
});
// --------------------- ON HOLD BUT DO NOT FORGET
// var _scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);


