var varExpress = require("express");
var varRouter = varExpress();
var varData = require("../data/data");
var _ = require("underscore");

var fs = require('fs');

var varRouter = function(app) {
  //Method GET to obtain All Hotels
  app.get("/GetAll", function (req, res) {
    res.status(200).send(res.json(varData));
  });

  //Method GET to obtain Hotel by ID
  app.get('/GetById/:id', function (req, res) {
    var iteData = _.where(varData, { id: req.params.id });
    if (!iteData) {
      return res.status(404).send({ error: "Hotel not found with id " + req.params.id });
    } else {
      res.status(200).send(iteData);
    }
  });

  //Method POST to Delete Hotel by ID
  app.post('/Add', function (req, res) {
    var varItem = req.body;
    
    var varLast = _.last(varData);
    var varItemId = parseInt(varLast.id) + 1;

    varItem.id = varItemId.toString();
    
    varData.splice(varItemId - 1, 0, varItem);

    var varDataJson = JSON.stringify(varData);

    fs.writeFileSync('./server/data/data.json', varDataJson, 'utf8', function readFileCallback(err) {
      if (err) {
        res.status(404).send({ error: "Cant Write File JSON." });
      }
    });

    res.status(200).send(varData);
  }); 

  //Method POST to Update Hotel by ID
  app.post('/UpdateById/:id', function (req, res) {
    var varUpdate = req.body;

    if (varUpdate.id) {
      delete varUpdate.id;
    }

    var varItem = _.findIndex(varData, { id: req.params.id });

    if (!varData[varItem]) {
      res.status(404).send({ error: "Hotel " + req.params.id + " Not Exists. " });
    } else {
      var varResult = _.assign(varData[varItem], varUpdate);
      var varDataJson = JSON.stringify(varData);

      fs.writeFileSync('./server/data/data.json', varDataJson, 'utf8', function readFileCallback(err) {
        if (err) {
          res.status(404).send({ error: "Cant Write File JSON." });
        }
      });

      res.status(200).send(varData);
    }
  });

  //Method POST to Delete Hotel by ID
  app.post('/DeleteById/:id', function (req, res) {
    var varItem = _.findIndex(varData, { id: req.params.id });
    varData.splice(varItem, 1);
    var varDataJson = JSON.stringify(varData);

    fs.writeFileSync('./server/data/data.json', varDataJson, 'utf8', function readFileCallback(err) {
      if (err) {
        res.status(404).send({ error: "Cant Write File JSON." });
      }
    });
    res.status(200).send(varData);
  }); 
};

module.exports = varRouter;
