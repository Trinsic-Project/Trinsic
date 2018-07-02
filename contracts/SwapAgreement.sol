// Requires Solidity version 0.4.17 or above in order to run
pragma solidity ^0.4.17;

contract SwapAgreement {

// Declares variables that will be used to store addresses and skilss for each party involved in swap
//The public keyword here creates getter methods i.e. initiator() { return initiator }
    address public initiator;
    address public respondent;
    string public initiatorSkill;
    string public respondentSkill;

// Set the address and skill for the person who initiates the swap, this function is invoked as soon as the contract is compiled
    constructor(string userSkill) public {
        initiator = msg.sender;
        initiatorSkill = userSkill;
    }

// Get all current information regarding entire contract     
    function GetAgreement() public view returns (address, address, string, string) {
        return (initiator, respondent, initiatorSkill, respondentSkill); 
    }

// Set contract respondent address and skill    
    function FinalizeAgreement() public {
        require(msg.sender != initiator);
        respondent = msg.sender;
        respondentSkill = "JavaScript";
    }
    
}
