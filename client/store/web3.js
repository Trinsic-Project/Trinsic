import Web3 from 'web3';

//Metamask sets older version of Web3. Code below grabs provider from metamask and utilizes our version of Web3
const getWeb3 = async () => {
    await window.addEventListener('load', () => {
        //If browser has Web3 provider, extract the provider and make a new instance or create a new instance with the localhost
        let web3 = typeof window.web3 !== 'undefined' ? new Web3(window.web3.currentProvider) : new Web3.providers.HttpProvider('localhost:8080');
        return { web3 };
    })
}

