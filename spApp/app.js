var express = require("express");
var app = express();
app.use("/", express.static(__dirname + "/dist"));
app.listen(80);
console.log('启动成功:http:127.0.0.1');