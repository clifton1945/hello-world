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
var h = require('./h');
// HELPER Functions
var fix_a_decimalPoint = h.N_TO_N_Fixed_BY_N;
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
 *  ----- ----- f_weight_aCSD:: ((S, a) -> CSD)  ->  CSD
 *  f_weight_aCSD Fn:((S_key, N_valu)-> CSD)) ->  CSD             -----
 *      f_weight_aCSD = (key, valu)  -> CSD  -> CSD w/ mutated style object
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
var f_weight_a_fontSizCSD = function (n_wt) { // N_wt -> Fn:(N) -> CSD -> CSD_weighted
    var f_N_to_ = R.compose(
        weight_aCSD('fontSize', R.__), // S_wt -> CSD
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
var f_weight_a_opacityCSD = function (n_wt) { // N_wt -> Fn:(N) -> CSD -> CSD_weighted
    var f_N_to_ = R.compose(
        weight_aCSD('opacity', R.__), // S_wt -> CSD
        _opacityFrmttr // N_wt -> S_wt
    );
    return f_N_to_(n_wt)
};
const weight_a_opacityCSD = R.curry(f_weight_a_opacityCSD);

/**
 *      ----- ----- f_weight_aCSD::  N_wt -> FN:(D -> D)           -----
 *      f_weight_aCSD = function ( n_wt) -> Fn::(CSD)  -> CSD w MUTATED Style&& returns the CSD
 * @param weight
 * @return {*} same CSD with a mutated CSD
 */
var f_weight_aCSD = function f_weight_aCSD(weight) {
    var fn = R.compose(
        weight_a_fontSizCSD(weight),
        weight_a_opacityCSD(weight)
    );
    return fn;
};

//NOW set_weighted_CSD:: CSD -> n_wt  ->  CSD
/**
 *      ----- set_weighted_CSD:: CSD -> N  ->  CSD
 */
var set_weighted_CSD = R.curry(( d_csd, n_wt) => f_weight_aCSD(n_wt)(d_csd));

// -------------------- EXPORTS ----------------------------
exports.set_weighted_CSD = R.curry(set_weighted_CSD);//  CSD -> N_wt  ->  CSD

// some tests
var CUT = R.curry(f_weight_aCSD);
assert.ok(weight_a_fontSizCSD(.6) instanceof Function, `f_weight_a_fontSizCSD(N) -> IS a Function.`);
assert.equal(weight_a_fontSizCSD(.6).length, 1, `f_weight_a_fontSizCSD valence IS 1`);
assert.ok(R.not(weight_a_fontSizCSD(.6)({}) instanceof Function), `f_weight_a_fontSizCSD(N)({}) IS NOT a Function`);
// now normal N -> S
assert.equal(CUT(.6)().fontSize, "60%", 'set_the_weightedCSD({})(.6).fontSize -> "60%". NOTE: 2nd param is empty!!');
assert.equal(CUT(.6)({}).opacity, "0.600", 'set_the_weightedCSD(.6)({}).opacity -> "0.600"');
assert.equal(CUT(.6)({tst: 1234}).tst, 1234, 'ADD another CSD.key: tst. _CSD_to_CSD_weighted_w_(N)({tst:1234}');
// EDGES
assert.notEqual(CUT(.6, {}).opacity, "0.600", 'set_the_weightedCSD(.6, {}) with a comma  RATHER THAN (0.6)({})  BREAKS ');
// NOW CUT IS set_weighted_CSD
CUT = set_weighted_CSD({});
assert.equal(CUT(.6).fontSize, "60%", 'set_the_weightedCSD({})(.6).fontSize -> "60%". NOTE: 2nd param is empty!!');
assert.equal(CUT(.6).opacity, "0.600", 'set_the_weightedCSD(.6)({}).opacity -> "0.600"');
assert.equal(set_weighted_CSD({tst: 1234})(.6).tst, 1234, 'ADD another CSD.key: tst. _CSD_to_CSD_weighted_w_(N)({tst:1234}');





