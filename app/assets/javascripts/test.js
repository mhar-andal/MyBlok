var web3 = require('web3');
var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var peopleContractABI = [{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"identity","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"ssn","type":"uint256"},{"name":"creditCard","type":"uint256"},{"name":"ccv","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_ssn","type":"uint256"},{"name":"_creditCard","type":"uint256"},{"name":"_ccv","type":"uint256"}],"name":"addIdentity","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"}]

var peopleContractAddress = '0xd67886673c1842c914f33912cd8fad8932074e88'
var peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress)

var data = peopleContract.getData()


var person = {};
person.firstName = ETHEREUM_CLIENT.toAscii(data[0][0])
person.lastName = ETHEREUM_CLIENT.toAscii(data[1][0])

console.log(person)
