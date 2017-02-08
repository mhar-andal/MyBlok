var openpgp = require('openpgp')
console.log(openpgp)

var openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
openpgp.config.aead_protect = true // activate fast AES-GCM mode (not yet OpenPGP standard)

var Person = function (fullname, openpgp, password) {
  this.openpgp = openpgp
  this.fullname = fullname;

  this.options = {
      userIds: [{ name: this.fullname}], // multiple user IDs
      numBits: 2048,                                            // RSA key size
      passphrase: password         // protects the private key
  };

  this.creditCardInfo = {
    name: "Chase",
    number: 1234123412341234,
    ccv: 240
  }
};

Person.prototype.genkey = function() {
  personobj = this;
  openpgp.generateKey(this.options, personobj).then(function(key) {
      personobj.privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
      personobj.pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  });
};

Person.prototype.encrypt = function () {
  var privateKey = this.openpgp.key.readArmored(this.privkey)
  passphrase = this.passphrase
  var privKeyDE = privateKey;
  privKeyDE.keys[0].decrypt(passphrase);
  console.log(privKeyDE)
  var options = {
      data: JSON.stringify(this.creditCardInfo),                             // input as String (or Uint8Array)
      publicKeys: openpgp.key.readArmored(this.pubkey).keys,  // for encryption
      privateKeys: privKeyDE.keys[0] // for signing (optional)
  };

  var encrypted;

  openpgp.encrypt(options).then(function(ciphertext) {
      encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
      console.log(encrypted)
      this.encrypted = encrypted;
  })
}

Person.prototype.decrypt = function(encrypted) {
  var privateKey = openpgp.key.readArmored(this.privkey);
  var passphrase = this.options.passphrase
  console.log(this.privkey);
  console.log(privateKey.keys[0])
  var privKeyDE = privateKey
  privKeyDE.keys[0].decrypt(passphrase);
  console.log(privKeyDE);
  var options = {
    message: openpgp.message.readArmored(encrypted),     // parse armored message
    passphrase: 'super long and hard to guess secret',
    publicKeys: openpgp.key.readArmored(this.pubkey).keys,    // for verification (optional)
    privateKey: privKeyDE.keys[0]// for decryption
  };
  openpgp.decrypt(options).then(function(plaintext) {
    var decrypt = plaintext.data;
    console.log(decrypt);
  })
};

// person = new Person("Mhar Andal", openpgp)
// person.genkey();
// var person2;
$(document).ready(function(){
    $("#person").on("submit", function(e){
      e.preventDefault();
      var fullname = this.elements["fullname"].value
      var passphrase = this.elements["passphrase"].value
      var person = new Person(fullname, openpgp, passphrase);
      person.genkey();
      setTimeout(function(){
        $(".form").replaceWith(
          "<div class='writedown'><h1>Please write down your PGP Key somewhere safe!</h1></div>" +
        "<div class='writedown'><center><textarea style='width:300px; height:400px;'>" + person.privkey + "</textarea></center></div>")
        $(".mainform").append("<a href='/contract/config'>AND CONTINUE ONNNNNN!</a>")
      }, 6000);
    })


})
