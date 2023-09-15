var keythereum = require("keythereum");
var datadir = "./node1";
var address= "0xebec756269ea9573fe8b61369f6bbf06d28c5a79";
const password = "1234";

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));