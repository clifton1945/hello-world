/**
 *  set_the_weightedCSD:: (N -> El  -> El)
 *  160822  @2100 STABLE w/ TESTS
 *  @1805 - STABLE w/ a few tests.
 * FILE: set_the_weightedCSD.js.
 */
"use strict";
// requires
var R = require('ramda');
var assert = require('assert');
// HELPER Functions
var fix_a_decimalPoint = require('./h').N_TO_N_Fixed_BY_N;
/**
 *      _opacityFrmttr:: N_valu -> S_valu
 *      formats opacity N_valu. Typically from a previous _calcWt call.
 // * @param f_calcWt
 * @private
 */
const _opacityFrmttr = fix_a_decimalPoint(3);// N_valu -> S_valu
/**
 *      _fontSizeFrmttr:: N_valu -> S_valu
 *       formats opacity N_valu. Typically from a previous _calcWt call.
 *       TRANSFORM: [
 * @param f_calcWt
 * @private
 */
const _fontSizeFrmttr = R.compose(R.flip(R.concat)('%'), fix_a_decimalPoint(0), R.multiply(100)); // N_valu -> S_valu
/**
 *  ----- ----- f_weight_aCSD:: ((S, a) -> SPAN)  ->  SPAN
 *  f_weight_aCSD Fn:((S_key, N_valu)-> SPAN)) ->  SPAN             -----
 *      f_weight_aCSD = (key, valu)  -> SPAN  -> SPAN w/ mutated style object
 * @param key -> CSD property String
 * @param valu -> CSD property value
 */
var f_weight_aCSD = function (key, valu) {
    // reference: R.assoc::  String -> a -> {k:v} -> {k:v}
    return R.assoc(key, valu);//
};
var weight_aCSD = R.curry(f_weight_aCSD);
/**
 *  ----- ----- f_weight_a_fontSizCSD:: N ->  CSD
 * @param n_wt
 * @return {*}
 */
var f_weight_a_fontSizCSD = function (n_wt) { // N_wt -> Fn:(N) -> SPAN -> SPAN_weighted
    var f_N_to_ = R.compose(
        weight_aCSD('fontSize', R.__), // S_wt -> SPAN
        _fontSizeFrmttr // N_wt -> S_wt
    );
    return f_N_to_(n_wt)
};
const weight_a_fontSizCSD = R.curry(f_weight_a_fontSizCSD);
/**
 *  ----- ----- f_weight_a_opacityCSD:: N -> CSD
 * @param n_wt
 * @return {*}
 */
var f_weight_a_opacityCSD = function (n_wt) { // N_wt -> Fn:(N) -> SPAN -> SPAN_weighted
    var f_N_to_ = R.compose(
        weight_aCSD('opacity', R.__), // S_wt -> SPAN
        _opacityFrmttr // N_wt -> S_wt
    );
    return f_N_to_(n_wt)
};
const weight_a_opacityCSD = R.curry(f_weight_a_opacityCSD);
/**
 *      ----- ----- set_the_weightedCSD::  N_wt -> FN:(            -----
 *      f_set_the_weightedCSD = function ( n_wt) -> Fn::(CSD)  -> SPAN w MUTATED Style&& returns the CSD
 * @param span
 * @param weight
 * @return {*} same SPAN with a mutated CSD
 */
var f_set_the_weightedCSD = function f_set_the_weightedCSD(weight) {
    var csd = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]; // sets a default initial CSD
    var fn = R.compose(weight_a_fontSizCSD(weight, csd), weight_a_opacityCSD(weight, csd));
    return fn;
};
exports.set_the_weightedCSD = R.curry(f_set_the_weightedCSD);// (N_wt) -> CSD  -> CSD

// some tests
var CUT = R.curry(f_set_the_weightedCSD);
assert.ok(weight_a_fontSizCSD(.6) instanceof Function, `f_weight_a_fontSizCSD(N) -> IS a Function.`);
assert.equal(weight_a_fontSizCSD(.6).length, 1, `f_weight_a_fontSizCSD valence IS 1`);
assert.ok(R.not(weight_a_fontSizCSD(.6)({}) instanceof Function), `f_weight_a_fontSizCSD(N)({}) IS NOT a Function`);
// now normal N -> S
assert.equal(CUT(.6)().fontSize, "60%", 'set_the_weightedCSD(.6)().fontSize -> "60%". NOTE: no arg for 2nd param.');
assert.equal(CUT(.6)({}).opacity, "0.600", 'set_the_weightedCSD(.6)({}).opacity -> "0.600"');
assert.notEqual(CUT(.6, {}).opacity, "0.600", 'set_the_weightedCSD(.6, {}) with a comma  RATHER THAN (0.6)({})  BREAKS ');
assert.equal(CUT(.6)({tst: 1234}).tst, 1234, 'ADD another CSD.key: tst. _CSD_to_CSD_weighted_w_(N)({tst:1234}');






