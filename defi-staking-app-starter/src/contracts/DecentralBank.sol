// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    // Staking function
    function depositTokens(uint _amount) public {
        // Require staking amount to be greater than 0
        require(_amount > 0, "Amount has to be positive");

        // Transfer tether tokesn to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking Balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Issue rewards
    function issueRewards() public {
        // Require the ownwer to ussue the tokens only
        require(msg.sender == owner, "caller must be owner");

        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            // Devide by 9 to create percentage incentive for stakers
            uint balance = stakingBalance[recipient] / 9;
            if(balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}