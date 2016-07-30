/**
 * set_CSD_values  HAS _a_CSD_valu_opacity() AND _a_CSD_valu_fontSize()
 * 160730   @1355 -> STABLE &&  RENAMED
 *      @1350 STABLE revamped as composition given N_valu from _calc_N_valu()
 *      @1330  WIP. revamp as composition given N_valu from _calc_N_valu()
 *  the process pipe: for a CSD_S_name
 *      N_valu -> _frmt_CSD_op(S_name_frmttr) -> S_valu -> _set_CSD_valu(S_nameLens, {}) -> CSD_valu
 * 160723   @1715 -> STABLE  module.exports = { _a_CSD_valu_opacity, _a_CSD_valu_fontSize}
 * IN THE END -> set_CSD_values.js produces Fn:: N:wt -> D:inCsd -> D:outCsd
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
// BASE && HELPER FUNCTIONS
let _opacityFrmttr = require('./csdFrmtters')._opacityFrmttr;//        N_valu -> S_valu
let _fontSizeFrmttr = require('./csdFrmtters')._fontSizeFrmttr; //     N_valu -> S_valu
let _opacityLens = R.lensProp('opacity');//         -> Lens
let _fontSizeLens = R.lensProp('fontSize');//       -> Lens
//  TEST DATA
var stub_N_ndx = 0;
var stub_L_fam = [0, 1, 2, 3, 4, 5, 6];

// BASE && HELPER FUNCTIONS
const set_CSD_opacityValu = R.set(_opacityLens, R.__, {});// S_valu -> CSD_valu
const set_CSD_fontSizeValu = R.set(_fontSizeLens, R.__, {});// S_valu -> CSD_valu

const _a_CSD_valu_opacity = R.compose(set_CSD_opacityValu, _opacityFrmttr);
const _a_CSD_valu_fontSize = R.compose(set_CSD_fontSizeValu, _fontSizeFrmttr);//      N:wt -> D:inD -> D:outD
    //asserts
    assert.equal(_a_CSD_valu_opacity(.6).opacity,"0.600", '_a_CSD_valu_opacity');
    assert.equal(_a_CSD_valu_fontSize(.6).fontSize,"60%", '_a_CSD_valu_fontSize');


/**
 * -----------------------  EXPORTS --------------------
 */
module.exports = { _a_CSD_valu_opacity, _a_CSD_valu_fontSize};
