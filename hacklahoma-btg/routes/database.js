const { Connection, Request } = require("tedious");
var express = require('express');
var router = express.Router();


var jsonArray = [];

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "hacklahoma", // update me
      password: "nP3u0FEEpeyo" // update me
    },
    type: "default"
  },
  server: "hacklahoma-nsegf-sql-server.database.windows.net", // update me
  options: {
    database: "nsegf-db", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

async function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * FROM Users`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );
  
  const x = request.on("row", columns => {
      const rowObject = {};
    columns.forEach(column => {
        rowObject[column.metadata.colName] = column.value;
        console.log("%s\t%s", column.metadata.colName, column.value);
    });
    jsonArray.push(rowObject);
  });

  request.on('doneProc', function(rowCount, more, returnStatus, rows) {
      console.log(rows)
  })
  connection.execSql(x);

  return jsonArray;
}

router.use('/', function(req, res, next) {
    console.log("used .... well used");
    queryDatabase()
      .then(function(value) {
      console.log('Async success!', value);
      res.render('index', { title: JSON.stringify(value) });
      jsonArray = [];
      })
      .catch(function(err) {
      console.log('Caught an error!', err);
    });

});

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("test");
    res.render('index', { title: jsonArray });
});

module.exports = router;



// ---------------------------------------------------
// const { Connection, Request } = require("tedious");
// var express = require('express');
// var router = express.Router();


// var jsonArray = [];

// // Create connection to database
// const config = {
//   authentication: {
//     options: {
//       userName: "hacklahoma", // update me
//       password: "nP3u0FEEpeyo" // update me
//     },
//     type: "default"
//   },
//   server: "hacklahoma-nsegf-sql-server.database.windows.net", // update me
//   options: {
//     database: "nsegf-db", //update me
//     encrypt: true
//   }
// };

// const connection = new Connection(config);

// // Attempt to connect and execute queries if connection goes through
// connection.on("connect", err => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     queryDatabase();
//   }
// });

// async function queryDatabase() {
//   console.log("Reading rows from the Table...");

//   // Read all rows from table
//   const request = new Request(
//     `SELECT * FROM Users`,
//     (err, rowCount) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         console.log(`${rowCount} row(s) returned`);
//       }
//     }
//   );

//   request.on("row", columns => {
//     const rowObject = {};
//     columns.forEach(column => {
//         rowObject[column.metadata.colName] = column.value;
//         console.log("%s\t%s", column.metadata.colName, column.value);
//     });
//     jsonArray.push(rowObject);
//     console.log(jsonArray);
//   });

//   return jsonArray;
// }

// router.use('/', function(req, res, next) {
//     console.log("used .... well used");
//     queryDatabase()
//       .then(function(value) {
//       console.log('Async success!', value);
//       })
//       .catch(function(err) {
//       console.log('Caught an error!', err);
//     });
//     next();
// });

// /* GET home page. */
// router.get('/', function(req, res, next) {
//     console.log("test");
//     console.log(jsonArray)
//     res.render('index', { title: jsonArray });
// });

// module.exports = router;