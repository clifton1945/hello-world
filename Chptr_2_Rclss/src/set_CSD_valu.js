/**
 * set_CSD_valu:: N_wt -> CSD_init ->_CSD_opacity() ->CSD_fontSize
 * 160813   @2045   -> ready to REFACT this as noted above: N->D->D ->D
 *  with two helper Fn: CSD::(lens, frmter) -> N_wt -> CSD
 *  a HTMLElement has a .style PROPERTY has a CSSStyleDeclaration OBJECT
 * 160805   @1025   -> ADDED _lineHeight transforms as fn(N_valu) here. some REFACT is other files.
 * 160730   @1530   -> STABLE &&  RENAMED brought CSD FRMTTERS.JS into THIS
 *      @1350 STABLE revamped as composition given N_valu from _calc_N_valu()
 *      @1330  WIP. revamp as composition given N_valu from _calc_N_valu()
 * IN THE END -> set_CSD_valu.js fn(N_valu)  ->  CSD_valu
 */
"use strict";

// requires
var R = require('ramda');
var assert = require('assert');
// var myTap = require('./h').myTap;
var _N_Fixed_BY_N = require('./h').N_TO_N_Fixed_BY_N;

/**
 *      _lineHeightFrmttr:: N_valu -> S_valu
 *      _lineHeightFrmttr (N_valu) -> reduces to 3/4 of the fontSize
 *      formats lineHeight N_valu. Typically from a previous _calcWt call.
 *      TRANSFORM [.3
 // * @param f_calcWt
 * @private
 */
const _lineHeightFrmttr = R.compose(R.flip(R.concat)('%'), _N_Fixed_BY_N(0), R.multiply(75));// N_valu -> S_valu
/**
 *      _opacityFrmttr:: N_valu -> S_valu
 *      formats opacity N_valu. Typically from a previous _calcWt call.
 // * @param f_calcWt
 * @private
 */
const _opacityFrmttr = _N_Fixed_BY_N(3);// N_valu -> S_valu
/**
 *      _fontSizeFrmttr:: N_valu -> S_valu
 *       formats opacity N_valu. Typically from a previous _calcWt call.
 *       TRANSFORM: [
 * @param f_calcWt
 * @private
 */
const _fontSizeFrmttr = R.compose(R.flip(R.concat)('%'), _N_Fixed_BY_N(0), R.multiply(100)); // N_valu -> S_valu

let _opacityLens = R.lensProp('opacity');//         -> Lens
let _fontSizeLens = R.lensProp('fontSize');//       -> Lens
// let _lineHeightLens = R.lensProp('lineHeight');//    -> Lens

// BASE && HELPER FUNCTIONS
/**
 *       set_CSD_opacityValu => (_opacityLens, R.__, {})::  (S_valu) -> CSD_valu
 */
const set_CSD_opacityValu = R.set(_opacityLens, R.__, {});// S_valu -> CSD_valu
const set_CSD_fontSizeValu = R.set(_fontSizeLens, R.__, {});// S_valu -> CSD_valu
// const set_CSD_lineHeightValu = R.set(_lineHeightLens, R.__, {});// S_valu -> CSD_valu


const _CSD_valu_opacity = R.compose(set_CSD_opacityValu, _opacityFrmttr);//    N_valu -> CSD_valu_opacity
const _CSD_valu_fontSize = R.compose(set_CSD_fontSizeValu, _fontSizeFrmttr);//    N_valu -> CSD_valu_fontSize
// const _CSD_valu_lineHeight = R.compose(set_CSD_lineHeightValu, _lineHeightFrmttr);//    N_valu -> CSD_valu_lineHeight
/**
 * -----------------------  EXPORTS --------------------
 */
module.exports = {_CSD_valu_opacity, _CSD_valu_fontSize};//::  (N_valu) -> CSD_...

//asserts
        assert.equal(_CSD_valu_opacity(.6).opacity, "0.600", '_CSD_valu_opacity');
        assert.equal(_CSD_valu_fontSize(.6).fontSize, "60%", '_CSD_valu_fontSize: 0.6 * 100');

