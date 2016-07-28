/**
 * update_CsdD.js
 * 160728   @1735   -> BEGIN to use fn from csdValueS.js
 *      which will throw away most of t he code.
 * 160723   @0850  -> WIP
 *      @0630 -> _set_trgt_Csds:: Fn:(* -> N:wt) -> N:wt -> D:inCsd -> D:outCSD WORKS!
 *  @0715 ->  trying Unsuccessfully to ADD f_calcWt parameter
 *  @0648 _set_trgt_Csds::
 * 160722  @1910 introducing universal fn:  const _set_trgt_Csd_ BUT it needs to be FIXED
 *  @1544 -> RENAMED
 *   _opacityWter :: Fn:calcWt -> N:wt -> S:wt
 *   _fontSizeWter :: Fn:calcWt -> N:wt -> S:wt
 *  @1004 -> ADDING fontSize weighting and formatting and short assert tests
 *  @ 0935 -> REFACT (1) using _n_calcWt=require.. -> _calcWt() (2) REFACTING the opacity formatter
 * IN: _update_CsdD.js -> PROVIDE functions TO set each Verse CSD as a function of its Space/Context.
 *  IN THE END Two parameters - thisElem.wt and thisPropName - mutate the
 */
"use strict";

// requires
let R = require('ramda');
let assert = require('assert');
let _a_csdValu_opacity = require('./csdValueS')._a_csdValu_opacity;//        N:wt -> D:inD -> D:outD
let _a_csdValu_fontSize = require('./csdValueS')._a_csdValu_fontSize; //      N:wt -> D:inD -> D:outD

//  TEST DATA
var lmtsD = {smlWt: 0.5, lrgWt: 0.9}; //        -> D: init_csdD limits
var famL = [0, 1, 2, 3, 4, 5, 6]; //            ->L
var stub ={}; //
var cut;//                               ->      D:an initial CsdD

// NOW PARTIAL 2/3 R.set function's:;
/**
 *      _set_trgtCsdD:: lensNameS -> Fn:(N->S) -> N:wt -> D:inCsd -> D:outCsd
 *      typically by partialling the Lens and the formatter: as opacity and fontSize
 *      and than apply a N:wt to both
 *      uses R.set:: Lens s a -> a -> s -> s
 * @private
 * @param wtN
 * @param lensNameS
 * @param propFrmttr
 * @param in_csdD
 * @return out_csdD
 */
const _set_trgtCsdD =  R.curry(function (lensNameS, propFrmttr, wtN, in_csdD) {
    return R.set(R.lensProp(lensNameS), propFrmttr(wtN), in_csdD)
});
        //asserts
        cut = _set_trgtCsdD('opacity',_opacityFrmttr,.9);
        assert.equal(cut({}).opacity, '0.900', 'opacity:: wt:.9 SET TO "0.900" USING _set_trgtCsdD()');

/**
 *      _set_trgt_opacity:: N:wt -> D:inCsd -> D:outCsd
 *      Lens:(*-> N) -> Fn:(N->S) -> N:wt -> D:inCsd -> D:outCsd
 */
const _set_trgt_opacity =  R.curry( wtN => _set_trgtCsdD("opacity", _opacityFrmttr(wtN), R.__));//
        //asserts
        cut = _set_trgtCsdD('opacity',_opacityFrmttr)(.9);
        assert.equal(cut({}).opacity, "0.900", 'opacity:: wt:.9 SET TO "0.900" USING _set_trgt_opacity()');

/**
 *      _set_trgt_fontSize:: N:wt -> D:inCsd -> D:outCsd
 *      Lens:(*-> N) -> Fn:(N->S) -> N:wt -> D:inCsd -> D:outCsd
 */
const _set_trgt_fontSize = R.curry( wtN => _set_trgtCsdD("fontSize", _fontSizeFrmttr(wtN), R.__));// N->D->D
        //asserts
        cut = _set_trgtCsdD('fontSize',_fontSizeFrmttr)('0.5');
        assert.equal(cut({}).fontSize, "50%", 'fontSize:: wt:.5 SET TO "50%" USING _set_trgt_fontSize()');

// NOW CHAIN THE TWO:  _set_trgt_fontSize, _set_set_trgt_opacityCsdD
/**
 *      _trgt_Csds:: N:wt -> D:inCsd -> D:outCSD
 *      USES: _trgt_Csds = _trgt_Csds(_calcWt) WHERE _calcWt IS a PARTIAL just needing N:wt -> D:csd -> N:wt
 * @param f_wter
 * @param wtN
 * @private
 */
const _trgt_Csds =  function (wtN) {
    return R.compose(R.identity(_set_trgt_fontSize(wtN)), R.identity(_set_trgt_opacity(wtN)));
    // return R.compose(_set_trgt_fontSize(wtN), _set_trgt_opacity(wtN));
};
        //asserts
        // cut = _trgt_Csds('0.5');
        assert.equal(cut({}).fontSize, "50%", 'fontSize:: wt:.5 SET TO "50%" USING _set_trgt_fontSize()');

// asserts
let trgt_Csds = _trgt_Csds(6)({backgroundColor: 'lightGreen'});
assert.equal(trgt_Csds.fontSize, "50%", ' _trgt_Csds.fontSize -> "50%"');
assert.equal(trgt_Csds.opacity, "0.500", "_trgt_Csds.opacity -> '0.500' ");
assert.equal(trgt_Csds.backgroundColor, 'lightGreen', "_trgt_Csds.backgroundColor -> 'lightGreen' ");

// test(`IN f_d_update_CsdD.js
// 2 **** _trgt_fontSizeCSDs_D() USES calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
//     {skip: false}, function (t) {
//         t.deepEquals(_trgt_CsdsCsd_('fontSize', 0)(), "90%", ' wt:0 EXP: fontSize:"100%" SET TO "90%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(6), "50%", ' wt:6 EXP: fontSize:"100%" SET TO "50%"');
//         t.deepEquals(_trgt_fontSizeCSDs_D(4), "63%", ' wt;4 EXP: fontSize:"100%" SET TO "63%"');
//         t.end();
//     });

 /**
  * -----------------------  EXPORTS --------------------
 */
module.exports = { _trgt_Csds};//
