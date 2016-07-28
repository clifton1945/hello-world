/**
 * Created by CLIF on 7/28/2016.
 */
/**
 * csdValueS.js
 * 160723   @1715 -> STABLE  module.exports = { _a_csdValu_opacity, _a_csdValu_fontSize}
 * IN THE END -> csdValueS.js produces Fn:: N:wt -> D:inCsd -> D:outCsd
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
let _opacityFrmttr = require('./csdFrmtters')._opacityFrmttr;//        N:wt -> S:wt
let _fontSizeFrmttr = require('./csdFrmtters')._fontSizeFrmttr; //     N:wt -> S:wt

//  TEST DATA

/**
 * _a_frmt_value:: (Fn:propFrmttr, N:wt) || Fn:propFrmttr -> N:wt -> S:wt
 *
 * @param propFrmttr
 * @param wtN
 * @returns wtS
 */
const f_a_frmt_value = function f_a_frmt_value(propFrmttr, wtN) { return propFrmttr(wtN)};// (Fn, N) -> S
const _a_frmt_value = R.curry(f_a_frmt_value); //:: Fn:propFrmttr -> N:wt -> S:wt
var a_frmt_value_opacity = _a_frmt_value(_opacityFrmttr);// N -> S
        // asserts
        assert.equal(a_frmt_value_opacity(0.6), "0.600", 'a_frmt_value_opacity(.6) -> "0.600" from _a_frmt_value()');
/**
 *      _a_csdValu:: (S, Fn) || S -> Fn  -> N -> D:inCsd -> D:outCsd
 * @param lensNameS
 * @param f_frmt
 * @param wtN
 */
const f_a_csdValu = function (lensNameS, f_frmt, wtN) {
    return R.set(R.lensProp(lensNameS), _a_frmt_value(f_frmt)(wtN))};// (S, F, N) -> F:(D -> D:csd)
const _a_csdValu = R.curry(f_a_csdValu);//      S -> Fn -> N  -> F:(D -> D:csd)
/**
 *
 */
const _a_csdValu_opacity = _a_csdValu('opacity', _opacityFrmttr);//         N:wt -> D:inD -> D:outD
const _a_csdValu_fontSize = _a_csdValu('fontSize', _fontSizeFrmttr);//      N:wt -> D:inD -> D:outD
    // asserts
    assert.equal(_a_csdValu_opacity(.6)({}).opacity,"0.600", '_a_csdValu_opacity');
    assert.equal(_a_csdValu_fontSize(.6)({}).fontSize,"60%", '_a_csdValu_fontSize');
/**
 * -----------------------  EXPORTS --------------------
 */
module.exports = { _a_csdValu_opacity, _a_csdValu_fontSize};
