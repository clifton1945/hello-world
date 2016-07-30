/**
 * csdValueS.js
 * 160730   @1330  WIP. revamp as composition given N_valu from _calc_N_valu()
 *  the process pipe: for a CSD_S_name
 *      N_valu -> _frmt_CSD_op(S_name_frmttr) -> S_valu -> _set_CSD_valu(S_nameLens, {}) -> CSD_valu
 * 160723   @1715 -> STABLE  module.exports = { _a_csdValu_opacity, _a_csdValu_fontSize}
 * IN THE END -> csdValueS.js produces Fn:: N:wt -> D:inCsd -> D:outCsd
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
// BASE && HELPER FUNCTIONS
let _opacityFrmttr = require('./csdFrmtters')._opacityFrmttr;//        N:wt -> S:wt
let _fontSizeFrmttr = require('./csdFrmtters')._fontSizeFrmttr; //     N:wt -> S:wt
let _opacityLens = R.lensProp('opacity');//         -> Lens
let _fontSizeLens = R.lensProp('fontSize');//       -> Lens
//  TEST DATA
var stub_N_ndx = 0;
var stub_L_fam = [0, 1, 2, 3, 4, 5, 6];

// BASE && HELPER FUNCTIONS
/**
 *          _a_frmttd_value:: (Fn:propFrmttr, N:wt) || Fn:propFrmttr -> N:wt -> S:wt
 *
 * @param propFrmttr
 * @param wtN
 * @returns wtS
 */
const f_a_frmttd_value = function f_a_frmttd_value(propFrmttr, wtN) { return propFrmttr(wtN)};// (Fn, N) -> S
const _a_frmttd_value = R.curry(f_a_frmttd_value); //:: Fn:propFrmttr -> N:wt -> S:wt
        // confirm _a_frmttd_value WORKS

/**
 *      _a_csdValu:: ((S, Fn) || S -> Fn) -> N -> D:inCsd  ->  D:outCsd
 *      USE: sets S:property lensName
 * @param lensNameS
 * @param f_frmt
 * @param wtN
 */
const f_a_csdValu = function f_a_csdValu (lensNameS, f_frmt, wtN) {
    return R.set(R.lensProp(lensNameS), _a_frmttd_value(f_frmt)(wtN))};// (S, F, N) -> F:(D -> D:csd)
const _a_csdValu = R.curry(f_a_csdValu);//      S -> Fn -> N  -> F:(D -> D:csd)




/**
 *  NOW PRE FORMED opacity and fontSize
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
