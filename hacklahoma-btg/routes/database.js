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


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("test");
    queryDatabase()
      .then(function(value) {
      console.log('Async success!', value);
      res.json((value));
      jsonArray = [];
      })
      .catch(function(err) {
      console.log('Caught an error!', err);
    });
});

/* GET home page. */
router.get('/GET/allReports', function(req, res, next) {
  console.log("test");
  let desc = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras"+
  "dapibus.";
  let logo_url = 'https://react.semantic-ui.com/images/wireframe/image.png';
  let ext_url = 'github.com';
  let owner = 'jobv';
  res.json(
    [ 
      { 
        "pid":"1",
        "pname":"Project1",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev",
      },
      { 
        "pid":"2",
        "pname":"Project2",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"3",
        "pname":"Project3",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"4",
        "pname":"Project4",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"5",
        "pname":"Project5",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"6",
        "pname":"Project6",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"7",
        "pname":"Project7",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
    ])
  //res.json('[,{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"}]');
});

/* GET home page. */
router.get('/GET/reportsWithFilters/:filters', function(req, res, next) {
  console.log("test");
  res.json(req.params);
});

/* GET home page. */
router.get('/GET/singleReport/:pid', function(req, res, next) {
  let desc = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras"+
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras\n\n\n"+
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras"+
  "dapibus.";
  let logo_url = 'https://react.semantic-ui.com/images/wireframe/image.png';
  let ext_url = 'github.com';
  let pname = 'project'+ req.params.pid;
  let owner = 'jobv';
  let catigories = ["Web Dev","beginner","c#"];
  let memberSize = '3';
  let members = ['Job v', 'Lucas b', 'grant'];
  let ownerRating = '4';
  res.json(
    {
      "pid":req.params.pid,
      "desc":desc,
      "logo_url":logo_url,
      "ext_url":ext_url,
      "owner":owner,
      "pname":pname,
      "catigories":catigories,
      "member_size":memberSize,
      "members":members,
      "ownerRating":ownerRating
    }
  );
});

router.get('/GET/singleReportComments/:pid', function(req, res, next) {

  let userName = 'JobV';
  let dateCreated = '1/12/2010';
  let dateCreated1 = '1/13/2010';
  let dateCreated2 = '1/14/2010';
  let dateCreated3 = '1/15/2010';
  let dateCreated4 = '1/16/2010';
  let commentText = 'project'+ req.params.pid;
  res.json([
    {
      "userName":userName,
      "dateCreated":dateCreated,
      "commentText":commentText,
    },
    {
      "userName":userName,
      "dateCreated":dateCreated2,
      "commentText":commentText,
    },
    {
      "userName":userName,
      "dateCreated":dateCreated3,
      "commentText":commentText,
    },
    {
      "userName":userName,
      "dateCreated":dateCreated4,
      "commentText":commentText,
    },
    {
      "userName":userName,
      "dateCreated":dateCreated1,
      "commentText":commentText,
    }
  ]
  );
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