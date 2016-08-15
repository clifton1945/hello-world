/**
 * \src\update_L_RClss_NLs.js  NL -> D -> L[NL, NL, NL]
 * 160815   @1319   DEPR
 * 160809   @1750  lots of renames
 * 160808   0645    -> CLEANUP
 * 160806   @0640   -> adapt to Chptr_2_RClss project
 * was \style_RClss\src\update_L_RClss_NLs.js
 // *  USE:   L:elem -> D:D_ndxLmits -> L:[[pst],[cur],[pst]]
 // *  update_L_RClss_NLs:: NL:allElems -> D:d_div_cur_bounds -> L:[pstNL, curNL,futNL]
 */

var R = require('ramda');

/**
 *      update_L_RClss_NLs:: NL:allElems -> D:D_ndxLmits -> L:[pstNL, curNL,futNL]
 *  USE:  UPDATES the 3 div.RClss NodeLists GIVEN a D_ndxLmits: {div.cur:ndx_beg, div.cur:ndx_end}
 *
 * @param l_elem
 * @param D_ndxLmits
 * @return {*}
 *
 *          the params ARE FLIPPED because
 *              the Scope dict CHANGES a lot: each key event
 *          BUT
 *            the Chptr Elem list IS static UNTIL there is a new Chapter.
 */
var update_L_RClss_NLs = (l_elem, D_ndxLmits) => {
    RET = [];
    var CUT1 = R.splitAt(D_ndxLmits.end)(l_elem);      // N:end -> L:chptr -> L[La, Lb]
    var fut = CUT1[1];                              // Lb:l_fut
    var CUT2 = R.splitAt(D_ndxLmits.beg)(CUT1[0]);     // N:beg -> La -> L[Lc, Ld]
    var cur = CUT2[1];                              // Ld:cur
    var pst = CUT2[0];                              // Lc:pst
    return [pst, cur, fut];                         // L:[Lc,Ld,Lb]
};
module.exports = update_L_RClss_NLs;//:: (NL_elems, D_ndxLmits) -> L:[NL_cur, NL_pst, NL_fut]


// // test data
// test = require('tape');
assert = require('assert');
var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8];// pretend these are verse INDEXES
var RET;
//
// test(`exp update_L_RClss_NLs.length -> 3 un flattened, 9 flattened.`, function (t) {
    RET = update_L_RClss_NLs(stubList, {beg: 111, end: 222});
        assert.equal(RET.length, 3, 'w/o flattening exp 3 lists of verses:pst.cur,fut');
        assert.equal(R.flatten(RET).length, 9, 'w/ flattening exp all 9 verses.');

// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 0, end: 2})}`,
    RET = update_L_RClss_NLs(stubList, {beg: 0, end: 2});
        EXP = 0;
        assert.equal(RET[0].length, EXP, ` > pst:${EXP}`);
        EXP = 2;
        assert.equal(RET[1].length, EXP, ` > cur:${EXP}`);
        EXP = 7;
        assert.equal(RET[2].length, EXP, ` > fut:${EXP}`);

// limits = {beg: 3, end: 6};
// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 3, end: 6})}`,
//     function (t) {
//         RET = update_L_RClss_NLs(stubList, {beg: 3, end: 6});
//         EXP = 3;
//         assert.equal(RET[0].length, EXP, ` > pst:${EXP}`);
//         EXP = 3;
//         assert.equal(RET[1].length, EXP, ` > cur:${EXP}`);
//         EXP = 3;
//         assert.equal(RET[2].length, EXP, ` > fut:${EXP}`);
//         t.end();
//     });
// limits = {beg: 7, end: 9};
// test(`EXP pst,cur,end FOR ${JSON.stringify({beg: 7, end: 9})}`,
//     function (t) {
//         RET = update_L_RClss_NLs(stubList, {beg: 7, end: 9});
//         EXP = 7;
//         assert.equal(RET[0].length, EXP, ` > pst:${EXP}`);
//         EXP = 2;
//         assert.equal(RET[1].length, EXP, ` > cur:${EXP}`);
//         EXP = 0;
//         assert.equal(RET[2].length, EXP, ` > fut:${EXP}`);
//         t.end();
//     });
