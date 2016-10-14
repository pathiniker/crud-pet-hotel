// GET owner information
// POST pet information


var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'crud-pets'
};

// initialize the database connection pool
var pool = new pg.Pool(config);

router.get('/', function(req, res){

  // err - an error object, will be not-null if there was an error connecting
  //       possible errors, db not running, config is wrong

  // client - object that is used to make queries against the db

  // done - function to call when you're done (returns connection back to the pool)
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    // 1. SQL string
    // 2. (optional)  input parameters
    // 3. callback function to execute once the query is finished
    //      takes an error object and a result object as args
    client.query('SELECT * FROM owner JOIN pets ON pets.owner_id = owner.id JOIN visits ON visits.pet_id = pets.id;', function(err, result){
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }


      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});

// router.get('/:id', function(req, res) {
//   pool.connect(function(err, client, done) {
//     if (err) {
//       console.log('Error connecting to the DB', err);
//       res.sendStatus(500);
//       done();
//       return;
//     }
//     client.query('SELECT * FROM pets WHERE id = $1;', [req.params.id], function(err, result){
//       done();
//       if (err) {
//         console.log('Error querying the DB', err);
//         res.sendStatus(500);
//         return;
//       }
//
//       console.log('Got rows from the DB:', result.rows);
//       res.send(result.rows);
//     });
//   });
// });

router.post('/', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('INSERT INTO pets (owner_id, name, animal, color) VALUES ($1, $2, $3, $4) returning *;',
    [req.body.owner_id, req.body.pet_name, req.body.pet_type, req.body.pet_color],
    function(err, result){
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }
      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});
//
//
// PUT localhost:3000/pets/42
// req.params.id === 42
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var pet = req.body.name;
  var animal = req.body.animal;
  var color = req.body.color;

  pool.connect(function(err, client, done){
    try {
      if (err) {
        console.log('Error connecting the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE pets SET name=$1, animal=$2, color=$3 WHERE id=$4 RETURNING *;',
      [pet, animal, color, id],
      function(err, result) {
        if (err) {
          console.log('Error querying database', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });
});


router.delete('/:id', function(req, res){
  var id = req.params.id;

  pool.connect(function(err, client, done){
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM pets WHERE id=$1;', [id], function(err){
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});







module.exports = router;
