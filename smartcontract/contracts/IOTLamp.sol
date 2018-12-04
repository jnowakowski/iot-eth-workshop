pragma solidity ^0.5.0;

contract IOTLamp
{  
    struct User
    {
        string name;
        string email;
    }

    bool active;
    address private creator;
    address[] usersLog;
    address[] accessList;
    mapping(address => User) userList;
    
    modifier onlyBy()
    {
        require(
            isAllowed(msg.sender),
            "Sender not authorized."
        );
        _;
    }

    constructor() public{
        active = false;
        creator = msg.sender;
    }

    function addUser(string calldata _name, string calldata _email) external{
        bytes memory name = bytes(_name);
        require(name.length > 0, "name cannot be empty.");
        userList[msg.sender] = User(_name, _email);
        if(!isAllowed(msg.sender)) accessList.push(msg.sender);
    }

    function readUser(address _addr) external view returns(string memory _name, string memory _state){
        User memory user = userList[_addr];

        return (user.name, user.email); 
    }

    function readUsersLog() external view returns (address[] memory _addr){
        return usersLog;
    }

    function getAccessList() external view returns(address[] memory _addr){
        return accessList;
    }
    function isActive() external view returns(bool){
        return active;
    }

    function setActive(bool _flag) onlyBy() external{
        active = _flag;
        usersLog.push(msg.sender);
    }

    function isAllowed(address _addr)view internal returns(bool){
        for (uint index = 0; index < accessList.length; index++) {
            if (accessList[index] == _addr) return true;
        }
        return false;
    }
    
    function switchOff() external returns(bool){
        require(msg.sender == creator);
        require(active == true);
        active = false;
        return true;
    }
}
