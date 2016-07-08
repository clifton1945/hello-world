/**
 *  Chptr_2_Rclss/.../main.js
 *  160708 @ 0945 -> ADDED thisTest FROM f_d_Chpt_curScope. Ran w/o error.
 *  160708 @ 0940 -> imported f_d_Chpt_curScope AS setScope; its tests ran w/ no errors.
 *  160706
 *      @0635  required _s_RclssName works and stable
 *  160705 @1252  new file
 */
var R = require('ramda');
var h = require('./../src/h');
var setScope  = require('./f_d_Chpt_curScope.js');

// tests
var test = require('tape');
setScope.thisTest();
// let us define and set