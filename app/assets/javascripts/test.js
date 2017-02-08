var web3 = require('web3');

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://54.172.23.175:8080"))
var peopleContractABI = [{"constant":false,"inputs":[{"name":"fn","type":"bytes32"},{"name":"ln","type":"bytes32"}],"name":"newPerson","outputs":[{"name":"personId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"}],"name":"returnLoginNumber","outputs":[{"name":"totalLogins","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bankName","type":"bytes32"},{"name":"cardNum","type":"uint256"},{"name":"securityNum","type":"uint256"},{"name":"expDate","type":"uint256"},{"name":"PersonId","type":"uint256"}],"name":"newCard","outputs":[{"name":"cardId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"loginId","type":"uint256"}],"name":"returnLogin","outputs":[{"name":"websiteName","type":"bytes32"},{"name":"username","type":"bytes32"},{"name":"password","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"cardId","type":"uint256"}],"name":"returnCard","outputs":[{"name":"bankName","type":"bytes32"},{"name":"cardNum","type":"uint256"},{"name":"securityNum","type":"uint256"},{"name":"expDate","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"}],"name":"returnPerson","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"LoginNum","type":"uint256"}],"name":"returnLoginName","outputs":[{"name":"siteName","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"u_name","type":"bytes32"},{"name":"pass","type":"bytes32"},{"name":"PersonId","type":"uint256"}],"name":"newLogin","outputs":[{"name":"loginId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"}],"name":"returnCardNumber","outputs":[{"name":"totalCards","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"cardNum","type":"uint256"}],"name":"returnCardName","outputs":[{"name":"bankName","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]

// var PeopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress)
var address ='0xac9e4ef011a993d0d814b79fc4f4745c4c9e6792'

var contract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(address)
// console.log(contract.returnPerson(0, {from: '0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1'}))
ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.accounts[0]


// var peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI)
//
// var contract = peopleContract.new({from: address})
// console.log(contract)
// var result = contract.addIdentity("Mhar", "Andal", 123411234, 1234123412341234, 1234)
// console.log(result)
// console.log(peopleContract.getmeData())



//pseudocode
