/**
 * h.js 160708 @ 0805  MOVED f_d_set_key TO here FROM f_d_Chpt_curScope.js
 * Created by CLIF on 7/6/2016.\
 * helper files
 *
 */
var R = require('ramda');
var test = require('tape');

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
module.exports = {C_It, Doc_It, C_Both};




