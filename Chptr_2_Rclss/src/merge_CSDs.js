/**
 *  merge_CSDs::  L:[CSD,...] -> N -> CSD
 *  160805   @1025   -> ADDED _lineHeight transforms as fn(N_valu).
 *  ADDED  a_CSD_valu_lineHeight() along with a_CSD_valu_opacity() AND _CSD_valu_fontSize()
 *  160730      @1800   -> STABLE & test
 *  module.exports = {merge_CSDs};// merge_CSDs:: CSD_in  -> N_valu ->  CSD_final
 *  IN FILE: merge_CSDs.js
 */
"use strict";

let R = require('ramda');
// HELPERS
//  N_valu -> CSD_valu _opacity || _fontSize
let _CSD_valu_opacity = R.curry(require('./set_CSD_valu')._CSD_valu_opacity);//         N:wt -> CSD_valu
let _CSD_valu_fontSize = R.curry(require('./set_CSD_valu')._CSD_valu_fontSize); //      N:wt -> CSD_valu
let _CSD_valu_lineHeight = R.curry(require('./set_CSD_valu')._CSD_valu_lineHeight); //      N:wt -> CSD_valu

//   * -----------------------  EXPORTS --------------------
/**
 *      merge_CSDs:: CSD_init -> N_valu) -> CSD_final
 *      use: COMBINES a CSD init and the two weighted CSD INTO one CSD
 *      @return {{merge_CSDs: *}}
 * @param CSD_init
 * @param N_valu
 */
const merge_CSDs = R.curry(function merge_CSDs(CSD_init, N_valu) {
    return R.mergeAll(
        [CSD_init,
            _CSD_valu_opacity(N_valu),
            _CSD_valu_fontSize(N_valu),
            _CSD_valu_lineHeight(N_valu),
        ]);//
});
module.exports = {merge_CSDs};// merge_CSDs:: CSD_in  -> N_valu ->  CSD_final

//asserts
let assert = require('assert');
var cut = merge_CSDs({backgroundColor: 'lightGreen'})( 0.5);
assert.equal(cut.fontSize, "50%", 'fontSize:: wt:.5 SET TO "50%" USING cut = _Csds({})');
assert.equal(cut.opacity, "0.500", 'opacity:: wt:.5 SET TO "0.500" USING cut = _Csds({})');
assert.equal(cut.backgroundColor, 'lightGreen', "_Csds.backgroundColor -> 'lightGreen' ");
cut = merge_CSDs({})( 1);
assert.equal(cut.lineHeight, "75%", 'lineHeight:: wt:1 SET TO "75" USING cut = _Csds({})');


