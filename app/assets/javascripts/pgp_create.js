function genkey(fullname, passphrase) {
  var options = {
    userIds: [{name: fullname}],
    numBits: 2048,
    passphrase: passphrase
  };

  var keys = {};
  openpgp.generateKey(options).then(function(key) {
      keys.privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
      keys.pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  });
  return keys;
};

function encrypt(privkey, passphrase, pubkey, data) {
  var privateKey = openpgp.key.readArmored(privkey)
  var privKeyDE = privateKey;
  privKeyDE.keys[0].decrypt(passphrase);
  var options = {
      data: data,                           // input as String (or Uint8Array)
      publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
      privateKeys: privKeyDE.keys[0] // for signing (optional)
  };
   return openpgp.encrypt(options);
}



function decrypt(privkey, passphrase, pubkey, encrypted) {
  var decrypted;
  var privateKey = openpgp.key.readArmored(privkey);
  var privKeyDE = privateKey;
  privKeyDE.keys[0].decrypt(passphrase);
  var options = {
    message: openpgp.message.readArmored(encrypted),     // parse armored message
    passphrase: passphrase,
    publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
    privateKey: privKeyDE.keys[0]// for decryption
  };
  return openpgp.decrypt(options);
};
