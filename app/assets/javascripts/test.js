var web3 = require('web3');

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"))
var peopleContractABI =
[{"constant":false,"inputs":[{"name":"DataType","type":"bytes32"},{"name":"LockerName","type":"bytes32"},{"name":"RawData","type":"bytes"},{"name":"PersonId","type":"uint256"}],"name":"newDataLocker","outputs":[{"name":"LockerId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"LockerId","type":"uint256"}],"name":"openLocker","outputs":[{"name":"DataType","type":"bytes32"},{"name":"LockerName","type":"bytes32"},{"name":"RawData","type":"bytes"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"}],"name":"returnLockers","outputs":[{"name":"totalLockers","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPersons","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"fn","type":"bytes32"},{"name":"ln","type":"bytes32"},{"name":"key","type":"bytes"}],"name":"newPerson","outputs":[{"name":"personId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"}],"name":"returnPerson","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"}],"name":"returnKey","outputs":[{"name":"keyValue","type":"bytes"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"LockerId","type":"uint256"}],"name":"returnLockerType","outputs":[{"name":"LockerName","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"personId","type":"uint256"},{"name":"LockerId","type":"uint256"}],"name":"returnLockerName","outputs":[{"name":"LockerName","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]

// var PeopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress)
var address ='0xd32886d6f6d2b4261884a9912931f643afb83485'

var contract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(address)
console.log(contract.openLocker(0, 1, {from: '0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1'}))
admin = '0xa1e648cd37ee43591ab28a94972e88e909a41304'

ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.accounts[0]

$(document).ready(function() {
  console.log("am i fucking working")
  $("#person-form").on("submit", function(event){
    event.preventDefault();
    var firstname = this.elements["firstname"].value
    var lastname = this.elements["lastname"].value
    var pub = this.elements["pubkey"].value
    var result = contract.newPerson(firstname, lastname, pub, {from: admin, gas: 10000000000});
  })
})
