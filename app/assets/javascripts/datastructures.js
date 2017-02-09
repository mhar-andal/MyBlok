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
// This is the datastructures that will hold our information.
// They will be JSONified and fed into the block chain, with the first two also called.
// The first two will thus exist in the data, and as alternatively stored data so that we can see that object's
// interals without decrypting the whole thing.

var Card = function(sig, bankName, fullName, cardIssuer, cardNum, securityNum, expDate){
  this.dataType = "Credit Card",
  this.signifier = sig,
  this.bankName = bankName,
  this.fullName = fullName,
  this.cardIssuer = cardIssuer,
  this.cardNum = cardNum,
  this.securityNum = securityNum,
  this.expDate = expDate

}


var Login = function(siteName, url, username,password){
  this.dataType = "Website Login",
  this.siteName = siteName,
  this.url = url,
  this.username = username,
  this.password = password
}

var Account = function(sig, bankName, routingNum, accountNum){
  this.dataType = "Banking Account",
  this.signifier = sig,
  this.bankName = bankName,
  this.routingNum = routingNum,
  this.accountNum = accountNum
}

var IDCard  = function(sig, IDType, expDate, licNum){
  this.dataType = "ID card",
  this.signifier = sig,
  this.IDType = IDType,
  this.expDate = expDate,
  this.licNum = licNum
}
// This is the javascript handling for the objects.  Each form submission will take the info, shove it into the
// above datastructures, jsonify them, then toss them to the block chain
$(document).ready(function(){
  $("#bank-account").on("submit", function(event){
    event.preventDefault();
    var accountObj = new Account($("#bank-sig").val(), $("#bank_name").val(), $("#account_number").val(), $("#routing_number").val());
    var parsed = JSON.stringify(accountObj);
    contract.newDataLocker(accountObj.dataType, accountObj.signifier, parsed,18, {from:"0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1", gas:1000000000000});
  });

  $("#web-info").on("submit",function(event){
    event.preventDefault();
    var loginObj = new Login($("#site_name").val(),$("#site_address").val(),$("#login").val(),$("#password").val())
    var stringified = JSON.stringify(loginObj);
    contract.newDataLocker(loginObj.siteName,loginObj.url, stringified, 18, {from:"0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1", gas:1000000000000});
  });

  $("#ID-info").on("submit",function(event){
    event.preventDefault();
    var IDObj = new IDCard($("#id_sig").val(), $("#id_name").val(), $("#id_number").val(),$("#exp_date").val())
    var stringified = JSON.stringify(IDObj);
    contract.newDataLocker(IDObj.dataType,IDObj.signifier, stringified, 18, {from:"0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1", gas:1000000000000});
  });

  $("#creditcard").on("submit", function(event){
    event.preventDefault();
    var cardObj = new Card($("#card_sig").val(), $("#issuing_bank_name").val(),$("#name_on_card").val(),$("#card_type").val(),$("#card_number").val(),$("#security_code").val(),$("#expiration_date").val());
    var stringified = JSON.stringify(cardObj);
    contract.newDataLocker(cardObj.dataType, cardObj.signifier, stringified,18,{from:"0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1", gas:1000000000000});
  });
//below is for the index contract page.  It parses the object from the database and holds it as an obj.
  $("#data-retrieval").on("submit", function(event){
    event.preventDefault();
    var userID = $("#personalID").val();
    var lockerID = $("#LockerID").val();
    var object = contract.openLocker(userID, lockerID, {from:"0xa49fb51f996b7ca3b0b77d34145b1bedde6100a1", gas:1000000000000})
    var parsed = JSON.parse(ETHEREUM_CLIENT.toAscii(object[2]));
    if( parsed.dataType === "Credit Card"){
      $("#Card-display-type").html(parsed.dataType);
      $("#Card-display-sig").html(parsed.signifier);
      $("#Card-display-bank").html(parsed.bankName);
      $("#Card-display-fullName").html(parsed.fullName);
      $("#Card-display-issuer").html(parsed.cardIssuer);
      $("#Card-display-number").html(parsed.cardNum);
      $("#Card-display-securityCode").html(parsed.securityNum);
      $("#Card-display-expDate").html(parsed.expDate);
      $("#Card-display").removeClass("hidden");
    }
    else if (parsed.dataType === "Website Login"){
      $("#Login-display-type").html(parsed.dataType);
      $("#Login-display-siteName").html(parsed.siteName);
      $("#Login-display-url").html(parsed.url);
      $("#Login-display-userName").html(parsed.username);
      $("#Login-display-password").html(parsed.password);
      $("#Login-display").removeClass("hidden");
    }
    else if (parsed.dataType ==="Banking Account"){
      $("#Account-display-type").html(parsed.dataType);
      $("#Account-display-sig").html(parsed.signifier);
      $("#Account-display-name").html(parsed.bankName);
      $("#Account-display-routing").html(parsed.routingNum);
      $("#Account-display-account").html(parsed.accountNum);
      $("#Account-display").removeClass("hidden");
    }
    else if (parsed.dataType === "ID card"){
      $("#ID-display-type").html(parsed.dataType);
      $("#ID-display-sig").html(parsed.signifier);
      $("#ID-display-idType").html(parsed.IDType);
      $("#ID-display-expDate").html(parsed.expDate);
      $("#ID-display-licNum").html(parsed.licNum);
      $("#ID-display").removeClass('hidden');
    }
  })
});
