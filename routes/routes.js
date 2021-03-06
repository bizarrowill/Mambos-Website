const db = require('../models');
const path = require('path');

module.exports = (app) => {

  // retrieve all dishes of specified category (i.e. appetizers)
  app.get("/api/dishes", (req, res) => {
    console.log(req.query.category);
    if(req.query.category) { // find dishes by category
      db.Dish.findAll({
        where: {
          category: req.query.category // category: ["appetizer","drink","sides"]
        }
      }).then(result => {
        res.send(result); 
      }).catch(err => {
        throw err;
      });
    } else { // find all dishes
      db.Dish.findAll()
        .then(result => {
          // console.log('result: ', result);
          res.send(result); 
        }).catch(err => {
          if (err) throw err;
        });
    }
  });

  // insert new dishes item
  app.post("/api/dishes", (req, res) => {
    db.Dish.create(req.body).then(result => {
      res.send(result); 
    }).catch(err => {
      if (err) throw err;
    });
  });

  // update dishes item with specified id
  app.put("/api/dishes", (req, res) => {
    db.Dish.update(req.body.dish, {
      where: {
        id:req.body.id
      }
    }).then((result) => {
      // console.log(result);
      res.send(result); 
    }).catch(err => {
      if (err) throw err;
    });
  });

  // delete dishes item with specified id
  app.delete("/api/dishes", (req, res) => {
    db.Dish.destroy({
      where: {
        id: req.query.id
      }
    }).then((result) => {
      res.send(result); 
    });
  });

  // gets all distinct categories
  app.get("/api/categories", (req, res) => {
    db.Dish.findAll({attributes: ["category"],group:"category"})
      .then((result) => {
        res.send(result);
      });
  });

  // // // Main "/" Route. This will redirect the user to our rendered React application
  // app.get("/admin", (req, res) => {
  //   res.redirect('/login');
  // });

  // Main "/" Route. This will redirect the user to our rendered React application
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/index.html"));
  });


};
