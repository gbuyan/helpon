pragma solidity ^0.4.0;

contract Owned {
    address public owner;
    address private candidate;

    event OwnerChanged(address indexed previousOwner, address indexed newOwner);

    constructor () public {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        candidate = newOwner;
    }

    function confirmOrnerChanging() public {
        require(candidate == msg.sender, "Only owner candidate can confirm owner changing");
        emit OwnerChanged(owner, candidate);
        owner = candidate;
    }
}
