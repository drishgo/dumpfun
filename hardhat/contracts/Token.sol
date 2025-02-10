// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address admin;
    //This will be called in TokenFactory automatically everytime a new token is created using the function
    // createMemeToken()------>> 
    //This contract will give implementation for ERC20 standards interfact {totalSupply(),name() etc...}
    constructor(string memory name, string memory symbol,uint initialMintValue) ERC20(name,symbol){
        _mint(msg.sender,initialMintValue);
        admin = msg.sender;
    }
    function mint(uint quantity,address reciever) external returns(uint) {
        require(msg.sender==admin,"not admin, reverted");
        _mint(reciever,quantity);
        return 1;
    }
}