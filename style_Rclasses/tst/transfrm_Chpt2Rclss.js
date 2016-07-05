/**
 * transfrm_Chpt2Rclss.js
 *  INTENT: using R.evolve,
 *      CRAFT  Style transforms directly  FROM Chpt CSD: ndx, sibs TO Rclss CSD: ndx, sibs
 *  160705  was classByIndex_tests.js in project: C_Script_FP
 *
 *
 */
"use strict";
/**
 *       --------------------------DATA:
 */
/**
 *      aChptrVersesNL:: -> L:all verse elements
 *      for use in extracting rClass Lists
 */
var curChptVerse_NL = document.querySelectorAll('#curChptrVerses .vers');
/**
 *      -------------------------- CodeUnderTest and HELPERS
 */
var ltBeg = (dict)=>(i)=> R.lt(i, dict.beg);//D -> N -> Bool
var gtEnd = (dict)=>(i)=> R.gt(i, dict.end);//D -> N -> Bool
var tweenBegEnd = (dict)=>(i)=> R.gte(i, dict.beg) && R.lte(i, dict.end);//D -> N -> Bool
var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
var isCur = (dict) => tweenBegEnd(dict);
/**
 *      _rClssName:: D:curRnge -> N:i -> S:rClss name
 *
 * @param rngD >  the cChptr.range of : beg and end indexes, used to establish the rClss 'cur'rent verses.
 * @param i > the cChptr.index. It will be tranformed into the rClss.index
 */
// var rClssByChptrElem = R.curry((rngD, i) =>
const _rClssName = R.curry((rngD, i) =>
    ltBeg(rngD)(i) ? 'pst' :
        gtEnd(rngD)(i) ? 'fut' :
            tweenBegEnd(rngD)(i) ? 'cur' :
                'hey, _rClssName() is broken.');
/**
 *      -------------------------- INVOKE and TESTS
 */
// myBaseCSD_tests();
// _rClssName_tests();
// isPst_isCur_isFut_tests();
// var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

function myBaseCSD_tests() {
    // 1. WANT Something like N:i -> S:_rClssName
    // WANT the opposite of R. apply, .when, .unless, ifElse WHICH are use one predicate over many obj
    // how about R.apply
    // 2. WANT Something like S:_rClssName -> ????  -> fn:(el, ndx, col)-> D: of rClss stuff
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` mBCSD_t -> `;
    // var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptVerse_NL;
    var stub_curRngeD = {beg: 4, end: 5};
    var stub_glblCSD = {fut: {backgroundColor: "green"}, cur: {}, pst: {backgroundColor: 'pink'}};
    // CUT HELPERS
    // var isPst = ltBeg(stub_curRngeD); //: N:i -> Bool
    // var isFut = gtEnd(stub_curRngeD); //: N:i -> Bool
    // var isCur = tweenBegEnd(stub_curRngeD);
    // CUT
    var _clssCSD = (dict) => R.prop(R.__, dict);// D:glblCSD -> S:csdName -> CSD:namedCSD
    // TESTS:
    MSG += ` #1:pst.backgroundColor `;
    TST = _clssCSD(stub_glblCSD)('pst');
    assert('pink', TST.backgroundColor, MSG);
    MSG += ` #2:cur.backgroundColor->undefined `;
    TST = _clssCSD(stub_glblCSD)('cur');
    assert(undefined, TST.backgroundColor, MSG);

    /**
     *      _this_clssCSD:: D:glblDict -> D:curRngeDict -> N:rClssNdx -> D:rClssCSD
     */
    var _this_clssCSD = (gdict) => (rngdict) => R.compose(// NOTE es6 style
        _clssCSD(gdict),
        _rClssName(rngdict));// N:ndx -> D;this verse rClss csd
    //TESTS
    MSG += ` #3:_this_clssCSD(3) `;
    TST = _this_clssCSD(stub_glblCSD)(stub_curRngeD)(6);// 6-> fut -> backgroundColor:green.
    assert('green', TST.backgroundColor, MSG);

// final Msg
    MSG += `
    myBaseCSD_tests~classByIndex_tests. DONE`;
    C_Both(MSG);
}
function _rClssName_tests() {
    // TESTS basic only. No edge tests
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` rCBCE_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptVerse_NL;
    var stub_curRngeD = {beg: 4, end: 5};
    // CUT HELPERS
    var isPst = ltBeg(stub_curRngeD); //: N:i -> Bool
    var isFut = gtEnd(stub_curRngeD); //: N:i -> Bool
    var isCur = tweenBegEnd(stub_curRngeD);
    // CUT

    // TESTS
    MSG += ` #1:i:[0,1,2,3,33]->[pst,cur,cur,fut,fut] `;
    TST = {beg: 1, end: 2};
    assert('pst', _rClssName(TST)(0), MSG);
    assert('cur', _rClssName(TST)(1), MSG);
    assert('cur', _rClssName(TST)(2), MSG);
    assert('fut', _rClssName(TST)(3), MSG);
    assert('fut', _rClssName(TST)(333), MSG);


// final Msg
    MSG += `
    _rClssName~classByIndex_tests. DONE`;
    C_Both(MSG);
}
function isPst_isCur_isFut_tests() {
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` cBI_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptVerse_NL;
    var stub_curRngeD = {beg: 4, end: 5};
    // CUT
    // var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
    // var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
    // var isCur = (dict) => tweenBegEnd(dict);
    // TESTS
    MSG += ` #1:isPst, `;
    TST = R.map(i => isPst(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [true, false, false]
    assert([true, false, false, false], TST, MSG);
    MSG += ` #2:isCur, `;
    TST = R.map(i => isCur(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, true, true, false], TST, MSG);

    MSG += ` #3:isFut, `;
    TST = R.map(i => isFut(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, false, false, true], TST, MSG);

// final Msg
    MSG += `
    finished classByIndex_tests`;
    C_Both(MSG);
}

