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


var Login = function(sig, siteName, url, username,password){
  this.dataType = "Website Login",
  this.signifier = sig,
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
  this.signifer = sig,
  this.IDType = IDType,
  this.expDate = expDate,
  this.licNum = licNum
}
