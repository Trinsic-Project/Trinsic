# Trinsic

Trinsic is a peer-to-peer, skill-sharing platform built for Ethereum blockchain-based smart contracts. Using the security and transparency of the Ethereum network, people are able to connect and exchange their expertise with one another. Trinsic is centered around teaching and learning as we help contribute to opportunities for personal and professional growth.

[Deployed Website](http://trinsic.tech/) | [Live Demo](https://youtu.be/wMdwTAdMvto)

## App Functionality
Users can select a skill they would like to teach others when they sign up for Trinsic. They are then directed to view the skills of other learning partners. When the user finds a learning partner they can do one of two things: click learn more to view a bio for the learning partner or click exchange skills to start the exchange process.

If the learning partner decides they are interested in learning the users skill, the two can message each other in a chatroom and discuss the terms of their skill swap.

When ready, either user can initiate an instance of our smart contract that will be deployed to the blockchain. This will prompt Metamask, a chrome plug-in for managing users’ ether,to have the user pay the fee to process the exchange.

One user initiates the contract leaving it up to the learning partner to finalize the agreement.
Finalizing the contract entails another Metamask prompted transaction, adding a completed contract to the blockchain. Once finalized, the contract’s status is set to closed so the parties involved can no longer write to the blockchain for that instance. If the user goes to view the contract, they can see all the details that have been finalized.

## Getting Started

In order to initiate or finalize a contract instance, users must utilize the Chrome plugin, MetaMask. In MetaMask, users should connect to the custom RPC http://206.81.11.213:8545 and import the following test accounts supplied by Ganache. Each time you login to Trinsic with a different user, you must change MetaMask accounts. 

#### Available Accounts
```
(0) 0x7650ea3198087b470c4b104704a5ff0d627819dd
(1) 0x38c400724a6df14f454d803cca9896a9583d44b7
(2) 0xe879ee26695203c08eb13cd3dd170b2e871d8a3f
(3) 0x5c2b6cb83bc69ea4a9237fc6c3197f55ba46b13e
(4) 0xc7e2b19affd94ed71f21ef928031e3ac2dbb5094
(5) 0x97fa969082522cde97ad6dc11f68bf4cfe71886d
(6) 0x3ac4d38b7aefce6ac60b6434b993f1602acf09b2
(7) 0xa46a62c69cc1c7ca43f9f7ff0af74d22a3f6b5a9
(8) 0x97abe64851bf6413f95f0877a5760d3252f958cd
(9) 0xb04cb0fea5cfcc4f5ec95b020d90818708ed854a
```

#### Private Keys
```
(0) ab901fce17312684817241106f6174be733ed1d51006d4432ff885a5196bac96
(1) ca1697e8a81b355c46b4ca43103b313d964a5e53f0971b85d4c8585766769b2c
(2) b7023027abf94d79c8604b93c3ad7951635e3c570db9153f642c7011ff29772b
(3) f1bbaaf8f104f5a6cfdae99a7cb8c6cc0a85f5d0aebe83971a64b65bb924dfc7
(4) 0754475c58f74aea7678cbc314825b922974a9bfa2f2a4b4f1ec50d5000988f3
(5) 123939a95bea26caf8798ba3b66260db3ac1521ff2277f003f21b3e5e2e6af3a
(6) 1dacc571ebc9fbd459207c45f93292e1dfe48be07b2dfb6a89cd8f13e198c100
(7) 4582b8d9d81360db7ad9f6f8908b504c42ec7cbd3e1dcfe0da804d30f6a4e06f
(8) 70c88a7327cc3f184930c8990b2a6337c3a5124fc046335acda4013a8c774f09
(9) b2ee23c25e56576cc2117d25b7e3bdb52ab90a35021f9c63475e6fea1cd89fa8
```


### Run on local 

To run a copy of the project on your local machine, first install all required node modules
```
npm install
```
Seed the database

```
npm run seed 
```
Run the application on http://localhost:8080  
```
npm start
```

## Technologies Used

* [Node](https://github.com/nodejs) - Server-side runtime environment
* [Express](https://github.com/expressjs/express) - Web application framework
* [PostgreSQL](https://www.postgresql.org/) - Database management system
* [Sequelize](https://github.com/sequelize/sequelize) - Object relational mapping tool
* [Socket.io](https://github.com/socketio/socket.io) - Realtime application library 
* [React](https://github.com/facebook/react) - User interface library 
* [React-Redux](https://github.com/reduxjs/react-redux) - Managing application state
* [Material-UI](https://github.com/mui-org/material-ui) - Google designed react components 
* [Truffle](https://github.com/trufflesuite/truffle) - Ethereum testing framework 
* [Ganache](https://github.com/trufflesuite/ganache) - Blockchain for Ethereum development
* [Solidity](https://github.com/ethereum/solidity) - Smart contract language 
* [Web3](https://github.com/ethereum/web3.js/) - Ethereum JavaScript API

## Contributors 
* [Jacob Feinberg](https://github.com/JTFeinberg)
* [Allan James Lapid](https://github.com/ajLapid718)
* [Lindsay Sack](https://github.com/lindsaysack)
* [Kate Hee Kyun Yun](https://github.com/ggobugi27)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Trinsic-Project/Trinsic/blob/master/LICENSE) file for details
