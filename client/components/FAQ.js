import React from 'react'

const FAQ = () => {
  return (
    <div>
      <p>Certain terms and phrases tend to come up when researching smart contracts and the blockchain system. At times, these concepts can become challenging to keep track of and piece together. Below is a collection of questions, answers, and additional resources that may help demystify this new and innovative technology.</p>

      <h2>What is the blockchain?</h2>

      The blockchain, a value-exchange protocol, is an incorruptible digital ledger of economic transactions that can be programmed to record not just financial transactions but virtually everything of value.

      A blockchain is a continuously growing list of chronological and publically available records, called blocks, which are linked and secured using cryptography.

      The blockchain is a distributed ledger technology that underlies cryptocurrencies like Bitcoin and platforms like Ethereum. It provides a way to record and transfer data that is transparent, safe, auditable, and resistant to outages. The blockchain has the ability to make the organizations that use it transparent, democratic, decentralized, efficient, and secure.

      In other words: The blockchain is a shared pool of information that has immutable (cannot be tampered with) blocks of information and is distributed with everyone involved as it constantly updates. There is no one single person or organization in charge of the blockchain, which means the data is more protected from hacking, exploitation, or becoming lost. People can then have significantly more autonomy and ownership of their data.

      <h2>What is a smart contract?</h2>

      A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties.

      A smart contract is a computer code built onto the blockchain that executes automatically, allowing the exchange of anything of value (money, property, content, etc) when certain conditions, namely those of the contract, are met.

      While a standard contract outlines the terms of a relationship (usually one enforceable by law), a smart contract enforces a relationship with cryptographic code. Put differently, smart contracts are programs that execute exactly as they are set up to by their creators.

      In other words: A digital smart contract, much like a conventional paper contract, is a program between parties that executes upon the fulfillment of terms. It is objective in the sense that there is a strict cause-and-effect system it follows. For example, if one person pays money for another person's car and it is confirmed that the car has transferred ownership, then the smart contract would release the funds to the seller of the car. If A happens, then B is the outcome.

      <h2>What is a cryptocurrency?</h2>

      Lorem ipsum...

      <h2>Which cryptocurrency does Trinsic require?</h2>

      Lorem ipsum...

      <h2>What is a digital wallet?</h2>

      Lorem ipsum...

      <h2>How does this all work?</h2>

      Lorem ipsum...

      <h2>What is the reason behind the transaction fees for initializing and finalizing a smart contract?</h2>

      To actually execute smart contract code on the Ethereum platform, someone has to send enough Ether as a transaction fee. The amount of Ether needed depends on the computing resources required. This payment is necessary for the Ethereum nodes and miners participating and providing their computing power, energy, bandwith, and electricity.

      The minimum fee necessary for a transaction to be processed and confirmed is based on the intersection of supply and demand in the blockchain's free market for block space.

      The block reward is essentially a revenue item for miners for solving a complex algorithmic problem, and a cost item for consumers who store content on the blockchain. Typically, miners choose which transactions they want to include in each block, based on how high their transaction fees are. The higher the transaction fee, the higher priority your transaction will have, meaning the faster it will be included as a block on the blockchain.

      In other words: Resources such as time and energy are used to support the continuation of the blockchain, something miners tend to believe in and also benefit from as more users participate in the community. Miners contribute to securing and building out the blockchain, and they are partly incentivized by transaction fees. As long as transaction fees are not too expensive for users while also being economic enough for miners to continue securing the network, the blockchain will be favorable for everyone involved in the community.

      <h2>What is the "complex algorithmic problem" miners are tasked to solve?</h2>

      You may have heard that miners are solving difficult mathematical problems, but that's not true at all. What they're actually doing is trying to be the first miner to come up with a 64-digit hexadecimal number (a "hash") that is less than or equal to the target hash. It is guesswork.

      Miners search for an acceptable hash by choosing a number, converting the number, and checking. If the hash doesn’t have the right number of leading zeroes, they change the number, convert the number, and check again.

      Because it is practically impossible to predict the outcome of input, hash functions can be used for proof of work and validation. Bitcoin miners will compete to find an input that gives a specific value (a number with multiple zeros at the start). The difficulty of these puzzles is measurable. However, they cannot be cheated on. This is because there is no way to perform better than by guessing blindly.

      In other words: The complex algorithmic problem is usually described as a mathematics problem, but it is more closely related to a unique puzzle. Miners essentially make a tremendous amount of guesses (the work) at picking a combination of sixty-four letters and numbers and if it happens to meet a certain criteria, then a proof of work is published that allows for the soon-to-be verified block to be added to the blockchain.


      <h2>How do I log into MetaMask?</h2>

      Lorem ipsum...

    </div>
  );
};

export default FAQ;
