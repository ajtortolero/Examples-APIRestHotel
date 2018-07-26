var varExpress = require("express");
var varRouter = varExpress();
var varData = require("../data/data");
var _ = require("underscore");

const _fs = require('fs');

var varRouter = function(app) {
  //Method GET to obtain All Hotels
  app.get("/GetAll", function(req, res) {
    res.status(200).send(res.json(varData));
  });

  //Method GET to obtain Hotel by ID
  app.get('/GetById/:id', function (req, res) {
    var iteData = _.where(varData, {id: req.params.id});
    if(!iteData) {
        return res.status(404).send({ message: "Hotel not found with id " + req.params.id });
    } else {
      res.status(200).send(iteData);
    }
 });

  //Method POST to Update Hotel by ID
  app.post('/UpdateById/:id', function (req, res) {
    var varUpdate = req.body;

    if (varUpdate.id) {
      delete varUpdate.id;
    }

    var varItem = _.findIndex(varData, { id: req.params.id });

    if (!varData[varItem]) {
      res.status(404).send({ message: "Hotel " + req.params.id + " Not Exists. " });
    } else {
      var varResult = _.assign(varData[varItem], varUpdate);
      res.status(200).send(varResult);
    }
  });

   //Method POST to Delete Hotel by ID
   app.post('/DeleteById/:id', function (req, res) {  
    var varItem = _.findIndex(varData, {id: req.params.id});
    varData.splice(varItem, 1);
    
    res.status(200).send(varData);       
 }); 
};

module.exports = varRouter;
