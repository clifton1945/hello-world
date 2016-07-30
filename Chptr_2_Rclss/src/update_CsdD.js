/**
 * update_CsdD.js
 * 160729   @1300   -> STABLE Tests. How add D:inCsd in after composed the two formats??
 *  @0815 -> REFACT  comment
 * 160728   @1910 -> STABLE tests
 *      @1735   -> BEGIN to use fn from csdValueS.js
 *      which will throw away most of t he code.
 *  IN THE END module.exports = {_trgt_Csds};//:: N:wt -> D:inCsd  -> outCsd
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
let _set_csdD_opacity = R.curry(require('./_CSD_values_set')._a_csdValu_opacity);//        N:wt -> D:inD -> D:outD
let _set_csdD_fontSize = R.curry(require('./_CSD_values_set')._a_csdValu_fontSize); //      N:wt -> D:inD -> D:outD

//  TEST DATA
var lmtsD = {smlWt: 0.5, lrgWt: 0.9}; //        -> D: init_csdD limits
var famL = [0, 1, 2, 3, 4, 5, 6]; //            ->L
var stub ={}; //
var cut;

// NOW CHAIN THE TWO:  _set_trgt_fontSize, _set_set_trgt_opacityCsdD
// TO result in _trgt_Csds:: N:wt -> D:inCsd -> D:outCsd
//  BUT NOW I need
var trgt_Csds;
// const _trgt_Csds =  function _trgt_Csds(in_csd, wtN) {
const _trgt_Csds =  function _trgt_Csds(wtN) {
    return R.compose(_set_csdD_opacity(wtN, R.__), _set_csdD_fontSize(wtN, R.__));// N:wt -> D:inCsd  -> outCsd
};//  _trgt_Csds:: N:wt -> D:inCsd -> D:outCsd
    //asserts
        trgt_Csds = _trgt_Csds(0.5)({backgroundColor: 'lightGreen'});
        assert.equal(trgt_Csds.fontSize, "50%", 'fontSize:: wt:.5 SET TO "50%" USING cut = _trgt_Csds({})');
        assert.equal(trgt_Csds.opacity, "0.500", 'opacity:: wt:.5 SET TO "0.500" USING cut = _trgt_Csds({})');
        assert.equal(trgt_Csds.backgroundColor, 'lightGreen', "_trgt_Csds.backgroundColor -> 'lightGreen' ");

const _csds = R.curry((csd, wt) => _trgt_Csds(wt)(csd));// D -> N -> D
    //asserts
        var Csds = _csds({backgroundColor: 'lightGreen'}, 0.5);
        assert.equal(Csds.fontSize, "50%", 'fontSize:: wt:.5 SET TO "50%" USING cut = _Csds({})');
        assert.equal(Csds.opacity, "0.500", 'opacity:: wt:.5 SET TO "0.500" USING cut = _Csds({})');
        assert.equal(Csds.backgroundColor, 'lightGreen', "_Csds.backgroundColor -> 'lightGreen' ");

//   * -----------------------  EXPORTS --------------------
//  */
module.exports = {_csds, _trgt_Csds};// _trgt_Csds:: N:wt -> D:inCsd  -> outCsd
