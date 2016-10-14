var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'crud-pets'
};

// initialize the database connection pool
var pool = new pg.Pool(config);

router.put('/:id', function(req, res) {
  var id = req.params.id;
  // var checkIn = req.body.in;
  // var checkOut = req.body.out;

  console.log('status req.body', req.body);

//   pool.connect(function(err, client, done){
//     try {
//       if (err) {
//         console.log('Error connecting the DB', err);
//         res.sendStatus(500);
//         return;
//       }
//
//       client.query('UPDATE visits SET check_in=$1, check_out=$2 WHERE id=$3 RETURNING *;',
//       [date, id],
//       function(err, result) {
//         if (err) {
//           console.log('Error querying database', err);
//           res.sendStatus(500);
//         } else {
//           res.send(result.rows);
//         }
//       });
//     } finally {
//       done();
//     }
//   });
});




module.exports = router;
