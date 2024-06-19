// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract User {
    string public name; 

    constructor() {
        name = "";
    }

    function setName(string memory _newName) public {
        name = _newName;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
