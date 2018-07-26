var varExpress = require("express");
var varRouter = varExpress();
var varData = require("../data/data");
var _ = require("underscore");

var varRouter = function(app) {
  //Method GET to obtain All Hotels
  app.get("/GetAll", function(req, res) {
    res.status(200).send(res.json(varData));
  });

  //Method GET to obtain Hotel by ID
  app.get('/GetById/:id', function (req, res) {
    var iteData = _.where(varData, {id: req.params.id});
    if(!iteData) {
        return res.status(404).send({
            message: "Hotel not found with id " + req.params.id
        })      
    } else {
      res.status(200).send(iteData);
    }
 })
};

module.exports = varRouter;
