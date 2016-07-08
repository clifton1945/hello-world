/**
 *  Chptr_2_Rclss/.../main.js
 *  160708 @1630
 *      ->  STABLE var f_l_RclssSets = require('./f_l_RclssSets');
 *      -> for 1TAAT: COMMENTED_OUT var setScope = require('./f_d_Chpt_curScope.js');
 *      @ 1125 -> ADDED the use of .f_d_curScope_set_beg / end functions TO MODIFY copies of dthe constant d_curScope;
 *      @ 0945 -> ADDED thisTest FROM f_d_Chpt_curScope. Ran w/o error.
 *  160708 @ 0940 -> imported f_d_Chpt_curScope AS setScope; its tests ran w/ no errors.
 *  160706
 *      @0635  required _s_RclssName works and stable
 *  160705 @1252  new file
 */
var R = require('ramda');
// var h = require('./../src/h');

// tests
//PLAN  2.setScope  FORGET ABOUT IT !!!

var test = require('tape');
// var setScope  = require('./f_d_Chpt_curScope.js');
// setScope.thisTest();// BROKEN FIX????
// SET Scope
// var curScope = require('../src/d_Chptr_curScope.js');
// var scope = R.clone(curScope);
// scope = setScope.f_d_set_beg(scope)(1);
// scope = setScope.f_d_set_end(scope)(3);
// test('***** setScope   do I see curScope?', function (t) {
//     t.equals(scope.beg, 1);
//     t.equals(scope.end, 3);
//     t.end();
// });

// BUILD L:[L,L,L]
var f_l_RclssSets = require('./f_l_RclssSets');


var stub_ChptList = [0,1,2,3,4,5,6];
var CUT = f_l_RclssSets(stub_ChptList);
var TST = R.map(x=>x.length);
var RET = R.compose(TST, CUT);
test('***** f_l_RclssSets', function (t) {
    var x = RET({beg:0, end:1});
    t.deepEquals(RET({beg:0, end:1}), [0,1,6], '{b:1,e:2->[0,1,6]');
    t.deepEquals(RET({beg:1, end:2}), [1,1,5], '{b:1,e:2- [1,1,5]');
    t.deepEquals(RET({beg:5, end:7}), [4,2,0], '{b:5,e:7->[5,2,0]');
    t.end();
});