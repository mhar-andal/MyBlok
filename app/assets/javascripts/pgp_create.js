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
      data: JSON.stringify(data),                           // input as String (or Uint8Array)
      encrypted: "",
      publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
      privateKeys: privKeyDE.keys[0] // for signing (optional)
  };

   openpgp.encrypt(options).then(function(ciphertext) {
        $$whatever = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    })

    return $$whatever;
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
  decrypted = openpgp.decrypt(options).then(function(plaintext) {
    $$whatever2 = plaintext.data;
  })
  return $$whatever2;
};
