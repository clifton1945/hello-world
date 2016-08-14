/**
 * h.js
 *  160813  @1600 -> Generalized a few more.
 *      @0900  REFACTED Generalized a few names.
 * 160812   @1008 L_TO_L_BY_D_beg_nxt now NOT _L_TO_L_BY_D_beg_nxt
 *      @0910 ADDED: Elm_TO_Elm_outerHTML(), set_RClss_TO_()
 *      @0543   -> replaced L_TO_L_BY_D_beg_nxt es6 code w/ es5 babel code
 * 160722  @0904 ->  ADDED N_TO_N_Fixed_BY_N() w/  an assert
 *  @ 0735 -> ADDED myTap()
 * helper files
 * IN FILE: h.js
 */
var R = require('ramda');
var assert = require('assert');
// var test = require('tape');

/**
 *      f_d_set_key:: S:key -> D:{key:val} -> N:val -> D:{key:val}
 *      USAGE: setting d_curScope at the Chptr level.
 *      TESTS in tst/f_d_Chptr_curScope.js
 * @param key
 * @param dict
 * @param val
 */
const _d_set_key = R.curry(
// const f_d_set_key = R.curry(
    (key, dict, val)=> R.set(R.lensProp(key), val, dict)
);

// var ltBeg = (dict)=>(i)=> R.lt(i, dict.begNdx);//D -> N -> Bool
// var gtEnd = (dict)=>(i)=> R.gt(i, dict.endNdx);//D -> N -> Bool
// var tweenBegEnd = (dict)=>(i)=> R.gte(i, dict.begNdx) && R.lte(i, dict.endNdx);//D -> N -> Bool
// /**
//  *      isPst:: D:curRclssScope -> N:aChptNdx -> Bool:
//  * @param dict Keys: beg, end values N
//  */
// var isPst = (dict) => ltBeg(dict); //: D:scope->Nlt:i -> Bool
// var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
// var isCur = (dict) => tweenBegEnd(dict);

// module.exports = {_d_set_key};

// *********** OLD BUT STILL IN USE
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
const C_Both = (txt) => {
    C_It(txt);
    Doc_It(txt);
};

var sayX = x => console.log('tap:');
const myTap = R.tap(sayX);

var N_TO_N_Fixed_BY_N = R.curry(function N_TO_N_Fixed_BY_N(digits, n) {
    return n.toFixed(digits);
});
assert.equal( N_TO_N_Fixed_BY_N(3)(0.1537), 0.154, 'N_TO_N_Fixed_BY_N(3)(0.1537) -> 0.154');

/**
 *      --- Elm_TO_Elm_style_BY_CSD:: Elm -> CSD -> Elm
 */
const Elm_TO_Elm_style_BY_CSD = R.curry(function Elm_TO_Elm_style_BY_CSD (div, csd) {
    return Object.assign(div.style, csd)
});// Elm ->  CSD  ->  Elm

/**
 *  --- L_TO_L_BY_D_beg_nxt(d_lmits) -> L -> L_subset
 * @param d_lmits -> {beg:N, nxt:N}
 * @private
 */
var L_TO_L_BY_D_beg_nxt = function L_TO_L_BY_D_beg_nxt(d_lmits) {
    var beg = d_lmits.beg;
    var nxt = d_lmits.nxt; // unpack
    return R.slice(beg, nxt);
}; //:: D_lmit

/**
 *    --- Elm_TO_Elm_outerHTML:: El -> S_outerHTML
 * @param el
 * @private
 */
const Elm_TO_Elm_outerHTML = el => el.outerHTML;//:: E_a -> S_a

/**
 *  --------------- module.exports ------------------
 */
module.exports = {Elm_TO_Elm_outerHTML, L_TO_L_BY_D_beg_nxt,
    Elm_TO_Elm_style_BY_CSD, myTap, C_Both, N_TO_N_Fixed_BY_N};



