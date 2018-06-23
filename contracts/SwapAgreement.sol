// Requires Solidity version 0.4.17 or above in order to run
pragma solidity ^0.4.17;

contract SwapAgreement {

  // Declares variables that will be used to store addresses for each party involved in swap
    event SwapLog(
        address initiator,
        address respondent,
        uint256 id,
        bytes32 initiatorSkill,
        bytes32 respondentSkill
    );

    Swap[] swaps;

    struct Swap {
        address initiator;
        address respondent;
        bytes32 initiatorSkill;
        bytes32 respondentSkill;
    }

// Set the address for the person who initiates the swap
    function initiatedSwap() public returns (uint256) {
        bytes32 initiatorSkill = "Skateboarding";
        uint256 id = swaps.push(Swap(msg.sender, 0x0000, initiatorSkill, 0x0000)) - 1; 
        emit SwapLog(msg.sender, 0x0000, id, initiatorSkill, 0x0000);
        return id;
    }

// Set the address for the person who accepts the swap.
    function finalizeSwap(uint256 id) public returns (bytes32){
        bytes32 respondentSkill = "JavaScript";
        Swap storage swap = swaps[id];
        require(msg.sender != swap.initiator); // Prevent setting same address to initiator AND respondent
        swap.respondent = msg.sender; 
        emit SwapLog(swap.initiator, swap.respondent, id, swap.initiatorSkill, respondentSkill);
        return swap.initiatorSkill;
    }
}