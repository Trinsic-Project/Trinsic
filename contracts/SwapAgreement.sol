// Requires Solidity version 0.4.17 or above in order to run
pragma solidity ^0.4.17;

contract SwapAgreement {

// Declares variables that will be used to store addresses and skilss for each party involved in swap
    address initiator;
    address respondent;
    string initiatorSkill;
    string respondentSkill;

// Set the address and skill for the person who initiates the swap, this function is invoked as soon as the contract is compiled
    function SwapAgreement() public {
        initiator = msg.sender;
        initiatorSkill = "Skateboarding";
    }

// Get all current information regarding entire contract     
    function GetAgreement() public view returns (address, address, string, string) {
        return (initiator, respondent, initiatorSkill, respondentSkill); 
    }

// Set contract respondent address and skill    
    function FinalizeAgreement() public {
        respondent = msg.sender;
        respondentSkill = "JavaScript";
    }
    
//Get initiator address
    function GetInitiator() public view returns (address) {
        return initiator;            
    }

//Get respondent address    
    function GetRespondent() public view returns (address) {
        return respondent;            
    }
    
//Get Initiator Skill information 
    function GetInitiatorSkill() public view returns (string) {
        return initiatorSkill;            
    }
    
//Get Respondent Skill information 
    function GetRespondentSkill() public view returns (string) {
        return respondentSkill;            
    }
}