/**
 * h.js
 * 160722  @0904 ->  ADDED my_toFixed() w/  an assert
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

var ltBeg = (dict)=>(i)=> R.lt(i, dict.begNdx);//D -> N -> Bool
var gtEnd = (dict)=>(i)=> R.gt(i, dict.endNdx);//D -> N -> Bool
var tweenBegEnd = (dict)=>(i)=> R.gte(i, dict.begNdx) && R.lte(i, dict.endNdx);//D -> N -> Bool
/**
 *      isPst:: D:curRclssScope -> N:aChptNdx -> Bool:
 * @param dict Keys: beg, end values N
 */
var isPst = (dict) => ltBeg(dict); //: D:scope->Nlt:i -> Bool
var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
var isCur = (dict) => tweenBegEnd(dict);

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

var my_toFixed = R.curry(function my_toFixed(digits, n) {
    return n.toFixed(digits);
});
// var y = my_toFixed(3)(0.1537);
// assert.equal(y, 0.154, 'my_toFixed(3)(0.1537) -> 0.154');

const assign_DivStyle = R.curry(function assign_DivStyle (div, csd) {
    return Object.assign(div.style, csd)
});// DIV ->  CSD  ->  DIV


/**
 *  --- _mySlice(d_lmits) -> L -> L_subset
 * @param d_lmits
 * @private
 */
const _mySlice = d_lmits => {
    var {beg, nxt} = d_lmits;// unpack
    return R.slice(beg, nxt)
};//:: D_lmit

/**
 *    --- ELEM_has_outerHTML_STR:: El -> S_outerHTML
 * @param el
 * @private
 */
const ELEM_has_outerHTML_STR = el => el.outerHTML;//:: E_a -> S_a

module.exports = {ELEM_has_outerHTML_STR, _mySlice, assign_DivStyle, myTap, C_It, Doc_It, C_Both, my_toFixed};



