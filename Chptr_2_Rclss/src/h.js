/**
 * h.js  Created by CLIF on 7/6/2016.\
 * helper files
 */

var R = require('ramda');
var test = require('tape');

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

module.exports = {isPst, isCur, isFut};
//
// test = ("use es6 unpack ", function (t) {
//     var b, e;
//     ({b, v} = {any:2, som:4});
//     t.equals(b === 2);
//     t.end();
// });




