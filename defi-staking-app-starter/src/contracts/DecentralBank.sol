// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "./RWD";
import "./Tether";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
    }
}