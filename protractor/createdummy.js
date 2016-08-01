// example usage: node createdummy.js my-raw-json.json > my-mock.json
var obj = require("./"+ process.argv[2]);
var firstFiveObj = [];
for (var i = 0; i < 5; i += 1){
	firstFiveObj.push(JSON.stringify(obj[i]));
}
console.log(firstFiveObj);
