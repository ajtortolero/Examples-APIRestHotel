var varExpress = require("express");
var bodyParser = require("body-parser");
var varRoutes = require("./routes/routes.js");
var varApp = varExpress();
var varPort = 3000;

varApp.use(bodyParser.json());
varApp.use(bodyParser.urlencoded({ extended: true }));

varRoutes(varApp);

var varServer = varApp.listen(varPort, function () {
    console.log("App running on port.", varServer.address().port);
});