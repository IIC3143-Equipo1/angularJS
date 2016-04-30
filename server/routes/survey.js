var models = require('../models');

exports.createSurvey = function(req, res) {
  models.Survey.create({
    name: req.body.email
  }).then(function(survey) {
    res.json(survey);
  });
};

// get all survies
exports.allSurveis = function(req, res) {
  var page = (req.query.page * 5) - 5;
  models.Survey.findAndCountAll({
    limit: 5, 
    offset: page
    //attributes: { include: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total']] },
    //group: [models.sequelize.col('id')]
  }).then(function(surveis) {
      surveis.current_page = parseInt(req.query.page,10);
      res.json(surveis);
  });
};

// get single survey
exports.getSurvey = function(req, res) {
  models.Survey.find({
    where: {
      id: req.params.id
    }
  }).then(function(survey) {
    res.json(survey);
  });
};

// delete a single survey
exports.deleteSurvey = function(req, res) {
  models.Survey.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(survey) {
    res.json(survey);
  });
};

// update single survey
 exports.updateSurvey = function(req, res) {
  models.Survey.find({
    where: {
      id: req.params.id
    }
  }).then(function(survey) {
    if(survey){
      survey.updateAttributes({
        name: req.body.name,
      }).then(function(survey) {
        res.send(survey);
      });
    }
  });
};