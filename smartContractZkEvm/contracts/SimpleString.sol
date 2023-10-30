// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleString {
    string storedData;

    function set(string memory data) public {
        storedData = data;
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}